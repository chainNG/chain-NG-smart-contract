import {create} from 'zustand';

const useContractStore = create((set) => ({
  web3:null,
  owner:null,
  account: null, // Ethereum account
  contract: null, // Contract instance
  bacContract: null, //
  setWeb3:(web3)=>set({web3}), 
  setOwner:(owner)=>set({owner}),
  setAccount: (account) => set({ account }),
  setContract: (contract) => set({ contract }),
  setBACContract: (bacContract) => set({ bacContract }),
}));

export default useContractStore;