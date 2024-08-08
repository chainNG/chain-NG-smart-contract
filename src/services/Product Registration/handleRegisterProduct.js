import useProductStore from '../store/useProductStore'
import {web3} from 'web3'
import { toast } from 'sonner'
import { ArrowUpIcon, CheckCircledIcon } from '@radix-ui/react-icons'
import useContractStore from '../store/useContractStore'


const { account, web3, contract} = useContractStore()
const { productName, productCode, rawMaterials, materialName, materialCode,setProducts, setProductCode, setProductName, setRawMaterials, setMaterialName, setMaterialCode } = useProductStore()
console.log(contract)
export const handleRegisterProduct = async () => {
  const accounts = await web3.eth.getAccounts()
  if (!contract) {
    toast('Please Connect your Wallet 👆', {
      className: 'font-mono text-lg h-[4rem]',
      duration: 1200,
      icon: <ArrowUpIcon />
    })
  }

  try {// Replace with your signing method

    // Call the register method on the contract
    const tx = await contract.methods.register(productCode, productName, rawMaterials, {
      from: accounts[0],
    })

    const toastMessage = 'Product registered successfully'
    toast(toastMessage, {
      className: 'font-mono text-lg h-[4rem]',
      duration: 2000,
      icon: <CheckCircledIcon />
    })

    console.log('Product registered successfully');
  } catch (error) {
    console.error('Error:', error);
    const toastMessage = 'Product registration failed: ' + error.message
    toast(toastMessage, {
      className: 'font-mono text-lg h-[4rem]',
      duration: 4000,
      icon: <CheckCircledIcon />
    })
  }
}


export const fetchProducts = async () => {
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


export const bulkRegister = async (address) => {
    
  for (const entry of products) {
    const {productCode,productName,rawMaterials} = entry
    console.log(productCode,productName,rawMaterials)
    const data = await contract.methods.register(productCode,productName,rawMaterials).encodeABI()
     
    
    // Call your Solidity function here
    const params = [{
      from: address,
      to: contractAddress,
      data: data
    }]
    console.log(address)
    
         console.log(params)

          let result = await window.ethereum.request({ method: 'eth_sendTransaction', params })
          .then((hash) => {
            console.log('Transaction Completed: ' + hash)
            setTxHash(hash)
          }).catch((error) => {
            console.log(error.message)
          })

    

    }
    

  }