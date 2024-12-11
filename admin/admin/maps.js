// Global variables for map and route control
let map;
let routeControl;
const mapboxToken = 'sk.eyJ1IjoiZWR3NHJkIiwiYSI6ImNtMzh3OTNsejB2dXIyaXF4YXkzMHd0Z3QifQ.j3290SbXBU9KPe1C19mZlQ';


// Function to find location and initialize map
function findLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initMap, handleError);
  } else {
    document.getElementById("map").innerText = "Geolocation is not supported by your browser.";
  }
}

// Function to initialize the map with user's position
function initMap(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  // Initialize the map centered on user's location
  map = L.map('map').setView([lat, lon], 13);

  // Set up the tile layer for the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Add a marker for the user's location
  L.marker([lat, lon]).addTo(map)
    .bindPopup("You are here")
    .openPopup();

  // Define project locations
  const projects = [
    { name: "Sustainable Crop Farming", lat: 14.676208, lon: 121.043861 }, // Quezon City
    { name: "Organic Vegetables", lat: 14.599512, lon: 120.984222 },      // Manila
    { name: "Eco-friendly Poultry Farming", lat: 14.554729, lon: 121.024445 }, // Makati
    { name: "Aquaponics Cultivation Land", lat: 14.609053, lon: 121.022256 }, // Mandaluyong
    { name: "Solar-Powered Greenhouse Land", lat: 14.535050, lon: 121.036410 }, // Taguig
    { name: "Vertical Crop Farming Land", lat: 14.676041, lon: 121.043700 }, // Quezon City
    { name: "Organic Herb Garden Land", lat: 14.651047, lon: 121.049900 }, // Quezon City
    { name: "Community Compost Land", lat: 14.599512, lon: 120.984222 }   // Manila
  ];

  // Add markers for each project
  projects.forEach(project => {
    const marker = L.marker([project.lat, project.lon]).addTo(map)
      .bindPopup(project.name);

    // Add click event listener to each marker to show route
    marker.on('click', function() {
      const locateBtn = document.getElementById("locate-btn");
      locateBtn.textContent = "Directions";

      // Set button functionality to show route on map
      locateBtn.onclick = function() {
        showRoute([lat, lon], [project.lat, project.lon]);
      };
    });
  });
}

// Function to display the route from user's location to the selected project
function showRoute(userLocation, projectLocation) {
  // Remove the previous route, if any
  if (routeControl) {
    map.removeControl(routeControl);
  }

  // Initialize the route control with Mapbox as the backend
  routeControl = L.Routing.control({
    waypoints: [
      L.latLng(userLocation[0], userLocation[1]),
      L.latLng(projectLocation[0], projectLocation[1])
    ],
    router: L.Routing.mapbox(mapboxToken), // Use Mapbox as the routing backend
    routeWhileDragging: true,
    show: true,
    lineOptions: { // Customize line options for route highlighting
      styles: [{ color: '#007bff', opacity: 0.8, weight: 6 }]
    },
    createMarker: function() { return null; } // Optional: Don't add extra markers
  }).addTo(map);
}

// Handle errors for geolocation
function handleError(error) {
  let errorMsg = "";
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorMsg = "Location access denied by the user.";
      break;
    case error.POSITION_UNAVAILABLE:
      errorMsg = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      errorMsg = "The request to get your location timed out.";
      break;
    default:
      errorMsg = "An unknown error occurred.";
      break;
  }
  document.getElementById("map").innerText = errorMsg;
}

function selectWarehouse() {
  const dropdown = document.getElementById('warehouse-dropdown');
  const selectedValue = dropdown.value;

  if (selectedValue) {
      const [lat, lon] = selectedValue.split(',').map(Number);

      // Center the map on the selected warehouse
      map.setView([lat, lon], 13);

      // Add a marker for the selected warehouse
      const warehouseMarker = L.marker([lat, lon]).addTo(map)
          .bindPopup(`Warehouse Location: ${dropdown.options[dropdown.selectedIndex].text}`)
          .openPopup();
  }
}

