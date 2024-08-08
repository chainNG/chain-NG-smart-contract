import  useContractStore  from '../store/useContractStore'

const { contract } = useContractStore
async function fetchProducts() {
    console.log(contract)
    try {
        const productDataArray = await contract.methods.owner().call()
       console.log(productDataArray)
    } catch (error) {
        console.error('Error fetching product data array:', error);
        return [];
    }
}

export default fetchProducts