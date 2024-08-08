import { create } from "zustand";


const useTransactionRegistrationStore = create((set => ({
    targetAddress: null,
    reciever: null,
    batchCode: null,
    status: null,
    totalTransactions: null,
    txHash: null,
    previousTXHash: null,
    filteredTransactions: null,
    invalidAddress: '0x0000000000000000000000000000000000000000',
    setTargetAddress: (value) => set({ targetAddress: value }),
    setReciever: (value) => set({ reciever: value }),
    setBatchCode: (value) => set({ batchCode: value }),
    setStatus: (value) => set({ status: value }),
    setTotalTransactions: (value) => set({ totalTransactions: value }),
    setTxHash: (value) => set({ txHash: value }),
    setPrevTxHash: (value) => set({ prevTXHash: value }),
    setFilteredTransactions: (value) => set({ filteredTransactions: value }),
})));

export default useTransactionRegistrationStore