import Web3 from 'web3';
import contractABI from '../ABIs/contractABI.json'; // Replace with your contract JSON
import products from '../store/products'

const web3 = new Web3(window.ethereum); // Use MetaMask provider

const contractAddress = '0xAE4c19FD941B07aBe0C7A15152b7152f4fF2aDDd'; // Replace with your contract address'
const alchemyUrl = 'https://polygon-mumbai.g.alchemy.com/v2/bE6pdrk27bZW93aL3QUr9v_93SCiINit'
const contractAbi = contractABI // Replace with your contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);
web3.setProvider(alchemyUrl)
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
