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
import { supabase } from '../../utils/supabaseClient'; // Supabase client

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
  const [qrData, setQrData] = useState(null); // For QR data
  const [productDetails, setProductDetails] = useState(null); // For searched product details
  const [loading, setLoading] = useState(false); // Loading state for async tasks

  const { register, handleSubmit, formState, setValue } = useForm({
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
      const contractInstance = new web3.eth.Contract(contractABI, import.meta.env.VITE_CONTRACT_ADDRESS);
      setContract(contractInstance);
      toast('Connected to Metamask', { duration: 4000 });
    } catch (error) {
      toast('Failed to connect Metamask', { duration: 4000 });
      console.error('Metamask connection error:', error);
    }
  };

  // Handle QR image upload and extract contract address
  const handleQrCodeUpload = async (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const qrData = event.target.result; // Assuming the QR contains JSON data with contract address
        const jsonData = JSON.parse(qrData);
        const { contractAddress } = jsonData;

        setQrData(contractAddress);
        toast('QR code loaded and contract address extracted', { duration: 4000 });
        validateContractWithBlockchain(contractAddress); // Validate the contract
      } catch (error) {
        console.error('Error reading QR code:', error);
        toast('Failed to read QR code', { duration: 4000 });
      }
    };
    reader.readAsText(file);
  };

  // Validate contract and send transaction to blockchain
  const validateContractWithBlockchain = async (contractAddress) => {
    if (!connectedAccount || !contract) {
      toast('Please connect your wallet first', { duration: 4000 });
      return;
    }

    try {
      const transactionParams = {
        from: connectedAccount,
        to: contractAddress, // Assuming the contractAddress is from the QR code
        value: web3.utils.toWei('0.01', 'ether'), // Gas fee
        data: contract.methods.validateContract().encodeABI(), // Assuming validateContract() is the function
      };

      const tx = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParams],
      });

      setTxHash(tx);
      toast('Transaction sent. Waiting for confirmation...', { duration: 4000 });
      
      // Wait for 5 seconds before retrieving the details
      setTimeout(async () => {
        retrieveProductDetails(tx);
      }, 5000);

    } catch (error) {
      console.error('Transaction error:', error);
      toast('Transaction failed', { duration: 4000 });
    }
  };

  // Retrieve product details from the blockchain
  const retrieveProductDetails = async (txHash) => {
    try {
      const receipt = await web3.eth.getTransactionReceipt(txHash);
      if (receipt && receipt.status) {
        const contractAddress = receipt.to; // Extract the contract address from the receipt
        const productDetails = await contract.methods.getProductDetails(contractAddress).call(); // Simplified for example
        setProductDetails(productDetails);
        toast('Product details retrieved successfully', { duration: 4000 });
      } else {
        toast('Failed to retrieve product details', { duration: 4000 });
      }
    } catch (error) {
      console.error('Error retrieving product details:', error);
      toast('Error fetching product details', { duration: 4000 });
    }
  };

  // Search product functionality after registration or QR upload
  const handleSearchProduct = async (code) => {
    setLoading(true);
    try {
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('product_code', code);

      if (error || !product.length) {
        toast('Product not found in Supabase', { duration: 4000 });
        setLoading(false);
        return;
      }

      // Fetch from blockchain
      const blockchainDetails = await contract.methods.getProductDetails(code).call();
      setProductDetails({ ...product[0], ...blockchainDetails });

      toast('Product details found', { duration: 4000 });
    } catch (error) {
      console.error('Error searching product:', error);
      toast('Failed to search product', { duration: 4000 });
    }
    setLoading(false);
  };

  // Submit handler
  const onSubmit = (data) => {
    connectWallet().then(() => validateContractWithBlockchain(qrData || data.contractAddress));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-8 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className='font-spaceGrotesk text-lg'>Register Your Products and Materials</CardTitle>
            <CardDescription>Use the form below to register your products by product code or upload a QR code.</CardDescription>
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
              <Label className='flex flex-col gap-3' htmlFor="qr-code-upload">Upload QR Code
                <Input type="file" className='font-light' accept="image/*" onChange={(e) => handleQrCodeUpload(e.target.files[0])} />
              </Label>
            </div>

            <Button type='submit' className='font-jakarta'>Register Product</Button>
          </CardContent>

          <CardFooter>
            <DisplayProductData />
          </CardFooter>
        </Card>

        {/* Product Search */}
        <div className="w-full max-w-4xl mt-8">
          <div className="flex justify-between items-center">
            <Label className='font-jakarta'>Search by Product Code</Label>
            <div className="flex w-full max-w-md">
              <Input
                className='font-light'
                placeholder="Enter product code to search"
                onKeyDown={(e) => e.key === 'Enter' && handleSearchProduct(e.target.value)}
              />
              <Button onClick={() => handleSearchProduct(getValues('product_code'))} className="ml-2">Search</Button>
            </div>
          </div>

          {loading && <p>Loading...</p>}
          {productDetails && (
            <div className="mt-4">
              <h3>Product Details:</h3>
              <p>Product Code: {productDetails.product_code}</p>
              <p>Product Name: {productDetails.product_name}</p>
              <p>Raw Materials: {productDetails.raw_materials}</p>
              <p>Additional Blockchain Data: {productDetails.blockchain_data}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductRegistrationInteraction;
