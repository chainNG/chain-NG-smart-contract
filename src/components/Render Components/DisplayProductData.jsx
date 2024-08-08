import React from 'react'
import useProductStore from '../../services/store/useProductStore'

import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, } from '../../../components/ui/table'
import { formatDate } from '../../services/formatDate'
const DisplayProductData = () => {
  const { products,transactionStats } = useProductStore()
  const productTable= products.map((product,i)=>{
    
    return (
      <TableRow key={i}>
        <TableCell>{i+1}</TableCell>
        <TableCell>{product.productName}</TableCell>
        <TableCell>{product.productCode.toString()}</TableCell>
        <TableCell>{product.rawMaterials}</TableCell>
        <TableCell>{product.owner}</TableCell>
        <TableCell>{product.bacAddress}</TableCell>
        <TableCell>{formatDate(product.registrationTime.toString())}</TableCell>
      </TableRow>
    )
   })
  return (
    <div className='w-full h-[15rem] font-jakarta overflow-y-scroll '>
      <Table >
        <TableCaption className='text-lg'>Registered Products and Materials</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>     S/N</TableHead>
            <TableHead>   Name</TableHead>
            <TableHead>  Product Code</TableHead>
            <TableHead> Materials</TableHead>
            <TableHead>    Owner</TableHead>
            <TableHead>    BAC Address</TableHead>
            <TableHead>    TimeStamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
       {products === undefined || products.length === 0 ? <div> No Products Registered </div>: productTable}
        </TableBody>
      </Table>
    </div>
  )
}

export default DisplayProductData
