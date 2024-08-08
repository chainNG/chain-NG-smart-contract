import { create } from 'zustand';

const useProductStore = create((set) => ({
  productCode: '',
  productName: '',
  rawMaterials: '',
  materialName: '',
  materialCode: '',
  products: [],
  transactions: [],
  batchAddresses: [],
  batches:[],
  transactionStats:[],
  setProductCode: (value) => set({ productCode: value }),
  setProductName: (value) => set({ productName: value }),
  setRawMaterials: (value) => set({ rawMaterials: value }),
  setMaterialName: (value) => set({ materialName: value }),
  setMaterialCode: (value) => set({ materialCode: value }),
  setProducts: (value) => set({ products: value }),
  setBatchAddresses: (value) => set({ batchAddresses: value }),
  setTransactions: (value) => set({ transactions: value }),
  setBatches: (value) => set({ batches: value }),
  setTransactionStats: (value) => set({transactionStats:value}),
}));
export default useProductStore;