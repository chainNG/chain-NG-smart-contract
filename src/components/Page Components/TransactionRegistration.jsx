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
import { useForm } from 'react-hook-form';
import { supabase } from '../../utils/supabaseClient';

const TransactionRegistrationInteraction = () => {
  const { user } = useAuthStore();
  const { web3, account, owner, setOwner } = useContractStore();
  const { batches } = useProductStore();
  const {
    targetAddress, receiver, batchCode, status, totalTransactions,
    filteredTransactions, txHash, previousTxHash, invalidAddress,
    setTargetAddress, setReceiver, setBatchCode, setStatus, setTotalTransactions,
    setTxHash, setPreviousTxHash, setFilteredTransactions
  } = useTransactionRegistrationStore();

  const industryOptions = [
    { value: 'ABC Farms', label: 'ABC Farms' },
    { value: 'Maroon Logistics', label: 'Maroon Logistics' },
    { value: 'Wakanda Inc', label: 'Wakanda Inc' },
    { value: 'Dede Distribution', label: 'Dede Distribution' },
    { value: 'Musak Ventures', label: 'Musak Ventures' }
  ];

  const { register, control, getValues, formState, handleSubmit } = useForm();

  // Function to find batch details using Supabase and blockchain
  const findBatchesByCode = async () => {
    try {
      // First, query Supabase for the batch
      const { data: batchData, error: supabaseError } = await supabase
        .from('batches')
        .select('*')
        .eq('batch_code', batchCode);

      if (supabaseError || !batchData.length) {
        toast('Batch not found in Supabase. Please input a valid code.', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 3000,
          icon: <CrossCircledIcon />
        });
        return;
      }

      // Set batch details if found
      const targetAddress = batchData[0]?.batchManager;
      setTargetAddress(targetAddress);

      // Check blockchain for the TUC address using the contract ABI
      const contract = new web3.eth.Contract(ContractABI, targetAddress);
      const TUCAddress = await contract.methods.getTUCAddressForBatch(batchCode).call();

      toast(`Batch Found. TUC Address: ${TUCAddress}`, {
        className: 'font-mono text-lg h-[4rem]',
        duration: 3000,
        icon: <CheckCircledIcon />
      });

    } catch (error) {
      console.error('Error fetching batch details:', error);
      toast('Batch not found. Please input a valid code.', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 3000,
        icon: <CrossCircledIcon />
      });
    }
  };

  // Function to update transaction and transfer batches
  const updateTransaction = async () => {
    try {
      const { user_metadata } = user;
      const transactionContract = new web3.eth.Contract(transactionABI, targetAddress);

      // Check if the user is authorized
      const owner = await transactionContract.methods.owner().call();
      if (user_metadata.contract_address !== owner) {
        toast.error('You are not authorized to initialize this transaction', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 2000,
          icon: <CrossCircledIcon />
        });
        return;
      }

      // Prepare the transaction data
      const data = transactionContract.methods.transferCustodyString(receiver, '', previousTxHash).encodeABI();
      const params = [{
        from: account[0],
        to: targetAddress,
        data
      }];

      const result = await window.ethereum.request({ method: 'eth_sendTransaction', params });
      setTxHash(result);

      toast('Transaction Updated Successfully', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 2000,
        icon: <CheckCircledIcon />
      });

    } catch (error) {
      console.error('Transaction update error:', error);
      toast('Transaction Update Failed', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 2000,
        icon: <CrossCircledIcon />
      });
    }
  };

  // Fetch all transactions for the batch
  const getAllTransactions = async () => {
    try {
      const transactionContract = new web3.eth.Contract(transactionABI, targetAddress);
      const transactionArray = await transactionContract.methods.getAllTransactions().call();
      setTotalTransactions(transactionArray);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Trace route for transactions
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
    <Card style={{ zoom: '0.715' }}>
      <CardHeader>
        <CardTitle className='font-spaceGrotesk text-2xl'>Update Transaction</CardTitle>
        <CardDescription className='font-spaceGrotesk'>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2 font-jakarta">
        <div className="space-y-1">
          <Label htmlFor="batch-number">Batch Code</Label>
          <Input
            id="batch-number"
            placeholder='Enter Batch Code'
            value={batchCode}
            onChange={(e) => { setBatchCode(e.target.value); }}
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button className='font-jakarta' style={{ backgroundColor: 'green'}} onClick={findBatchesByCode}>Search TX</Button>
      </CardFooter>

      <CardContent className='font-jakarta text-lg'>
        <CardDescription className='h-[4rem] text-xl'>
          <h3>Update Transactions</h3>
        </CardDescription>

        <div className="space-y-1">
          <Label htmlFor="prev-tx">Previous TX Hash</Label>
          <Input
            id="prev-tx"
            placeholder='Input the previous transaction hash'
            value={previousTxHash}
            onChange={(e) => { setPreviousTxHash(e.target.value); }}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="receiver">Receiver</Label>
          <CustomSelect
            name="Industry"
            control={control}
            className=''
            options={industryOptions}
            placeholder="Please select the user you want to send to"
          />
        </div>

        <Button className='mt-6' style={{ backgroundColor: 'green'}} onClick={updateTransaction}>
          Transfer Batches
        </Button>

        <Button className='mt-6 ml-4' style={{ backgroundColor: 'green'}} onClick={getAllTransactions}>
          Fetch Transactions
        </Button>

        <Button className='ml-8' style={{ backgroundColor: 'green'}} onClick={traceRoute}>Trace Product</Button>
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
