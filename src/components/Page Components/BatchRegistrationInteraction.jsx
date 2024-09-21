import React, { useEffect, useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../components/ui/card";
import DisplayBatchData from '../Render Components/DisplayBatchData';
import { Input } from "../../../components/ui/input";
import ContractABI from '../../services/ABIs/batchRegistration.json';
import { toast } from 'sonner';
import useContractStore from '../../services/store/useContractStore';
import useProductStore from '../../services/store/useProductStore';
import { Label } from "../../../components/ui/label";
import { zodResolver } from '@hookform/resolvers/zod';
import { z, string } from 'zod';
import { CrossCircledIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { supabase } from '../../utils/supabaseClient';

const BatchRegistrationInteraction = () => {
  const invalidAddress = '0x0000000000000000000000000000000000000000';
  const { batchAddresses, batches, setBatches } = useProductStore();
  const { web3, account, contract } = useContractStore();
  const [productCode, setProductCode] = useState(null);
  const [batchCode, setBatchCode] = useState(null);
  const [batchCount, setBatchCount] = useState(null);
  const [rawMaterialsUsed, setRawMaterialsUsed] = useState(null);
  const [batchAddress, setBatchAddress] = useState(null);
  const [totalBatches, setTotalBatches] = useState([]);
  const [batchContract, setBatchContract] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [status, setStatus] = useState(null);
  const [productDetails, setProductDetails] = useState(null);

  const batchSchema = z.object({
    product_code: string().length(13, 'Product Code must be exactly 13 digits').startsWith('6'),
    batch_code: string().length(13, 'Batch Code must be exactly 13 digits').startsWith('1'),
    batch_count: string().min(1),
    raw_materials_used: string().min(3, { message: 'Raw Material must be at least 3 characters' })
  });

  const { register, getValues, formState, handleSubmit } = useForm({
    resolver: zodResolver(batchSchema)
  });

  const { errors } = formState;

  
  const findProductsByCode = async () => {
    try {
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('product_code', productCode);

      if (error || !product.length) {
        toast(`Product not found. Please input a valid product code.`, {
          className: 'font-mono text-lg h-[4rem]',
          duration: 3000,
          icon: <CrossCircledIcon />
        });
        return;
      }

      setProductDetails(product[0]);
      const targetAddress = await contract.methods.getBACAddressForProduct(productCode).call();
      setBatchAddress(targetAddress);

      if (targetAddress !== invalidAddress) {
        toast(`Product Found with blockchain address: ${targetAddress}`, {
          className: 'font-mono text-lg h-[4rem]',
          duration: 3000,
          icon: <CheckCircledIcon />
        });
      } else {
        toast(`Blockchain Address Not Found.`, {
          className: 'font-mono text-lg h-[4rem]',
          duration: 3000,
          icon: <CrossCircledIcon />
        });
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      toast('Error occurred while fetching product details', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 3000,
        icon: <CrossCircledIcon />
      });
    }
  };

  const addBatch = async (data) => {
    if (!batchAddress || batchAddress === invalidAddress) {
      toast('Invalid batch address. Please search for the product first.', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CrossCircledIcon />
      });
      return;
    }

    const batchABI = ContractABI;
    const batchContract = new web3.eth.Contract(batchABI, batchAddress);
    const contractData = await batchContract.methods.addBatch(data.batch_code, data.batch_count, data.raw_materials_used).encodeABI();
    const params = [{
      from: account[0],
      to: batchAddress,
      data: contractData,
    }];

    try {
      const result = await window.ethereum.request({ method: 'eth_sendTransaction', params });
      setTxHash(result);
      toast('Batch successfully added', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CheckCircledIcon />
      });
    } catch (error) {
      console.error('Error adding batch:', error);
      toast('Error adding batch to the blockchain.', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CrossCircledIcon />
      });
    }
  };

  const retrieveAllBatches = async () => {
    const totalBatchesArray = [];
    for (const address of batchAddresses) {
      const batchContract = new web3.eth.Contract(ContractABI, address);
      const batchesArray = await batchContract.methods.getAllBatches().call();
      totalBatchesArray.push(batchesArray);
    }
    const flattenedBatches = [].concat(...totalBatchesArray).filter(item => typeof item === 'object');
    setTotalBatches(flattenedBatches);
    setBatches(flattenedBatches);
  };

  useEffect(() => {
    if (contract) {
      retrieveAllBatches();
    }
  }, [account, txHash]);

  return (
    <form onSubmit={handleSubmit(addBatch)} style={{ zoom: '0.91' }}>
      <Card>
        <CardHeader>
          <CardTitle className='font-spaceGrotesk text-[1.8rem]'>Batch Registration</CardTitle>
          <CardDescription className='font-jakarta text-md text-gray-800 font-semibold'>
            Add Your Products in Batches
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2 font-jakarta">
          <div className="space-y-1 mb-[2rem] flex  h-[8rem] items-start justify-center w-full flex-col gap-2">
            <h2 className='text-xl'>Search for a product to add</h2>
            <Label className='flex flex-col gap-2' htmlFor="product-code">Product Code</Label>
            <Input id="product-code" value={productCode} placeholder="Product code (13 bit)" onChange={(e) => setProductCode(e.target.value)} />
            <Button className='text-md w-[6rem] h-[2.5rem]' type="button" style={{ backgroundColor: 'green'}} onClick={findProductsByCode}>Search</Button>
          </div>

          {productDetails && (
            <div className="space-y-2">
              <p>Product Name: {productDetails.product_name}</p>
              <p>Owner: {productDetails.owner}</p>
              <p>Blockchain Address: {batchAddress}</p>
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="batch_code">Batch Code</Label>
            <Input id="batch_code" {...register('batch_code')} placeholder="Batch code (13 bit)" />
            <div className='text-red-500'>{errors.batch_code?.message}</div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="batch-count">Batch Count</Label>
            <Input id="batch-count" {...register('batch_count')} placeholder='100' />
            <div className='text-red-500'>{errors.batch_count?.message}</div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="raw-materials_used">Raw Materials Used</Label>
            <Input id="raw-materials_used" {...register('raw_materials_used')} placeholder='Tea' />
            <div className='text-red-500'>{errors.raw_materials_used?.message}</div>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" style={{ backgroundColor: 'green'}} className='font-jakarta'>Add Batch</Button>
          <Button type="button" style={{ backgroundColor: 'green'}} onClick={retrieveAllBatches} className='ml-8 font-jakarta'>Fetch Batches</Button>
        </CardFooter>

        <CardContent>
          <DisplayBatchData data={totalBatches} />
        </CardContent>
      </Card>
    </form>
  );
};

export default BatchRegistrationInteraction;