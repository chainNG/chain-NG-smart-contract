import { getDaySuffix } from "./getDaySuffix";
export function formatDate(timestamp) {
    const date = new Date(timestamp * 1000); // Convert to JavaScript Date object
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2); // Ensure two-digit minutes
    const suffix = getDaySuffix(day); // Get the suffix for the day (e.g., 'th', 'st', 'nd')

    const formattedDate = `${day}${suffix} ${month} ${year}, ${hours !== 12 ? hours % 12 : 12}:${minutes}${hours >= 12 ? 'pm' : 'am'}`;
    return formattedDate
}