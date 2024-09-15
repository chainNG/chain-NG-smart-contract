import React, { useState, useEffect } from 'react';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import contractABI from '../../services/ABIs/contractABI.json';
import DisplayProductData from '../Render Components/DisplayProductData';
import { useProductStore, useContractStore } from '../../services/store';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, string } from 'zod';
import { useForm } from 'react-hook-form';
import Web3 from 'web3';
import { supabase } from '../../utils/supabaseClient';
import jsQR from "jsqr"; 
import { QrReader } from 'react-qr-reader'; 


const productSchema = z.object({
  product_code: string().length(13, { message: 'Product Code must be exactly 13 digits' }),
  product_name: string().min(3, { message: 'Product Name must be at least 3 characters' }),
  raw_materials: string().min(3, { message: 'Raw Material must be at least 3 characters' }),
});

const ProductRegistrationInteraction = () => {
  const { setProductCode, setProductName, setRawMaterials } = useProductStore();
  const { account, contract, setContract, setAccount } = useContractStore();

  const [txHash, setTxHash] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [qrData, setQrData] = useState(null); 
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [scannedQrHash, setScannedQrHash] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(null); 

  const { register, handleSubmit, formState, setValue, getValues } = useForm({
    resolver: zodResolver(productSchema),
  });
  const { errors } = formState;

  
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setWeb3(new Web3(window.ethereum));
    }
  }, []);

  
  const checkContractAddress = async () => {
    if (!import.meta.env.VITE_CONTRACT_ADDRESS) {
      toast('Contract address is missing. Please set the contract address in the environment.', { duration: 5000 });
      return false;
    }
    return true;
  };

  
  const connectWallet = async () => {
    if (!await checkContractAddress()) return;

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setConnectedAccount(accounts[0]);
      setAccount(accounts[0]);
      const contractInstance = new web3.eth.Contract(contractABI, import.meta.env.VITE_CONTRACT_ADDRESS);
      setContract(contractInstance);
      toast('Connected to MetaMask', { duration: 4000 });
    } catch (error) {
      toast('Failed to connect MetaMask', { duration: 4000 });
      console.error('MetaMask connection error:', error);
    }
  };

  
  const disconnectWallet = () => {
    setConnectedAccount(null);
    setAccount(null);
    setContract(null);
    toast('Wallet disconnected', { duration: 4000 });
  };

  
  const handleQrScan = async (data) => {
    if (data) {
      setScannedQrHash(data);
      validateQrAndBlockchain(data);
    }
  };

  const handleError = (err) => {
    console.error('QR Reader Error: ', err);
  };

  
  const handleQrCodeUpload = async (file) => {
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
            const jsonData = JSON.parse(qrCode.data);
            const { qrHash } = jsonData;
            validateQrAndBlockchain(qrHash);
          } else {
            toast('QR code not detected', { duration: 4000 });
          }
        };
      } catch (error) {
        console.error('Error reading QR code:', error);
        toast('Failed to read QR code', { duration: 4000 });
      }
    };
    reader.readAsDataURL(file);
  };

  
  const validateQrAndBlockchain = async (qrHash) => {
    if (!connectedAccount || !contract) {
      toast('Please connect your wallet first', { duration: 4000 });
      return;
    }

    setLoading(true);
    try {
      const isRegistered = await contract.methods.isQrRegistered(qrHash).call();

      if (isRegistered) {
        
        const blockchainProduct = await contract.methods.getProductDetails(qrHash).call();
        const { data: product, error } = await supabase
          .from('products')
          .select('*')
          .eq('qr_hash', qrHash);
        
        if (error || !product.length) {
          setErrorMessage('Product not found in Supabase');
          setProductDetails(blockchainProduct);
        } else {
          setProductDetails({ ...product[0], ...blockchainProduct });
        }
      } else {
        
        const tx = await contract.methods.registerProduct(qrHash).send({
          from: connectedAccount,
          value: web3.utils.toWei('0.01', 'ether'), 
        });
        setTxHash(tx.transactionHash);

        
        const { error } = await supabase
          .from('products')
          .insert([{ qr_hash: qrHash, transaction_hash: tx.transactionHash }]);

        if (error) {
          toast('Error storing product in Supabase', { duration: 4000 });
        } else {
          toast('Product registered successfully', { duration: 4000 });
        }
      }
    } catch (error) {
      console.error('Blockchain validation error:', error);
      toast('Blockchain validation failed', { duration: 4000 });
    }
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (!scannedQrHash) {
      toast('Please scan or upload a QR code', { duration: 4000 });
      return;
    }

    setLoading(true);
    try {
      connectWallet().then(() => validateQrAndBlockchain(scannedQrHash));
    } catch (error) {
      toast('Error submitting product details', { duration: 4000 });
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-8 px-4">
      {!connectedAccount ? (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      ) : (
        <div className="flex gap-3">
          <Button onClick={disconnectWallet}>Disconnect Wallet</Button>
          <Button onClick={connectWallet}>Reconnect Wallet</Button>
        </div>
      )}

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

            <div className="space-y-1 font-jakarta">
              <Label htmlFor="product_qr">Upload Product QR Code</Label>
              <Input
                id="product_qr"
                type="file"
                onChange={(e) => handleQrCodeUpload(e.target.files[0])}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Registering Product...' : 'Submit'}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <div className="w-full max-w-4xl py-6 flex justify-center">
        <QrReader
          onResult={handleQrScan}
          onError={handleError}
          style={{ width: '100%' }}
        />
      </div>

      {productDetails && (
        <DisplayProductData data={productDetails} />
      )}
    </div>
  );
};

export default ProductRegistrationInteraction;
