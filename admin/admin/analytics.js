

document.addEventListener('DOMContentLoaded', () => {
    // Simulating data for account registrations
    const data = {
      newUsers: [120, 130, 140, 115, 110, 125, 140],
      buyers: [80, 90, 100, 85, 70, 95, 105],
      sellers: [45, 55, 60, 50, 45, 50, 60],
      investors: [35, 40, 45, 42, 40, 50, 55]
    };
  
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
    // Overall account stats (simulated)
    const totalUsers = data.newUsers.reduce((acc, curr) => acc + curr, 0);
    const totalBuyers = data.buyers.reduce((acc, curr) => acc + curr, 0);
    const totalSellers = data.sellers.reduce((acc, curr) => acc + curr, 0);
    const totalInvestors = data.investors.reduce((acc, curr) => acc + curr, 0);
  
    // Real-time Active Users (simulated)
    const activeWebsiteUsers = Math.floor(Math.random() * 100) + 50;  // Random number for simulation
    const activeAdmins = Math.floor(Math.random() * 10) + 1; // Random number for simulation
  
    // Update the UI with the stats
    document.getElementById('totalUsers').innerText = totalUsers;
    document.getElementById('activeWebsiteUsers').innerText = activeWebsiteUsers;
    document.getElementById('activeAdmins').innerText = activeAdmins;
  
    // Create the line graph
    const ctx = document.getElementById('userGraph').getContext('2d');
    
    new Chart(ctx, {
      type: 'line',  // Line graph type
      data: {
        labels: daysOfWeek, // Labels for each day of the week
        datasets: [{
          label: 'New Users',
          data: data.newUsers,
          borderColor: 'rgba(75, 192, 192, 1)', // Color of the line
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color of the line area
          fill: true, // To fill the area under the graph
          tension: 0.4 // Curvature of the line
        }, {
          label: 'Buyers',
          data: data.buyers,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
          tension: 0.4
        }, {
          label: 'Sellers',
          data: data.sellers,
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          fill: true,
          tension: 0.4
        }, {
          label: 'Investors',
          data: data.investors,
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Account Registrations Over the Week',
            font: {
              size: 18
            }
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw} accounts`;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: '',
              color: 'black'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Accounts',
              color: 'black'
            },
            beginAtZero: true,
            max: 160
          }
        }
      }
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    // Get references to category elements and table rows
    const buyersCategory = document.getElementById('buyers-category');
    const sellersCategory = document.getElementById('sellers-category');
    const investorsCategory = document.getElementById('investors-category');
    const tableRows = document.querySelectorAll('#record-list tr');

    // Function to filter table rows
    const filterTable = (accountType) => {
        tableRows.forEach(row => {
            const accountCell = row.querySelector('td:first-child'); // Account Type cell
            if (accountCell && accountCell.textContent.trim() === accountType) {
                row.style.display = ''; // Show row
            } else {
                row.style.display = 'none'; // Hide row
            }
        });
    };

    // Event listeners for category clicks
    buyersCategory.addEventListener('click', () => filterTable('Buyer'));
    sellersCategory.addEventListener('click', () => filterTable('Seller'));
    investorsCategory.addEventListener('click', () => filterTable('Investor'));
});

const categories = document.querySelectorAll('.account-categories .category');

categories.forEach(category => {
    category.addEventListener('click', () => {
        // Remove 'active' class from all categories
        categories.forEach(cat => cat.classList.remove('active'));
        // Add 'active' class to the clicked category
        category.classList.add('active');
    });
});
