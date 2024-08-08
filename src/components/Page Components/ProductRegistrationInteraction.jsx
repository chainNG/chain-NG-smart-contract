import React, { useEffect, useState } from 'react'
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { handleDownload } from '../../utils/misc/dataRetrieval'
import contractABI from '../../services/ABIs/contractABI.json'
import DisplayProductData from '../Render Components/DisplayProductData'
import { ArrowUpIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { useAuthStore, useContractStore, useProductStore } from '../../services/store/index'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { z, string, number } from 'zod'
import { useForm } from 'react-hook-form'


const productSchema = z.object({
  product_code: string().startsWith('6').min(13),
  product_name: string().min(3, { message: 'Product Name must be at least 3 characters' }),
  raw_materials: string().min(3, { message: 'Raw Material must be at least 3 characters' })
})

const ProductRegistrationInteraction = ({ web3 }) => {


  const {
    productName,
    productCode,
    transactionStats,
    setBatchAddresses,
    setProducts,
    rawMaterials,
    materialName,
    materialCode,
    setProductCode,
    setProductName,
    setRawMaterials,
    setTransactionStats,
  } = useProductStore();
  const { account, contract, setContract, setAccount, } = useContractStore()
  const [status, setStatus] = useState(null)
  const [txHash, setTxHash] = useState(null)
  const [txCount, setTxCount] = useState(null)

  const contractAbi = contractABI

  const { register, control, getValues, formState, handleSubmit } = useForm({
    resolver: zodResolver(productSchema)
  })

  const { errors } = formState

  const connectWallet = async () => {


    if (!window.ethereum) {
      toast('Please install Metamask to use this feature', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CheckCircledIcon />
      })
    }
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: "0x13881" }],
      })
    } catch (e) {
      console.log(e)
    }

    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      })
      const accounts = await web3.eth.getAccounts()

      if (accounts.length > 0) {
        console.log('Connected to Metamask')
        toast('Connected to Metamask', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 4000,
          icon: <CheckCircledIcon />
        })
        web3.setProvider(import.meta.env.VITE_API_URL)
        setAccount(accounts)
        setWeb3(web3)
        const contract = new web3.eth.Contract(contractABI, import.meta.env.VITE_CONTRACT_ADDRESS);
        setContract(contract)
        web3.eth.defaultAccount = accounts[0]
      }
      else {
        console.log('Metamask is  not connected')
        toast('Please Connect to Metamask', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 4000,
          icon: <CrossCircledIcon />
        })
      }
    }
    else {
      console.log('Metamask is not installed')
      toast('Please install Metamask', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CrossCircledIcon />
      })
    }
  }



  async function fetchProducts() {
    try {
      const productDataArray = await contract.methods.getAllProductData().call();
      setProducts(productDataArray)
      const totalBatchAddresses = productDataArray.map((product) => {
        return product.bacAddress
      })
      setBatchAddresses(totalBatchAddresses)

    } catch (error) {
      console.error('Error fetching product data array:', error);
      return [];
    }
    // register(account[0])

  }


  useEffect(() => {
    if (contract) {
      fetchProducts()
    }
  }, [account, txHash])




  const handleRegisterProduct = async (data) => {
    if (contract === null) {
      toast('Please Connect Your Wallet 👆👆', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CheckCircledIcon />
      })
    }
    //ENSURE TO USE THE ENCODE ABI METHOD AFTER TRYING TO INITIALIZE THE CONTRACT
    const contractData = await contract.methods.register(data.productCode, data.productName, data.rawMaterials).encodeABI()

    const params = [{
      from: account[0],
      to: import.meta.env.VITE_CONTRACT_ADDRESS,
      data: contractData
    }]

    const startTime = performance.now()

    let result = await window.ethereum.request({ method: 'eth_sendTransaction', params })
      .then((hash) => {
        console.log('Transaction Completed: ' + hash)
        setTxHash(hash)

        setTxCount(txCount + 1)
        console.log(txCount)
      }).catch((error) => {
        console.log(error.message)
      })


    const transactionReceipt = await web3.eth.getTransactionReceipt(txHash)
    const status = parseInt(transactionReceipt.status)
    const endTime = performance.now()
    let duration = formatMilliseconds(endTime - startTime)
    let gasUsed = Number(transactionReceipt.gasUsed)

    gasUsed += gasUsed
    duration += duration

    console.log(gasUsed, duration)
    result = {
      ...result, duration, gasUsed
    }
    setStatus(status)
    if (status === 0) {
      toast('Product Registration Failed', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CrossCircledIcon />
      })
    }
    else {

      console.log(txCount)
      if (txCount % 5 === 0) {
        transactionStats.push({ attemptsMade: txCount, duration: duration, gasUsed: gasUsed })
        setTransactionStats(transactionStats)
        console.log(txCount, duration, gasUsed)
      }

      toast('Product Registered Successfully', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CheckCircledIcon />
      })


    }
    console.log(transactionStats)

  }

  const onSubmitLogin = () => {
    if (Object.keys(errors) !== 0) {
      handleRegisterProduct(getValues())
    }
  }



  return (

    <form onSubmit={handleSubmit(onSubmitLogin)}>

      <Card >

        <div className='flex w-full items-center justify-between font-mono py-2'>
          <p>

          </p>
        </div>
        <CardHeader className='flex flex-row  justify-between'>
          <div className='flex flex-col'>
            <CardTitle className='font-spaceGrotesk text-3xl'>Platform Information</CardTitle>
            <CardDescription className='font-spaceGrotesk'>
              {!account ? <p> please connect an account</p> : <p> Connected Account: {account} </p>}
            </CardDescription>
          </div>
          <div className='font-jakarta '>
            <Button className='' onClick={connectWallet}> {!account ? 'Connect Wallet' : 'Connected'} </Button>
          </div>


        </CardHeader>

        <CardHeader>
          <CardTitle className='font-spaceGrotesk text-lg '>
            Register Your Products and Materials
          </CardTitle>

        </CardHeader>



        <div className='flex w-full justify-center  gap-2'>
          <CardContent className="space-y-2 w-full font-light">
            <div className="space-y-1 font-jakarta">
              <Label className='flex flex-col gap-3' htmlFor="product-code ">Product Code
                <Input className='font-light' {...register('product_code')} placeholder="product code (13 bit)" />
                <div className='text-red-500 '>{errors.product_code?.message}</div>
              </Label>
            </div>
            <div className="space-y-1 font-jakarta  font-light">
              <Label className='flex flex-col gap-3' htmlFor="product-name">Product Name
                <Input className='font-light' {...register('product_name')} id="product-name" placeholder="product name ( 3 chars at least)" />
                <div className='text-red-500 '>{errors.product_name?.message}</div>
              </Label>
            </div>

            <div className="space-y-1 font-jakarta font-light">
              <Label className='flex flex-col gap-3' htmlFor="raw-materials">Raw Materials
                <Input className='font-light' {...register('raw_materials')} id="raw-materials" placeholder="Barley" />
                <div className='text-red-500 '>{errors.raw_materials?.message}</div>
              </Label>
            </div>
          </CardContent>
          <CardContent className="space-y-2 font-light w-full">
            <div className="space-y-1 font-jakarta">
              <Label className='flex flex-col gap-3' htmlFor="material-code ">Material Code</Label>
              <Input value={materialCode} onChange={(e) => { useProductRegistrationStore.setState(e.target.value) }} id="material-code" placeholder="EC12345" />
            </div>
            <div className="space-y-1 font-jakarta  font-light">
              <Label className='flex flex-col gap-3' htmlFor="material-name">Material Name</Label>
              <Input value={materialName} onChange={(e) => { useProductRegistrationStore.setState(e.target.value) }} id="material-name" placeholder="Grains" />
            </div>

            <div className=' h-[3rem] flex items-center justify-start   font-jakarta'>
              <Button onClick={fetchProducts}>
                Register Materials
              </Button>
            </div>
          </CardContent>
        </div>

        <CardFooter>
          <Button type='submit' className='font-jakarta' >Register Product</Button>
          <Button className=' ml-8 font-jakarta' onClick={() => { handleDownload(transactionStats) }} >Download Details</Button>
        </CardFooter>

        <CardContent className="space-y-2 w-full font-light">
          <DisplayProductData />
        </CardContent>

      </Card>

    </form>
  )
}

export default ProductRegistrationInteraction
