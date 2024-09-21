import React from 'react';
import { formatDate } from '../../services/formatDate';
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from '../../../components/ui/table';

const DisplayBatchData = ({ data }) => {
  const batchDataTable = data?.map((batch, i) => {
    return (
      <TableRow key={i}>
        <TableCell>{i + 1}</TableCell>
        <TableCell>{batch.batch_code}</TableCell>
        <TableCell>{batch.batch_amount}</TableCell>
        <TableCell>{batch.manager_role}</TableCell>
        <TableCell>{batch.raw_materials}</TableCell>
        <TableCell>{batch.tuc_address}</TableCell>
        <TableCell>
          <p className='text-sm'>{formatDate(batch.timestamp)}</p>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div className='w-full h-[15rem] font-jakarta overflow-y-scroll overflow-x-scroll'>
      <Table>
        <TableCaption className='text-lg'>Registered Batches</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>Batch Code</TableHead>
            <TableHead>Batch Amount</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead>Raw Materials</TableHead>
            <TableHead>TUC Address</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7}>No Batches Registered</TableCell>
            </TableRow>
          ) : (
            batchDataTable
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DisplayBatchData;
