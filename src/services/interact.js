import React, { useEffect, useState } from 'react'
import { Web3 } from 'web3'
import useProductStore from './store/useProductStore'
import { ArrowUpIcon, CheckCircledIcon } from '@radix-ui/react-icons'
import contractABI from './contractABI.json'
const [contract, setContract] = useState(null)
const [account, setAccount] = useState(null)
const [web3, setWeb3] = useState(null)
const [txHash, setTxHash] = useState(null)
// Replace with your contract address'

const { productName, productCode, products, setProducts, rawMaterials, materialName, materialCode, setProductCode, setProductName, setRawMaterials, setMaterialName, setMaterialCode } = useProductStore()
const contractAddress = '0x8fD4f4049ACE13C9A5aCF23eDc382DaaF768d7f6';
const alchemyUrl = 'https://polygon-mumbai.g.alchemy.com/v2/bE6pdrk27bZW93aL3QUr9v_93SCiINit'

export const connectWallet = async () => {

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: "0x13881" }],
    })
  } catch (e) {
    console.log(e)
  }

  if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({
      method: 'wallet_requestPermissions',
      params: [{ eth_accounts: {} }],
    })
    const accounts = await web3.eth.getAccounts()

    if (accounts.length > 0) {
      console.log('Connected to Metamask')
      toast('Connected to Metamask', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 2000,
        icon: <CheckCircledIcon />
      })
      web3.setProvider(alchemyUrl)
      setAccount(accounts)
      setWeb3(web3)
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      setContract(contract)
      web3.eth.defaultAccount = accounts[0]
    }
    else {
      console.log('Metamask is  not connected')
      toast('Please Connect to Metamask', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 2000,
        icon: <CheckCircledIcon />
      })
    }
  }
  else {
    console.log('Metamask is not installed')
    toast('Please install Metamask', {
      className: 'font-mono text-lg h-[4rem]',
      duration: 2000,
      icon: <CheckCircledIcon />
    })
  }
}

export const handleRegisterProduct = async () => {
  if (contract === null) {
    toast('Please Connect Your Wallet 👆👆', {
      className: 'font-mono text-lg h-[4rem]',
      duration: 2000,
      icon: <CheckCircledIcon />
    })
  }
  //ENSURE TO USE THE ENCODE ABI METHOD AFTER TRYING TO INITIALIZE THE CONTRACT
  const data = await contract.methods.register(productCode, productName, rawMaterials).encodeABI()
  const params = [{
    from: account[0],
    to: contractAddress,
    data: data
  }]
  let result = await window.ethereum.request({ method: 'eth_sendTransaction', params })
    .then((hash) => {
      console.log('Transaction Completed: ' + hash)
      setTxHash(hash)
    }).catch(error => {
      console.log(error)
    })
  const transactionReceipt = await web3.eth.getTransactionReceipt(txHash)
  const status = parseInt(transactionReceipt.status)
  if (status === 1) {
    toast('Product Registered Successfully', {
      className: 'font-mono text-lg h-[4rem]',
      duration: 2000,
      icon: <CheckCircledIcon />
    })
  }
  else {
    toast('Product Registration Failed', {
      className: 'font-mono text-lg h-[4rem]',
      duration: 2000,
      icon: <CheckCircledIcon />
    })
  }
  setProductCode('')
  setProductName('')
  setRawMaterials('')
}


export const fetchProducts = async () => {
  try {
    const productDataArray = await contract.methods.getAllProductData().call();
    setProducts(productDataArray)
    // console.log(productName,productCode,rawMaterials,bacAddress)
  } catch (error) {
    console.error('Error fetching product data array:', error);
    return [];
  }

}
