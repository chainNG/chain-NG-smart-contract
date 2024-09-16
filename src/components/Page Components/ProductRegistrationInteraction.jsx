import React, { useState, useEffect } from 'react';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import DisplayProductData from '../Render Components/DisplayProductData';
import { useProductStore, useContractStore } from '../../services/store';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, string } from 'zod';
import { useForm } from 'react-hook-form';
import { supabase } from '../../utils/supabaseClient';
import jsQR from "jsqr"; 


const productSchema = z.object({
  product_code: string().length(13, { message: 'Product Code must be exactly 13 digits' }),
  product_name: string().min(3, { message: 'Product Name must be at least 3 characters' }),
  raw_materials: string().min(3, { message: 'Raw Material must be at least 3 characters' }),
});

const ProductRegistrationInteraction = () => {
  const { setProductCode, setProductName, setRawMaterials } = useProductStore();
  const { account, contract, setContract, setAccount } = useContractStore();
  
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [qrMethod, setQrMethod] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(null); 

  const { register, handleSubmit, formState, setValue, getValues } = useForm({
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
      reader.onload = async (event) => {
        try {
          const imageData = event.target.result;
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const image = new Image();
          image.src = imageData;
  
          image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            
            const qrCode = jsQR(ctx.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height);
            
            if (qrCode) {
              
              try {
                const jsonData = JSON.parse(qrCode.data);
                const { qrHash } = jsonData;
  
                if (qrHash) {
                  setQrMethod(true);  
                  validateQrWithSupabase(qrHash);
                } else {
                  throw new Error("Invalid QR code: 'qrHash' missing.");
                }
              } catch (error) {
                
                toast('Invalid QR code data. Expected valid JSON.', { duration: 4000 });
                console.error("QR Code parsing error:", error);
              }
            } else {
              toast('QR code not detected in the image', { duration: 4000 });
            }
          };
        } catch (error) {
          console.error('Error reading QR code:', error);
          toast('Failed to read QR code', { duration: 4000 });
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('QR upload error:', error);
      toast('Invalid QR code upload', { duration: 4000 });
    }
  };
  

  const validateQrWithSupabase = async (qrHash) => {
    setLoading(true);
    try {
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('qr_hash', qrHash);

      if (error || !product.length) {
        setErrorMessage('Product not found');
        setProductDetails(null);
      } else {
        setProductDetails(product[0]);
        toast('Product found', { duration: 4000 });
      }
    } catch (error) {
      console.error('Supabase validation error:', error);
      toast('Supabase validation failed', { duration: 4000 });
    }
    setLoading(false);
  };

  
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

  
  const onSubmit = async (data) => {
    if (qrMethod) {
      
      toast('Using QR code method, no need to submit manually.', { duration: 4000 });
      return;
    }

    if (!data.product_code || !data.product_name || !data.raw_materials) {
      toast('Please fill out all product details', { duration: 4000 });
      return;
    }

    fetchProductDetailsFromSupabase(data);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-8 px-4" style={{ zoom: '1.0' }}>
      <div className="mb-4">
        <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={connectWallet}>
          {account ? `Wallet Connected: ${account}` : 'Connect Wallet'}
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className='font-spaceGrotesk text-lg'>Register Your Products and Materials</CardTitle>
            <CardDescription>Use the form below to register your products by product code or upload a QR code.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-2 font-light">
            <div className="space-y-1 font-jakarta">
              <Label htmlFor="product_code">Product Code</Label>
              <Input
                id="product_code"
                placeholder="Enter product code (13 digits)"
                type="number"
                {...register('product_code')}
              />
              {errors.product_code && <span className="text-red-500">{errors.product_code.message}</span>}
            </div>

            <div className="space-y-1 font-jakarta">
              <Label htmlFor="product_name">Product Name</Label>
              <Input
                id="product_name"
                placeholder="Enter product name"
                {...register('product_name')}
              />
              {errors.product_name && <span className="text-red-500">{errors.product_name.message}</span>}
            </div>

            <div className="space-y-1 font-jakarta">
              <Label htmlFor="raw_materials">Raw Materials</Label>
              <Input
                id="raw_materials"
                placeholder="Enter raw materials"
                {...register('raw_materials')}
              />
              {errors.raw_materials && <span className="text-red-500">{errors.raw_materials.message}</span>}
            </div>

            <div className="space-y-1">
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
            <Button type="submit" style={{ backgroundColor: 'green', color: 'white' }} className=" font-medium w-full">
              Submit Product Details
            </Button>
          </CardFooter>
        </Card>
      </form>

      {productDetails && <DisplayProductData productDetails={productDetails} />}
    </div>
  );
};

export default ProductRegistrationInteraction;
