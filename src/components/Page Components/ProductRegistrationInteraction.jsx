import React, { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, string } from 'zod';
import { supabase } from '../../utils/supabaseClient';
import jsQR from "jsqr";
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import DisplayProductData from '../Render Components/DisplayProductData'; 

const productSchema = z.object({
  product_code: string().length(13, { message: 'Product Code must be exactly 13 digits' }),
  product_name: string().min(3, { message: 'Product Name must be at least 3 characters' }),
  raw_materials: string().min(3, { message: 'Raw Material must be at least 3 characters' }),
  address: string().min(3, { message: 'Address must be valid' }),
});

const ProductRegistrationInteraction = () => {
  const [loading, setLoading] = useState(false);
  const [qrMethod, setQrMethod] = useState(false);
  const [account, setAccount] = useState(null);
  const [products, setProducts] = useState([]); 
  const [productId, setProductId] = useState(1); 

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: zodResolver(productSchema),
  });
  const { errors } = formState;

  
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        toast(`Wallet connected: ${accounts[0]}`, { duration: 4000 });
      } else {
        toast('Please install MetaMask!', { duration: 4000 });
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
      toast('Wallet connection failed', { duration: 4000 });
    }
  };

  
  const handleQrCodeUpload = async (file) => {
    try {
      if (!file.type.startsWith("image/")) {
        toast("Invalid file type. Please upload an image.", { duration: 4000 });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = imageData;

        image.onload = async () => {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          const qrCode = jsQR(ctx.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height);

          if (qrCode) {
            try {
              const data = JSON.parse(qrCode.data); 
              const { qrHash, product_code, product_name, raw_materials } = data;

              setQrMethod(true);
              toast('QR Code successfully uploaded', { duration: 4000 });

              
              setValue('product_code', product_code);
              setValue('product_name', product_name);
              setValue('raw_materials', raw_materials);

              
              await insertProductData({
                product_code,
                qr_hash: qrHash || uuidv4(),
                address: account,
              });
            } catch (error) {
              toast('Invalid QR code data. Expected valid JSON.', { duration: 4000 });
            }
          } else {
            toast('QR code not detected in the image', { duration: 4000 });
          }
        };
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast('Failed to process QR code', { duration: 4000 });
    }
  };

  const insertProductData = async (data) => {
    const productData = {
      product_code: data.product_code,
      qr_hash: data.qr_hash,
      address: data.address,
      product_name: data.product_name,
      raw_materials: data.raw_materials,
    };

    setLoading(true);
    try {
      const { error } = await supabase.from('products').insert([productData]);

      if (error) {
        toast('Failed to insert product details', { duration: 4000 });
        console.error('Supabase insert error:', error);
      } else {
        toast('Product successfully registered', { duration: 4000 });
        setQrMethod(false);
      }
    } catch (error) {
      toast('Error while saving product data', { duration: 4000 });
      console.error('Supabase error:', error);
    }
    setLoading(false);
  };

<<<<<<< HEAD
=======
  
  const fetchProductDetailsFromSupabase = async (data) => {
    setLoading(true);
    try {
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('product_code', data.product_code)
        .eq('product_name', data.product_name)
        .eq('raw_materials', data.raw_materials);

      if (error || !product.length) {
        setErrorMessage('Product not found');
        setProductDetails(null);
      } else {
        setProductDetails(product[0]);
        toast('Product details retrieved', { duration: 4000 });
      }
    } catch (error) {
      console.error('Error fetching product from Supabase:', error);
      toast('Failed to retrieve product details', { duration: 4000 });
    }
    setLoading(false);
  };

  // changes
>>>>>>> refs/remotes/origin/main
  const onSubmit = async (data) => {
    if (qrMethod) {
      toast('Using QR code data. Registration has been submitted directly.', { duration: 4000 });
    } else {
      await insertProductData(data);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId); 

      if (error) {
        console.error('Error fetching products:', error);
        toast('Error fetching products', { duration: 4000 });
      } else {
        setProducts(data);
        toast('Products fetched successfully', { duration: 4000 });
      }
    } catch (error) {
      console.error('Error while fetching products:', error);
      toast('Error while fetching products', { duration: 4000 });
    }
    setProductId((prevId) => prevId + 1); // Increment productId to fetch the next record on subsequent calls
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-8 px-4">
      <div className="mb-4">
        <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={connectWallet}>
          {account ? `Wallet Connected: ${account}` : 'Connect Wallet'}
        </Button>
      </div>

      <Button style={{ backgroundColor: 'blue', color: 'white' }} onClick={fetchProducts}>
        Fetch Products
      </Button>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Register Your Products and Materials</CardTitle>
            <CardDescription>Fill in product details or upload a QR code.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <div>
              <Label htmlFor="product_code">Product Code</Label>
              <Input
                id="product_code"
                placeholder="Enter product code (13 digits)"
                type="text"
                {...register('product_code')}
              />
              {errors.product_code && <span className="text-red-500">{errors.product_code.message}</span>}
            </div>

            <div>
              <Label htmlFor="product_name">Product Name</Label>
              <Input
                id="product_name"
                placeholder="Enter product name"
                {...register('product_name')}
              />
              {errors.product_name && <span className="text-red-500">{errors.product_name.message}</span>}
            </div>

            <div>
              <Label htmlFor="raw_materials">Raw Materials</Label>
              <Input
                id="raw_materials"
                placeholder="Enter raw materials"
                {...register('raw_materials')}
              />
              {errors.raw_materials && <span className="text-red-500">{errors.raw_materials.message}</span>}
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Enter your address"
                {...register('address')}
              />
              {errors.address && <span className="text-red-500">{errors.address.message}</span>}
            </div>

            <div>
              <Label htmlFor="qr_upload">Or Upload a QR Code</Label>
              <Input
                id="qr_upload"
                type="file"
                accept="image/*"
                onChange={(e) => handleQrCodeUpload(e.target.files[0])}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button style={{ backgroundColor: 'green' }} type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* Display fetched product data */}
      <DisplayProductData products={products} />
    </div>
  );
};

export default ProductRegistrationInteraction;
