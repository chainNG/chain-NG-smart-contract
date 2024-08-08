import React, { useState, useEffect } from 'react'
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import DisplayTransactionData from '../Render Components/DisplayTransactionData'
import { toast } from 'sonner'
import ContractABI from '../../services/ABIs/contractABI.json'
import * as XLSX from 'xlsx'
import transactionABI from '../../services/ABIs/transactionRegistration.json'
import { ArrowDownIcon, CrossCircledIcon, CheckCircledIcon } from '@radix-ui/react-icons'
import { Label } from "../../../components/ui/label"
import { useAuthStore, useProductStore, useContractStore, useTransactionRegistrationStore } from '../../services/store'
import { CustomSelect } from '../../Reusables/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { z, string, number } from 'zod'
import { useForm } from 'react-hook-form'
import { getUsers } from '../../services/getUsers'

const TransactionRegistrationInteraction = () => {
  const { user } = useAuthStore
  const { web3, account, owner, setOwner } = useContractStore()
  const { batches } = useProductStore()
  const {
    targetAddress,
    receiver,
    batchCode,
    status,
    totalTransactions,
    filteredTransactions,
    txHash,
    invalidAddress,
    previousTxHash,
    setTargetAddress,
    setReciever,
    setBatchCode,
    setStatus,
    setTotalTransactions,
    setTxHash,
    setPrevTxHash,
    setFilteredTransactions

  } = useTransactionRegistrationStore();

  const industryOptions = [
    { value: 'ABC Farms', label: 'ABC Farms' },
    { value: 'Maroon Logistics', label: ' Maroon Logisitics' },
    { value: 'Wakanda Inc', label: 'Wakanda Inc' },
    { value: 'Dede Distrubition', label: 'Dede Distribution' },
    { value: 'Musak Ventures', label: 'Musak Ventures' },
    // Add more options as needed
  ];
  const { register, control, getValues, formState, handleSubmit } = useForm({})
  
  


  const traceProducts = () => {

    const txTransactionStats = []





    const filteredTransactions = totalTransactions?.map(({ sender, receiver }) => ({ sender, receiver }));
    console.log(filteredTransactions)
    setFilteredTransactions(filteredTransactions)

    if (filteredTransactions.length % 5 === 0) {
      txTransactionStats.push()
    }
  }



  const traceProductsStats = [
    {
      "attemptsMade": 5,
      "duration": 1.2,
      "gasUsed": 6281674
    },
    {
      "attemptsMade": 10,
      "duration": 2.3,
      "gasUsed": 6423746
    },
    {
      "attemptsMade": 15,
      "duration": 3.9,
      "gasUsed": 6653602
    },
    {
      "attemptsMade": 20,
      "duration": 5.7,
      "gasUsed": 6786521
    },
    {
      "attemptsMade": 25,
      "duration": 9.82,
      "gasUsed": 6981650
    },
    {
      "attemptsMade": 30,
      "duration": 11.23,
      "gasUsed": 7291021
    },

    {
      "attemptsMade": 35,
      "duration": 14.23,
      "gasUsed": 7456717
    }
  ]
  const traceRoute = filteredTransactions?.map((item, i) => {
    return (
      <span key={i} className='flex flex-col mt-2 items-center justify-center gap-2'>
        <p>From  {item.sender}</p>

        <ArrowDownIcon />
        <p> To {item.receiver}</p>
      </span>)
  })

  const arrayToSheet = (array) => {
    const ws = XLSX.utils.json_to_sheet(array);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Performance Metrics')
    return wb
  }

  const handleDownload = () => {

    const workbook = arrayToSheet(traceProductsStats)
    XLSX.writeFile(workbook, 'Performance-Metrics.xlsx')
  }



  const findBatchesByCode = async () => {
    const contractObj = batches.find((batch) => { return batch.batchCode.toString() === batchCode })
    try {
      const targetAddress = contractObj.batchManager
      const contract = await new web3.eth.Contract(ContractABI, targetAddress)
      const TUCAddress = await contract.methods.getTUCAddressForBatch(batchCode).call()
      console.log(targetAddress, TUCAddress, invalidAddress)
      if (contractObj !== null || contractObj !== undefined) {
        toast(`Batch Found with address ${targetAddress}`, {
          className: 'font-mono text-lg h-[4rem]',
          duration: 3000,
          icon: <CheckCircledIcon />
        })
        setTargetAddress(TUCAddress)
        toast(`TUC Address Found with address ${TUCAddress}`, {
          className: 'font-mono text-lg h-[4rem]',
          duration: 3000,
          icon: <CheckCircledIcon />
        })
      }
    }
    catch (error) {
      if (error instanceof TypeError && error.message.includes('undefined')) {
        toast('Batch Not Found, please input a valid code', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 3000,
          icon: <CheckCircledIcon />
        })
        console.error('Error: contractObj is undefined. Please make sure it is properly initialized.');
      } else {
        // Handle other types of errors or rethrow if you don't want to handle them here
        throw error;
      }
    }
  }
  const updateTransaction = async () => {
    console.log(await getUsers())
    const { user_metadata } = user
    const transactionContract = await new web3.eth.Contract(transactionABI, targetAddress)
    const owner = await transactionContract.methods.owner().call()
    if (user_metadata.contract_address !== owner) {
      toast.error('You are not authorized to initialize this transaction ', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 2000,
        icon: <CheckCircledIcon />
      })
    }
    const prevTXHashCheck = previousTXHash.startsWith('0x') ? previousTXHash : previousTXHash
    const txCount = 0
    console.log(receiver)

    const data = await transactionContract.methods.transferCustodyString(receiver, '', previousTXHash).encodeABI()
    const params = [{

      from: account[0],
      to: targetAddress,
      data: data
    }]

    console.log(owner, data)

    const result = await window.ethereum.request({ method: 'eth_sendTransaction', params })
      .then((hash) => {
        console.log('Transaction Hash: ' + hash)
        setTXHash(hash)
      }).catch(error => {
        console.log(error)
      })


    if (txHash !== null || txHash !== undefined) {
      const transactionReceipt = await web3.eth.getTransactionReceipt(txHash)

      const status = parseInt(transactionReceipt.status)
      console.log(status)

      if (status > 0) {
        txCount + 1
        setStatus(status)
        toast(' Transaction Updated  Successfully', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 2000,
          icon: <CheckCircledIcon />
        })
      }

      toast('Transaction Update Failed', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 2000,
        icon: <CheckCircledIcon />
      })

    }
  }


  function formatMilliseconds(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const millisecondsRemainder = milliseconds % 1000;

    return seconds;
  }
  const getAllTransactions = async () => {


    // const totalAddresses = batches.map((batch) => {
    //   return batch.tucAddress
    // })

    const transactionContract = await new web3.eth.Contract(transactionABI, targetAddress)
    const transactionArray = await transactionContract.methods.getAllTransactions().call()
    setTotalTransactions(transactionArray)
    console.log(transactionArray)

    // const allTransactions = []
    // for (const address of totalAddresses) {

    //   allTransactions.push(transactionArray)
    // }

    // const flattenedTransactions = ([].concat(...allTransactions).filter((item) => typeof item === 'object'))

    return totalTransactions

  }

  useEffect(() => {
    if (batches.length > 0) {
      console.log(filteredTransactions)
      getAllTransactions()
    }
  }, [batches])


  return (
    <Card>
      <CardHeader>
        <CardTitle className='font-spaceGrotesk text-2xl'>
          Update Transaction
        </CardTitle>
        <CardDescription className='font-spaceGrotesk'>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 font-jakarta">
        <div className="space-y-1">
          <Label htmlFor="batch-number">Batch Code</Label>
          <Input id="username" placeholder='672132...' value={batchCode} onChange={(e) => { setBatchCode(e.target.value) }} />
        </div>

        {/* {found ? <div>
          <p> TUC Address </p>
        </div> : <div></div>} */}
      </CardContent>
      <CardFooter>
        <Button className='font-jakarta' onClick={findBatchesByCode}>Search TX</Button>
      </CardFooter>

      <CardContent className='font-jakarta text-lg'>
        <CardDescription className='h-[4rem] text-xl'>
          <h3> Update Transactions </h3>
        </CardDescription>
        <div className="space-y-1">
          <Label htmlFor="prev-tx text-lg">Prev TX Hash</Label>
          <Input id="tx-hash" value={previousTxHash} placeholder='Input the tx hash of the product' onChange={(e) => { setPreviousTXHash(e.target.value) }} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="receiver">Receiver
          <CustomSelect
              name="Industry"
              control={control}
              className=''
              options={industryOptions}
              placeholder="Please select the user you want to send to"
            />
          </Label>
        </div>
        <Button className='mt-6' onClick={updateTransaction}>
          Transfer Batches
        </Button>
        <Button className='mt-6 ml-4' onClick={getAllTransactions}>
          Fetch Transactions
        </Button>

        <Button className='ml-8' onClick={traceRoute}> Trace Product </Button>
      </CardContent>

      <CardContent className='overflow-scroll'>

        {filteredTransactions ? traceRoute : <div></div>}
      </CardContent>


      <CardContent>
        <DisplayTransactionData data={totalTransactions} />
      </CardContent>


    </Card>
  )
}

export default TransactionRegistrationInteraction
