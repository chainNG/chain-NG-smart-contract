import React, { useEffect, useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import DisplayBatchData from '../Render Components/DisplayBatchData';
import { Input } from "../../../components/ui/input";
import { toast } from 'sonner';
import { Label } from "../../../components/ui/label";
import { zodResolver } from '@hookform/resolvers/zod';
import { z, string } from 'zod';
import { CrossCircledIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { supabase } from '../../utils/supabaseClient';
import useContractStore from '../../services/store/useContractStore';

const BatchRegistrationInteraction = () => {
  const { account } = useContractStore();
  const [productCode, setProductCode] = useState('');
  const [totalBatches, setTotalBatches] = useState([]);
  const { register, handleSubmit, formState, reset, setValue } = useForm({
    resolver: zodResolver(z.object({
      product_code: string().length(13, 'Product Code must be exactly 13 digits').startsWith('6'),
      batch_code: string().length(13, 'Batch Code must be exactly 13 digits').startsWith('1'),
      batch_amount: string().min(1, { message: 'Batch amount must be provided' }),
      raw_materials_used: string().min(3, { message: 'Raw materials must be at least 3 characters' }),
      manager_role: string().nonempty({ message: 'Manager role must be selected' }),
    })),
  });

  const { errors } = formState;

  // Function to find product details based on product code
  const findProductDetails = async () => {
    try {
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('product_code', productCode)
        .single();

      if (error || !product) {
        toast(`No product found for the code: ${productCode}`, {
          className: 'font-mono text-lg h-[4rem]',
          duration: 3000,
          icon: <CrossCircledIcon />
        });
        return;
      }

      // Automatically fill form fields with product details
      setValue('batch_code', product.batch_code || '');
      setValue('batch_amount', product.batch_amount || '');
      setValue('raw_materials_used', product.raw_materials || '');
      setValue('manager_role', product.manager_role || ''); // Default role if available
      toast(`Product found for code: ${productCode}`, {
        className: 'font-mono text-lg h-[4rem]',
        duration: 3000,
        icon: <CheckCircledIcon />
      });
    } catch (error) {
      console.error('Error fetching product data:', error);
      toast('Error occurred while fetching product details', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 3000,
        icon: <CrossCircledIcon />
      });
    }
  };

  // Function to add a new batch
  const addBatch = async (data) => {
    const { batch_code, batch_amount, raw_materials_used, manager_role } = data;
    const tucAddress = account[0];

    try {
      const { error } = await supabase.from('batches').insert([
        {
          product_code: productCode,
          batch_code,
          batch_amount,
          raw_materials: raw_materials_used,
          manager_role,
          tuc_address: tucAddress,
        },
      ]);

      if (error) throw error;

      toast('Batch successfully added', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CheckCircledIcon />
      });

      reset(); // Reset form fields
      retrieveAllBatches(); // Fetch updated batches after adding a new one
    } catch (error) {
      console.error('Error adding batch:', error);
      toast('Error adding batch to the database.', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CrossCircledIcon />
      });
    }
  };

  // Function to retrieve all batches
  const retrieveAllBatches = async () => {
    try {
      const { data: batches, error } = await supabase.from('batches').select('*');
      if (error) throw error;

      setTotalBatches(batches);
    } catch (error) {
      console.error('Error fetching batches:', error);
      toast('Error fetching batch records.', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CrossCircledIcon />
      });
    }
  };

  useEffect(() => {
    retrieveAllBatches(); // Fetch initial batch records on mount
  }, []);

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
          <div className="space-y-1 mb-[2rem] flex h-[8rem] items-start justify-center w-full flex-col gap-2">
            <h2 className='text-xl'>Search for a product to add</h2>
            <Label className='flex flex-col gap-2' htmlFor="product-code">Product Code</Label>
            <Input id="product-code" value={productCode} placeholder="Product code (13 digits)" onChange={(e) => setProductCode(e.target.value)} />
            <Button className='text-md w-[6rem] h-[2.5rem]' type="button" style={{ backgroundColor: 'green' }} onClick={findProductDetails}>Search</Button>
          </div>

          <div className="space-y-1">
            <Label htmlFor="batch_code">Batch Code</Label>
            <Input id="batch_code" {...register('batch_code')} placeholder="Batch code (13 digits)" />
            <div className='text-red-500'>{errors.batch_code?.message}</div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="batch_amount">Batch Amount</Label>
            <Input id="batch_amount" {...register('batch_amount')} placeholder="Batch amount" />
            <div className='text-red-500'>{errors.batch_amount?.message}</div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="raw_materials_used">Raw Materials Used</Label>
            <Input id="raw_materials_used" {...register('raw_materials_used')} placeholder='e.g. Tea, Sugar' />
            <div className='text-red-500'>{errors.raw_materials_used?.message}</div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="manager_role">Manager Role</Label>
            <div className="flex gap-4">
              <label>
                <input {...register('manager_role')} type="radio" value="owner" /> Owner
              </label>
              <label>
                <input {...register('manager_role')} type="radio" value="consumer" /> Consumer
              </label>
            </div>
            <div className='text-red-500'>{errors.manager_role?.message}</div>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" style={{ backgroundColor: 'green' }} className='font-jakarta'>Add Batch</Button>
          <Button type="button" style={{ backgroundColor: 'green' }} onClick={retrieveAllBatches} className='ml-8 font-jakarta'>Fetch Batches</Button>
        </CardFooter>

        <CardContent>
          <DisplayBatchData data={totalBatches} />
        </CardContent>
      </Card>
    </form>
  );
};

export default BatchRegistrationInteraction;
