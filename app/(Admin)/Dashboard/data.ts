// Sample seeded data for the dashboard
export const stats = [
  { title: 'Total Agents', value: '128', change: '12.5%' },
  { title: 'Total Dealers', value: '532', change: '15.3%' },
  { title: 'Total Customers', value: '12,842', change: '18.7%' },
  { title: 'Active Contracts', value: '8,765', change: '11.8%' },
  { title: 'Total Claims', value: '1,245', change: '-4.6%' },
];

export const recentClaims = [
  { id: 'CLM-2024-1256', name: 'Ahmad Raza', amount: 'PKR 156,000', status: 'Pending', time: '10 min ago' },
  { id: 'CLM-2024-1255', name: 'Sara Khan', amount: 'PKR 85,200', status: 'In Review', time: '1 hour ago' },
  { id: 'CLM-2024-1254', name: 'Bilal Ahmed', amount: 'PKR 42,500', status: 'Approved', time: '3 hours ago' },
  { id: 'CLM-2024-1253', name: 'Imran Aslam', amount: 'PKR 115,000', status: 'Rejected', time: '5 hours ago' },
  { id: 'CLM-2024-1252', name: 'Fatima Noor', amount: 'PKR 62,300', status: 'Pending', time: '6 hours ago' },
];

export const topAgents = [
  { name: 'Ali Hassan', dealers: 45, contracts: 732, premium: '5.25M' },
  { name: 'Usman Tariq', dealers: 38, contracts: 615, premium: '4.18M' },
  { name: 'Nadeem Iqbal', dealers: 32, contracts: 512, premium: '3.65M' },
  { name: 'Sanaullah Khan', dealers: 28, contracts: 478, premium: '3.22M' },
  { name: 'Faisal Ahmed', dealers: 26, contracts: 445, premium: '2.98M' },
];
