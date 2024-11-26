// Sample Data with Account ID and Name
const userData = {
    buyers: 150,
    sellers: 75,
    investors: 30,
    accounts: [
        { id: 'B001', name: 'Alice', type: 'Buyer', orders: 320, spending: '$12,500', earnings: '-', investment: '-' },
        { id: 'S002', name: 'Bob', type: 'Seller', orders: 250, spending: '-', earnings: '$18,000', investment: '-' },
        { id: 'I003', name: 'Charlie', type: 'Investor', orders: 130, spending: '-', earnings: '$35,000', investment: '$45,000' },
        { id: 'B004', name: 'Diana', type: 'Buyer', orders: 140, spending: '$5,600', earnings: '-', investment: '-' },
        { id: 'S005', name: 'Ethan', type: 'Seller', orders: 300, spending: '-', earnings: '$22,000', investment: '-' },
        { id: 'I006', name: 'Fiona', type: 'Investor', orders: 75, spending: '-', earnings: '-', investment: '$50,000' },
        { id: 'B007', name: 'George', type: 'Buyer', orders: 90, spending: '$3,800', earnings: '-', investment: '-' },
        { id: 'S008', name: 'Hannah', type: 'Seller', orders: 210, spending: '-', earnings: '$15,700', investment: '-' },
        { id: 'I009', name: 'Isaac', type: 'Investor', orders: 65, spending: '-', earnings: '-', investment: '$42,000' },
        { id: 'B010', name: 'Jenny', type: 'Buyer', orders: 200, spending: '$8,200', earnings: '-', investment: '-' },
        { id: 'S011', name: 'Kevin', type: 'Seller', orders: 290, spending: '-', earnings: '$30,000', investment: '-' },
        { id: 'I012', name: 'Laura', type: 'Investor', orders: 120, spending: '-', earnings: '-', investment: '$55,000' },
        { id: 'B013', name: 'Michael', type: 'Buyer', orders: 180, spending: '$7,200', earnings: '-', investment: '-' },
        { id: 'S014', name: 'Natalie', type: 'Seller', orders: 320, spending: '-', earnings: '$40,000', investment: '-' },
        { id: 'I015', name: 'Oliver', type: 'Investor', orders: 100, spending: '-', earnings: '-', investment: '$60,000' },
        { id: 'B016', name: 'Paula', type: 'Buyer', orders: 150, spending: '$6,000', earnings: '-', investment: '-' },
        { id: 'S017', name: 'Quinn', type: 'Seller', orders: 270, spending: '-', earnings: '$25,500', investment: '-' },
        { id: 'I018', name: 'Rebecca', type: 'Investor', orders: 50, spending: '-', earnings: '-', investment: '$35,000' },
        { id: 'B019', name: 'Samuel', type: 'Buyer', orders: 130, spending: '$5,000', earnings: '-', investment: '-' },
        { id: 'S020', name: 'Tina', type: 'Seller', orders: 220, spending: '-', earnings: '$19,000', investment: '-' },
        { id: 'I021', name: 'Uma', type: 'Investor', orders: 90, spending: '-', earnings: '-', investment: '$47,000' },
        { id: 'B022', name: 'Victor', type: 'Buyer', orders: 170, spending: '$6,700', earnings: '-', investment: '-' },
        { id: 'S023', name: 'Wendy', type: 'Seller', orders: 310, spending: '-', earnings: '$37,000', investment: '-' },
        { id: 'I024', name: 'Xavier', type: 'Investor', orders: 110, spending: '-', earnings: '-', investment: '$52,000' },
        { id: 'B025', name: 'Yasmine', type: 'Buyer', orders: 190, spending: '$7,500', earnings: '-', investment: '-' },
        { id: 'S026', name: 'Zack', type: 'Seller', orders: 240, spending: '-', earnings: '$28,000', investment: '-' },
        { id: 'B027', name: 'Aaron', type: 'Buyer', orders: 160, spending: '$6,300', earnings: '-', investment: '-' },
        { id: 'S028', name: 'Bella', type: 'Seller', orders: 230, spending: '-', earnings: '$20,000', investment: '-' },
        { id: 'I029', name: 'Chloe', type: 'Investor', orders: 70, spending: '-', earnings: '-', investment: '$40,000' },
        { id: 'B030', name: 'David', type: 'Buyer', orders: 210, spending: '$8,800', earnings: '-', investment: '-' },
      ]
    };
  
  // Update UI with Data
  document.getElementById('buyerCount').innerText = userData.buyers;
  document.getElementById('sellerCount').innerText = userData.sellers;
  document.getElementById('investorCount').innerText = userData.investors;
  
  const accountTable = document.getElementById('accountTable');
  function populateTable(data) {
    accountTable.innerHTML = ''; // Clear table
    data.forEach(account => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${account.id}</td>
        <td>${account.name}</td>
        <td>${account.type}</td>
        <td>${account.orders}</td>
        <td>${account.spending}</td>
        <td>${account.earnings}</td>
        <td>${account.investment}</td>
      `;
      accountTable.appendChild(row);
    });
  }
  
  // Populate the table initially
  populateTable(userData.accounts);
  
  // Search Functionality
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredAccounts = userData.accounts.filter(account =>
      account.id.toLowerCase().includes(query) ||
      account.name.toLowerCase().includes(query) ||
      account.type.toLowerCase().includes(query)
    );
    populateTable(filteredAccounts); // Repopulate table with filtered data
  });
  
  // Chart.js Configuration
 // Chart.js Configuration with neutral colors
 const ctx = document.getElementById('userChart').getContext('2d');
 new Chart(ctx, {
     type: 'bar',
     data: {
         labels: ['Buyers', 'Sellers', 'Investors'],
         datasets: [{
             label: 'Registered Users',
             data: [userData.buyers, userData.sellers, userData.investors],
             backgroundColor: '#6c757d', // Cool gray for bars
         }]
     },
     options: {
         responsive: true,
         maintainAspectRatio: false,
         layout: {
             padding: {
                 left: 20,
                 right: 20,
                 top: 10,
                 bottom: 10
             }
         },
         plugins: {
             legend: { display: false },
         },
         scales: {
             y: { 
                 beginAtZero: true,
                 grid: {
                     color: '#ddd' // Light gray grid lines
                 },
                 ticks: {
                     color: '#333' // Neutral ticks color
                 }
             },
             x: {
                 grid: {
                     color: '#ddd' // Light gray grid lines
                 },
                 ticks: {
                     color: '#333' // Neutral ticks color
                 }
             }
         }
     }
 });
 
 
