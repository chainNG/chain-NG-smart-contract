import React, { useState, useEffect } from 'react';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
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
import { QrReader } from 'react-qr-reader'; // Updated import

const productSchema = z.object({
  product_code: string().length(13, { message: 'Product Code must be exactly 13 digits' }),
  product_name: string().min(3, { message: 'Product Name must be at least 3 characters' }),
  raw_materials: string().min(3, { message: 'Raw Material must be at least 3 characters' }),
});

const ProductRegistrationInteraction = () => {
  const { productName, productCode, setProducts, setProductCode, setProductName, setRawMaterials } = useProductStore();
  const { account, contract, setContract, setAccount } = useContractStore();
  
  const [status, setStatus] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [qrData, setQrData] = useState(null); // For QR data
  const [web3, setWeb3] = useState(null); // Web3 state
  const [connectedAccount, setConnectedAccount] = useState(null); // Connected wallet account
  const [cropDisplay, setCropDisplay] = useState(false); // State for toggling crop details display
  
  const { register, handleSubmit, formState, getValues } = useForm({
    resolver: zodResolver(productSchema),
  });
  const { errors } = formState;
  
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setWeb3(new Web3(window.ethereum));
    }
  }, []);

  // Handle connection to Metamask
  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setConnectedAccount(accounts[0]);
      setAccount(accounts[0]);
      setWeb3(new Web3(window.ethereum));
      const contractInstance = new web3.eth.Contract(contractABI, import.meta.env.VITE_CONTRACT_ADDRESS);
      setContract(contractInstance);
      toast('Connected to Metamask', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CheckCircledIcon />
      });
    } catch (error) {
      toast('Failed to connect Metamask', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CrossCircledIcon />
      });
      console.error('Metamask connection error:', error);
    }
  };

  // QR code reader function
  const handleQrCodeScan = (data) => {
    if (data) {
      try {
        const qrContent = JSON.parse(data); // Assuming QR contains JSON data
        setQrData(qrContent);
        setProductName(qrContent.product_name);
        setRawMaterials(qrContent.raw_materials);
        setProductCode(qrContent.product_code);
        toast('QR code data loaded successfully', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 4000,
          icon: <CheckCircledIcon />
        });
      } catch (error) {
        console.error('Error parsing QR code data:', error);
        toast('Failed to parse QR code', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 4000,
          icon: <CrossCircledIcon />
        });
      }
    }
  };

  // Handle product registration
  const handleRegisterProduct = async (data) => {
    if (!contract) {
      toast('Please Connect Your Wallet 👆👆', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CheckCircledIcon />
      });
      return;
    }

    try {
      const contractData = contract.methods.register(data.product_code, data.product_name, data.raw_materials).encodeABI();
      const transactionParams = {
        from: connectedAccount,
        to: import.meta.env.VITE_CONTRACT_ADDRESS,
        data: contractData,
      };

      const tx = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParams],
      });

      setTxHash(tx);
      setStatus(1); // Set status to successful registration
      toast('Product Registered Successfully', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CheckCircledIcon />
      });
    } catch (error) {
      toast('Failed to register product', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CrossCircledIcon />
      });
      console.error('Product registration error:', error);
    }
  };

  // Submit handler
  const onSubmit = (data) => {
    connectWallet().then(() => handleRegisterProduct(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle className='font-spaceGrotesk text-lg'>
            Register Your Products and Materials
          </CardTitle>
          <CardDescription>
            Use the form below to register your products by product code or scan a QR code.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2 font-light">
          <div className="space-y-1 font-jakarta">
            <Label className='flex flex-col gap-3' htmlFor="product-code">Product Code (13 digits)
              <Input className='font-light' {...register('product_code')} placeholder="Enter product code" />
              <div className='text-red-500'>{errors.product_code?.message}</div>
            </Label>
          </div>

          <div className="space-y-1 font-jakarta">
            <Label className='flex flex-col gap-3' htmlFor="product-name">Product Name
              <Input className='font-light' {...register('product_name')} placeholder="Enter product name" />
              <div className='text-red-500'>{errors.product_name?.message}</div>
            </Label>
          </div>

          <div className="space-y-1 font-jakarta">
            <Label className='flex flex-col gap-3' htmlFor="raw-materials">Raw Materials
              <Input className='font-light' {...register('raw_materials')} placeholder="Enter raw materials" />
              <div className='text-red-500'>{errors.raw_materials?.message}</div>
            </Label>
          </div>

          <div className="space-y-1 font-jakarta">
            <Label className='flex flex-col gap-3' htmlFor="qr-code">Scan QR Code
              <QrReader
                delay={300}
                onError={(error) => toast.error(error.message)}
                onScan={handleQrCodeScan}
                style={{ width: '100%' }}
              />
            </Label>
          </div>

          <Button type='submit' className='font-jakarta'>Register Product</Button>
        </CardContent>

        <CardFooter>
          <DisplayProductData />
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProductRegistrationInteraction;
