import React, { useState, useEffect } from 'react';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import DisplayTransactionData from '../Render Components/DisplayTransactionData';
import { toast } from 'sonner';
import ContractABI from '../../services/ABIs/contractABI.json';
import * as XLSX from 'xlsx';
import transactionABI from '../../services/ABIs/transactionRegistration.json';
import { ArrowDownIcon, CrossCircledIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { Label } from "../../../components/ui/label";
import { useAuthStore, useProductStore, useContractStore, useTransactionRegistrationStore } from '../../services/store';
import { CustomSelect } from '../../Reusables/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, string } from 'zod';
import { useForm } from 'react-hook-form';
import { supabase } from '../../utils/supabaseClient';

const TransactionRegistrationInteraction = () => {
  const { user } = useAuthStore();
  const { web3, account } = useContractStore();
  const { batches } = useProductStore();
  const {
    targetAddress,
    receiver,
    batchCode,
    status,
    totalTransactions,
    filteredTransactions,
    txHash,
    previousTxHash,
    setTargetAddress,
    setReceiver,
    setBatchCode,
    setStatus,
    setTotalTransactions,
    setTxHash,
    setPreviousTXHash,
    setFilteredTransactions
  } = useTransactionRegistrationStore();

  const industryOptions = [
    { value: 'ABC Farms', label: 'ABC Farms' },
    { value: 'Maroon Logistics', label: 'Maroon Logistics' },
    { value: 'Wakanda Inc', label: 'Wakanda Inc' },
    { value: 'Dede Distribution', label: 'Dede Distribution' },
    { value: 'Musak Ventures', label: 'Musak Ventures' },
  ];

  const { register, control, getValues, formState, handleSubmit } = useForm({});

  
  const findBatchesByCode = async () => {
    try {
      
      const { data: batch, error } = await supabase
        .from('batches')
        .select('*')
        .eq('batch_code', batchCode);

      if (error || !batch.length) {
        toast(`Batch Not Found in Supabase.`, {
          className: 'font-mono text-lg h-[4rem]',
          duration: 3000,
          icon: <CrossCircledIcon />
        });
        return;
      }

      const contractObj = batch[0];
      const targetAddress = contractObj.batchManager;

      if (contractObj) {
        const contract = new web3.eth.Contract(ContractABI, targetAddress);
        const TUCAddress = await contract.methods.getTUCAddressForBatch(batchCode).call();

        toast(`Batch Found with address ${targetAddress}`, {
          className: 'font-mono text-lg h-[4rem]',
          duration: 3000,
          icon: <CheckCircledIcon />
        });

        setTargetAddress(TUCAddress);
      }
    } catch (error) {
      console.error('Error searching batch:', error);
      toast('Error occurred while searching for batch', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 3000,
        icon: <CrossCircledIcon />
      });
    }
  };

  
  const updateTransaction = async () => {
    const transactionContract = new web3.eth.Contract(transactionABI, targetAddress);

    const prevTXHashCheck = previousTxHash.startsWith('0x') ? previousTxHash : previousTxHash;
    const data = await transactionContract.methods
      .transferCustodyString(receiver, '', prevTXHashCheck)
      .encodeABI();

    const params = [
      {
        from: account[0],
        to: targetAddress,
        data: data,
      }
    ];

    try {
      const result = await window.ethereum.request({ method: 'eth_sendTransaction', params });
      setTxHash(result);
      toast('Transaction Updated Successfully', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 2000,
        icon: <CheckCircledIcon />
      });
    } catch (error) {
      console.error('Error during transaction:', error);
      toast('Transaction Update Failed', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 2000,
        icon: <CrossCircledIcon />
      });
    }
  };

  
  const getAllTransactions = async () => {
    const transactionContract = new web3.eth.Contract(transactionABI, targetAddress);
    const transactionArray = await transactionContract.methods.getAllTransactions().call();
    setTotalTransactions(transactionArray);
  };

  
  const traceRoute = filteredTransactions?.map((item, i) => (
    <span key={i} className='flex flex-col mt-2 items-center justify-center gap-2'>
      <p>From {item.sender}</p>
      <ArrowDownIcon />
      <p>To {item.receiver}</p>
    </span>
  ));

  useEffect(() => {
    if (batches.length > 0) {
      getAllTransactions();
    }
  }, [batches]);

  return (
    <Card style={{ zoom: '0.71' }}>
      <CardHeader>
        <CardTitle className='font-spaceGrotesk text-2xl'>Update Transaction</CardTitle>
        <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2 font-jakarta">
        <div className="space-y-1">
          <Label htmlFor="batch-number">Batch Code</Label>
          <Input id="batch-number" placeholder='672132...' value={batchCode} onChange={(e) => setBatchCode(e.target.value)} />
        </div>
      </CardContent>

      <CardFooter>
        <Button className='font-jakarta' onClick={findBatchesByCode}>Search TX</Button>
      </CardFooter>

      <CardContent className='font-jakarta text-lg'>
        <CardDescription className='h-[4rem] text-xl'>
          <h3>Update Transactions</h3>
        </CardDescription>
        <div className="space-y-1">
          <Label htmlFor="prev-tx">Prev TX Hash</Label>
          <Input id="prev-tx" placeholder='Input the previous TX hash' value={previousTxHash} onChange={(e) => setPreviousTXHash(e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="receiver">Receiver</Label>
          <CustomSelect
            name="Industry"
            control={control}
            className=''
            options={industryOptions}
            placeholder="Select the receiver"
          />
        </div>
        <Button className='mt-6' onClick={updateTransaction}>Transfer Batches</Button>
        <Button className='mt-6 ml-4' onClick={getAllTransactions}>Fetch Transactions</Button>
      </CardContent>

      <CardContent className='overflow-scroll'>
        {filteredTransactions ? traceRoute : <div></div>}
      </CardContent>

      <CardContent>
        <DisplayTransactionData data={totalTransactions} />
      </CardContent>
    </Card>
  );
};

export default TransactionRegistrationInteraction;
