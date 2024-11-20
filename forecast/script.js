// script.js
const ctx = document.getElementById('temperatureChart').getContext('2d');

const data = {
  labels: ['10 PM', '4 AM', '7 AM', '10 AM', '4 PM', '7 PM'], // Time of day
  datasets: [{
    label: 'Temperature (°C)',
    data: [27.5, 27.9, 29, 27, 30, 29], // Example temperature data
    borderColor: '#ff8c00',
    backgroundColor: 'rgba(255, 140, 0, 0.2)',
    fill: true,
    tension: 0.4,
  }]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: false,
      grid: {
        display: true
      }
    }
  }
};

new Chart(ctx, {
  type: 'line',
  data: data,
  options: options
});
