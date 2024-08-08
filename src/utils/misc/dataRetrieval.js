import * as XLSX from 'xlsx'
import { convertBigIntToString } from './calculations';
export const arrayToSheet = (array) => {
    const ws = XLSX.utils.json_to_sheet(array);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Performance Metrics')
    return wb
}



export const handleDownload = (transactionStats) => {

    const data = transactionStats.map(convertBigIntToString)
    const workbook = arrayToSheet(data)
    XLSX.writeFile(workbook, 'Performance-Metrics.xlsx')
}
