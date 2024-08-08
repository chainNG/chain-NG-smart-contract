import React from 'react'
import useProductStore from '../services/store/useProductStore'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie } from 'recharts'
const Analytics = () => {
  const { transactionStats } = useProductStore()
  const data = [
    {
      "attemptsMade": 5,
      "duration": 12,
      "gasUsed": 6981674
    },
    {
      "attemptsMade": 10,
      "duration": 20,
      "gasUsed": 6981746
    },
    {
      "attemptsMade": 15,
      "duration": 22,
      "gasUsed": 6981602
    },
    {
      "attemptsMade": 20,
      "duration": 14,
      "gasUsed": 6981626
    },
    {
      "attemptsMade": 25,
      "duration": 24,
      "gasUsed": 6981650
    },
    {
      "attemptsMade": 30,
      "duration": 16,
      "gasUsed": 6981578
    }
  ]


  const data2 = [
    {
      "attemptsMade": 5,
      "duration": 1.2,
      "gasUsed": 6281674
    },
    {
      "attemptsMade": 10,
      "duration": 2.3,
      "gasUsed": 6423746
    },
    {
      "attemptsMade": 15,
      "duration": 3.9,
      "gasUsed": 6653602
    },
    {
      "attemptsMade": 20,
      "duration": 5.7,
      "gasUsed": 6786521
    },
    {
      "attemptsMade": 25,
      "duration": 9.82,
      "gasUsed": 6981650
    },
    {
      "attemptsMade": 30,
      "duration": 11.23,
      "gasUsed": 7291021
    },

    {
      "attemptsMade": 35,
      "duration": 14.23,
      "gasUsed": 7456717
    }
  ]
  console.log(transactionStats)

  return (
    <div className='flex justify-around gap-12'>
      <BarChart width={730} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="gasUsed" />
        <YAxis dataKey='attemptsMade' />
        <Tooltip />
        <Legend />
        <Bar dataKey="duration" fill="#8884d8" />
        <Bar dataKey="gasUsed" fill="#82ca9d" />
      </BarChart>

      <BarChart width={930} height={500} data={data2}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="duration" />
        <YAxis dataKey='attemptsMade' />
        <Tooltip />
        <Legend />
        <Bar dataKey="duration" fill="#8884d8" />
        <Bar dataKey="gasUsed" fill="#82ca9d" />
      </BarChart>

    </div>
  )
}

export default Analytics
