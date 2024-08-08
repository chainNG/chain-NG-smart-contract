

import { Web3 } from 'web3'
import contractABI from '../services/ABIs/contractABI.json'


const { account, web3, contract, setContract, setAccount, setWeb3 } = useContractStore()


export const connectWallet = async () => {
    const contractAddress = '0x557337b04e00A03d4abB1AaEae5aF91cAb4B833B'; // Replace with your contract address'
    const alchemyUrl = 'https://polygon-mumbai.g.alchemy.com/v2/bE6pdrk27bZW93aL3QUr9v_93SCiINit'
    const contractAbi = contractABI
  

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
          duration: 4000,
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