import {create} from 'zustand'


const useBatchRegistrationStore = create((set)=>({
batchCode:'',
batchCount:'',
rawMaterialsUsed:'',
setBatchCode: (value) => set [{batchCode: value}],
setBatchCount: (value) => set [{batchCount: value}],
setRawMaterialsUsed: (value) => set [{rawMaterialsUsed: value}]
}))

export default useBatchRegistrationStore