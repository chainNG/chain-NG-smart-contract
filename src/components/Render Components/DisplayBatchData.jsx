import React from 'react'
import { formatDate } from '../../services/formatDate'
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, } from '../../../components/ui/table'
const DisplayBatchData = ({ data }) => {
  // console.log(typeof Number(data[0].timestamp.toString()))
  // const sortedData = data.sort((a, b) => parseInt(Number(a.timestamp.toString()) - Number(b.timestamp.toString())))
  // console.log(data)
  // console.log(sortedData)
  const batchDataTable = data?.map((data, i) => {
    return (
      <TableRow key={i}>
        <TableCell>{i + 1}</TableCell>
        <TableCell>{data?.batchCode.toString()}</TableCell>
        <TableCell>{data?.batchAmount.toString()}</TableCell>
        <TableCell>{data?.batchManager}</TableCell>
        <TableCell>{data?.rawMaterials}</TableCell>
        <TableCell>{data?.tucAddress}</TableCell>
        <TableCell>
          <p className='text-sm'>{formatDate(data?.timestamp.toString())}</p>
        </TableCell>
      </TableRow>
    )
  })
  return (
    <div className='w-full h-[15rem] font-jakarta overflow-y-scroll overflow-x-scroll '>
      <Table >
        <TableCaption className='text-lg'>Registered Batches</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>     S/N</TableHead>
            <TableHead>   Batch Code</TableHead>
            <TableHead>  Batch Amount</TableHead>
            <TableHead> Manager</TableHead>
            <TableHead>    Raw Materials</TableHead>
            <TableHead>    TUC Address</TableHead>
            <TableHead>    TimeStamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data === undefined || data?.length === 0 ? <div> No Batches Registered </div> : batchDataTable}
        </TableBody>
      </Table>
    </div>
  )
}

export default DisplayBatchData
