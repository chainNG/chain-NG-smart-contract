import React, { useEffect, useState } from 'react'
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../components/ui/card"
import DisplayBatchData from '../Render Components/DisplayBatchData'
import { Input } from "../../../components/ui/input"
import ContractABI from '../../services/ABIs/batchRegistration.json'
import { toast } from 'sonner'
import useContractStore from '../../services/store/useContractStore'
import useProductStore from '../../services/store/useProductStore'
import { Label } from "../../../components/ui/label"
import { zodResolver } from '@hookform/resolvers/zod'
import { z, string, number } from 'zod'
import { CrossCircledIcon, CheckCircledIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
const BatchRegistrationInteraction = () => {
  const invalidAddress = '0x0000000000000000000000000000000000000000'
  const { batchAddresses, batches, setBatches } = useProductStore()
  const { web3, account, contract } = useContractStore()
  const [productCode, setProductCode] = useState(null)
  const [batchCode, setBatchCode] = useState(null)
  const [batchCount, setBatchCount] = useState(null)
  const [rawMaterialsUsed, setRawMaterialsUsed] = useState(null)
  const [batchAddress, setBatchAddress] = useState(null)
  const [totalBatches, setTotalBatches] = useState([])
  const [batchContract, setBatchContract] = useState(null)
  const [txHash, setTxHash] = useState(null)
  const [status, setStatus] = useState(null)


  const batchSchema = z.object({
    product_code: string().startsWith('6').min(13),
    batch_code: string().startsWith('1').min(13),
    batch_count: string().min(1),
    raw_materials_used: string().min(3, { message: 'Raw Material must be at least 3 characters' })
  })
  
  const { register, control, getValues, formState, handleSubmit } = useForm({
    resolver: zodResolver(batchSchema)
  })

  
  const { errors } = formState


  const findProductsByCode = async () => {
    try {
      const targetAddress = await contract.methods.getBACAddressForProduct(productCode).call()

      setBatchAddress(targetAddress)
      if (targetAddress !== invalidAddress) {
        toast(`Product Found with address ${targetAddress}`, {
          className: 'font-mono text-lg h-[4rem]',
          duration: 3000,
          icon: <CheckCircledIcon />
        })
      }
        toast(`Product Not Found, please input a valid code`, {
          className: 'font-mono text-lg h-[4rem]',
          duration: 2000,
          icon: <CrossCircledIcon />
        })
    }
    catch (error) {
      console.error('Error fetching product data array:', error);
      return [];
    }
    console.log('clicked ' + productCode, batchAddress)
  }

  const onSubmit = () => {
    if (Object.keys(errors) !== 0) {
      addBatch(getValues())
    }
  }

  const addBatch = async (data) => {

  
    const batchABI = ContractABI
    const batchContract = await new web3.eth.Contract(batchABI, batchAddress)
    const contractData = await batchContract.methods.addBatch(data.batchCode, data.batchCount, data.rawMaterialsUsed).encodeABI()
    const params = [{
      from: account[0],
      to: batchAddress,
      data: contractData,

    }]

    let result = await window.ethereum.request({ method: 'eth_sendTransaction', params })
      .then((hash) => {
        console.log('Transaction Hash: ' + hash)
        setTxHash(hash)
      }).catch(error => {
        console.log(error)
      })


    if (txHash !== null || txHash !== undefined) {
      const transactionReceipt = await web3.eth.getTransactionReceipt(txHash)

      const status = parseInt(transactionReceipt.status)
      if (status === false) {
        console.log('Transaction Failed' + transactionReceipt.errorMessage)
      }
      setStatus(status)
      if (status > 0) {
        // setStatus(status)
        toast(' Batch Added Successfully', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 2000,
          icon: <CheckCircledIcon />
        })
        setBatchCode('')
        setBatchCount('')
        setRawMaterialsUsed('')
      }
      else {
        toast('Batch Registration Failed', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 2000,
          icon: <CheckCircledIcon />
        })
      }
    }

  }

 
  const retrieveAllBatches = async () => {
    const totalBatchesArray = []
    for (const address of batchAddresses) {
      const batchContract = await new web3.eth.Contract(ContractABI, address)
      const batchesArray = await batchContract.methods.getAllBatches().call()
      totalBatchesArray.push(batchesArray)
    }
    const flattenedBatches = ([].concat(...totalBatchesArray).filter(item => typeof item === 'object'))
    setTotalBatches(flattenedBatches)
    setBatches(flattenedBatches)
    console.log(flattenedBatches)
    return totalBatchesArray
  }

  useEffect(() => {
    if (contract) {
      retrieveAllBatches()
    }
  }, [account, txHash])


  return (
 <form onSubmit={handleSubmit(onSubmit)} >
     <Card>
      <CardHeader>
        <CardTitle className='font-spaceGrotesk text-[1.8rem]'>Batch Registration</CardTitle>
        <CardDescription className='font-jakarta text-md text-gray-800 font-semibold'>
          Add Your Products in Batches
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2 font-jakarta">
        <form className="space-y-1 mb-[2rem] flex  h-[8rem] items-start justify-center w-full flex-col gap-2">
          <h2 className='text-xl'> Search for a product to add</h2>
          <Label className='flex flex-col gap-2' htmlFor="product-code">Product Code</Label>
          <Input id="product-code" value={productCode}  placeholder="product code (13 bit) " onChange={(e) => { setProductCode(e.target.value) }} />
          <Button className='text-md w-[6rem] h-[2.5rem]' onClick={findProductsByCode}> Search </Button>
        </form>

        <div className="space-y-1">
          <Label className='flex flex-col gap-2' htmlFor="batch-code">Batch Code
          <Input id="batch_code" {...register('batch_code')} placeholder="batch code (13 bit)"  />
          <div className='text-red-500'>{errors.batch_code?.message}</div>
          </Label>
        </div>
        <div className="space-y-1">
          <Label className='flex flex-col gap-2' htmlFor="batch-count">Batch Count 
          <Input  id="batch-count" {...register('batch_count')} placeholder='100' />
          <div className='text-red-500'>{errors.batch_count?.message}</div>
          </Label>

        </div>
        <div className="space-y-1">
          <Label className='flex flex-col gap-2' htmlFor="raw-materials_used" >Raw Materials Used
          <Input id="raw-materials_used" {...register('raw_materials_used')} placeholder='Tea'  />
          <div className='text-red-500'>{errors.raw_materials_used?.message}</div>
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={addBatch} className='font-jakarta'>Add Batch</Button>
        <Button onClick={retrieveAllBatches} className=' ml-8 font-jakarta'>Fetch Batches</Button>
      </CardFooter>

      <CardContent>
        <DisplayBatchData data={totalBatches} />
      </CardContent>

      {/* 
      <CardContent className="space-y-1  flex flex-col items-center  justify-center  gap-4 font-jakarta">

        {found ? <div className='flex flex-col items-start justify-center w-full gap-4'>
          <div>
            <p> Product Name: </p>
          </div>
          <div>
            <p> Materials </p>
          </div>

          <div>
            <p> Product Owner </p>
          </div>

          <div>
            <p> BAC Address </p>
          </div>

          <div>
            <p> Registration Date </p>
          </div>
        </div> : <div></div>}




      </CardContent> */}

    </Card>
 </form>
  )
}

export default BatchRegistrationInteraction
