import React from 'react'
import { formatDate } from '../../services/formatDate'
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, } from '../../../components/ui/table'
const DisplayTransactionData = ({data}) => {

  const transactionTable = data?.map((tx,i)=>{
    return (
      <TableRow key={i}>
        <TableCell>{i + 1}</TableCell>
        <TableCell>{tx?.currentTr}</TableCell>
        <TableCell>{tx?.previousTr.substring(0,23)} </TableCell>
        <TableCell>{tx?.sender}</TableCell>
        <TableCell>{tx?.receiver}</TableCell>
        <TableCell>{tx?.rawMaterials}</TableCell>
        <TableCell>
          <p className='text-sm'>{formatDate(tx?.timestamp.toString())}</p>
        </TableCell>
      </TableRow>
    )
  })
  return (
    <div className='w-full h-[15rem] font-jakarta overflow-y-scroll '>
    <Table className='w-full'>
      <TableCaption className='text-lg'>Registered transactions and Materials</TableCaption>
      <TableHeader className='w-full'>
        <TableRow>
          <TableHead>     S/N</TableHead>
          <TableHead>   TX Hash</TableHead>
          <TableHead>  Previous TX</TableHead>
          <TableHead> Sender</TableHead>
          <TableHead>    Receiver</TableHead> 
          <TableHead className='flex  items-center justify-center'> TimeStamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
     {transactionTable === undefined || data.length === 0 ? <div> No transactions Registered </div>: transactionTable}
      </TableBody>
    </Table>
  </div>
  )
}

export default DisplayTransactionData
