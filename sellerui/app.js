// Function to toggle between light and dark theme
function toggleTheme() {
    document.body.classList.toggle('dark-theme');

    // Save the theme in localStorage
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Check and apply the saved theme when the page loads
document.addEventListener("DOMContentLoaded", function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Event listener for the "Add Product" button, with a custom promo field
document.getElementById("addProductBtn").addEventListener("click", function () {
    const productName = prompt("Enter Product Name:");
    const category = prompt("Enter Product Category:");
    const stock = prompt("Enter Stock Quantity:");
    const price = prompt("Enter Product Price:");

    if (productName && category && stock && price) {
        const tableBody = document.getElementById("inventoryTableBody");

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td><input type="checkbox"></td> <!-- Checkbox Column -->
            <td>${productName}</td>
            <td>${category}</td>
            <td>${stock}</td>
            <td class="price-cell">$${price}</td> <!-- Price Cell with Editable Feature -->
            <td>
                <select onchange="handlePromoChange(this)">
                    <option value="">No Promo</option>
                    <option value="10%">10% Off</option>
                    <option value="20%">20% Off</option>
                    <option value="30%">30% Off</option>
                    <option value="custom">Custom</option>
                </select>
                <input type="text" class="custom-promo-input" placeholder="%" style="display: none;" 
                       onblur="saveCustomPromo(this)" oninput="validateCustomPromo(this)">
            </td>
            <td><button onclick="editPrice(this)" class="edit-btn">Edit Price</button></td> <!-- Edit Price Button -->
        `;

        tableBody.appendChild(newRow);
    } else {
        alert("Please enter all product details.");
    }
});

// Function to remove selected products
document.getElementById("removeProductBtn").addEventListener("click", function () {
    const tableBody = document.getElementById("inventoryTableBody");
    const checkboxes = tableBody.querySelectorAll("input[type='checkbox']");

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const row = checkbox.closest("tr");
            row.remove(); // Remove the entire row if the checkbox is checked
        }
    });
});

// Function to edit price in a specific row
function editPrice(button) {
    const priceCell = button.parentElement.previousElementSibling.previousElementSibling;

    // Check if there's already an input field for price
    if (!priceCell.querySelector("input")) {
        // Get the current price without the dollar sign
        const currentPrice = priceCell.textContent.replace('$', '');

        // Create an input field with the current price as the value
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = currentPrice;
        inputField.size = 6;

        // Replace the price cell content with the input field
        priceCell.innerHTML = '';
        priceCell.appendChild(inputField);

        // Focus on the input field for immediate editing
        inputField.focus();

        // Save new price when input field loses focus
        inputField.addEventListener("blur", function() {
            const newPrice = inputField.value;

            // Update the price cell with the new price or keep the old price if input is empty
            if (newPrice) {
                priceCell.textContent = `$${newPrice}`;
            } else {
                priceCell.textContent = `$${currentPrice}`;
            }
        });
    }
}

// Function to handle custom promo selection
function handlePromoChange(selectElement) {
    const customPromoInput = selectElement.nextElementSibling;

    // Show the custom input field if "Custom" is selected
    if (selectElement.value === "custom") {
        selectElement.style.display = "none";
        customPromoInput.style.display = "inline";
        customPromoInput.focus(); // Automatically focus on the input field
    } else {
        customPromoInput.style.display = "none";
        customPromoInput.value = ""; // Clear the input when not in use
    }
}

// Validate custom promo input while typing
function validateCustomPromo(inputElement) {
    const value = inputElement.value;
    const isValid = /^\d{1,3}$/.test(value) && parseInt(value) <= 100; // Ensure valid integer <= 100

    // Show validation feedback by coloring the border
    if (isValid || value === "") {
        inputElement.style.borderColor = ""; // Reset border color if valid
    } else {
        inputElement.style.borderColor = "red"; // Highlight invalid input
    }
}

// Save the custom promo value and revert to the dropdown when input loses focus
function saveCustomPromo(inputElement) {
    const customValue = inputElement.value;

    // Check if the custom value is valid
    if (customValue && /^\d{1,3}$/.test(customValue) && parseInt(customValue) <= 100) {
        const selectElement = inputElement.previousElementSibling;

        // Set the custom value as an option in the select
        const customOption = Array.from(selectElement.options).find(option => option.value === "custom");
        customOption.textContent = `${customValue}% Off`; // Display custom value
        customOption.value = `${customValue}%`;

        // Hide the input and show the select with the custom option selected
        inputElement.style.display = "none";
        selectElement.style.display = "inline";
        selectElement.value = `${customValue}%`;
    } else {
        // Reset if the input is invalid or empty
        inputElement.style.display = "none";
        const selectElement = inputElement.previousElementSibling;
        selectElement.style.display = "inline";
        selectElement.value = ""; // Reset to "No Promo" if invalid
        alert("Please enter a valid percentage between 1 and 100.");
    }
}

// Get references to elements
const dashboardSection = document.getElementById("dashboardSection");
const ordersSection = document.getElementById("ordersSection");
const inventorySection = document.querySelector(".inventory-section");
const mainHeader = document.getElementById("mainHeader");
const dashboardLink = document.getElementById("dashboardLink");
const ordersLink = document.getElementById("ordersLink");

// Function to switch views
function toggleView(view) {
  if (view === "dashboard") {
    dashboardSection.style.display = "grid";
    ordersSection.style.display = "none";
    inventorySection.style.display = "block";
    mainHeader.textContent = "Dashboard";

    dashboardLink.classList.add("active");
    ordersLink.classList.remove("active");
  } else if (view === "orders") {
    dashboardSection.style.display = "none";
    ordersSection.style.display = "block";
    inventorySection.style.display = "none";
    mainHeader.textContent = "Orders";

    ordersLink.classList.add("active");
    dashboardLink.classList.remove("active");
  }
}

// Event listeners to switch between views
dashboardLink.addEventListener("click", function (e) {
  e.preventDefault();
  toggleView("dashboard");
});

ordersLink.addEventListener("click", function (e) {
  e.preventDefault();
  toggleView("orders");
});

// Get references to elements
const historySection = document.getElementById("historySection");
const historyLink = document.getElementById("historyLink");

// Function to switch views
function toggleView(view) {
  if (view === "dashboard") {
    dashboardSection.style.display = "grid";
    ordersSection.style.display = "none";
    inventorySection.style.display = "block";
    historySection.style.display = "none";
    mainHeader.textContent = "Dashboard";

    dashboardLink.classList.add("active");
    ordersLink.classList.remove("active");
    historyLink.classList.remove("active");
  } else if (view === "orders") {
    dashboardSection.style.display = "none";
    ordersSection.style.display = "block";
    inventorySection.style.display = "none";
    historySection.style.display = "none";
    mainHeader.textContent = "Orders";

    ordersLink.classList.add("active");
    dashboardLink.classList.remove("active");
    historyLink.classList.remove("active");
  } else if (view === "history") {
    dashboardSection.style.display = "none";
    ordersSection.style.display = "none";
    inventorySection.style.display = "none";
    historySection.style.display = "block";
    mainHeader.textContent = "Order History";

    historyLink.classList.add("active");
    dashboardLink.classList.remove("active");
    ordersLink.classList.remove("active");
  }
}

// Event listeners to switch between views
dashboardLink.addEventListener("click", function (e) {
  e.preventDefault();
  toggleView("dashboard");
});

ordersLink.addEventListener("click", function (e) {
  e.preventDefault();
  toggleView("orders");
});

historyLink.addEventListener("click", function (e) {
  e.preventDefault();
  toggleView("history");
});

// Get references to elements
const notificationsSection = document.getElementById("notificationsSection");
const notificationsLink = document.getElementById("notificationsLink");

// Function to switch views
function toggleView(view) {
  if (view === "dashboard") {
    dashboardSection.style.display = "grid";
    ordersSection.style.display = "none";
    inventorySection.style.display = "block";
    historySection.style.display = "none";
    notificationsSection.style.display = "none";
    mainHeader.textContent = "Dashboard";

    dashboardLink.classList.add("active");
    ordersLink.classList.remove("active");
    historyLink.classList.remove("active");
    notificationsLink.classList.remove("active");
  } else if (view === "orders") {
    dashboardSection.style.display = "none";
    ordersSection.style.display = "block";
    inventorySection.style.display = "none";
    historySection.style.display = "none";
    notificationsSection.style.display = "none";
    mainHeader.textContent = "Orders";

    ordersLink.classList.add("active");
    dashboardLink.classList.remove("active");
    historyLink.classList.remove("active");
    notificationsLink.classList.remove("active");
  } else if (view === "history") {
    dashboardSection.style.display = "none";
    ordersSection.style.display = "none";
    inventorySection.style.display = "none";
    historySection.style.display = "block";
    notificationsSection.style.display = "none";
    mainHeader.textContent = "Order History";

    historyLink.classList.add("active");
    dashboardLink.classList.remove("active");
    ordersLink.classList.remove("active");
    notificationsLink.classList.remove("active");
  } else if (view === "notifications") {
    dashboardSection.style.display = "none";
    ordersSection.style.display = "none";
    inventorySection.style.display = "none";
    historySection.style.display = "none";
    notificationsSection.style.display = "block";
    mainHeader.textContent = "Notifications";

    notificationsLink.classList.add("active");
    dashboardLink.classList.remove("active");
    ordersLink.classList.remove("active");
    historyLink.classList.remove("active");
  }
}

// Event listeners to switch between views
dashboardLink.addEventListener("click", function (e) {
  e.preventDefault();
  toggleView("dashboard");
});

ordersLink.addEventListener("click", function (e) {
  e.preventDefault();
  toggleView("orders");
});

historyLink.addEventListener("click", function (e) {
  e.preventDefault();
  toggleView("history");
});

notificationsLink.addEventListener("click", function (e) {
  e.preventDefault();
  toggleView("notifications");
});

// Open Reply Modal
function openReplyModal(buyerName, message) {
    const replyModal = document.getElementById("replyModal");
    const buyerMessage = document.getElementById("buyerMessage");
    buyerMessage.textContent = `${buyerName}: "${message}"`;

    replyModal.style.display = "flex"; // Show the modal
}

// Close Reply Modal
function closeReplyModal() {
    const replyModal = document.getElementById("replyModal");
    replyModal.style.display = "none"; // Hide the modal
}

// Send Reply Function
function sendReply() {
    const replyText = document.getElementById("replyText").value;
    const attachment = document.getElementById("attachment").files[0];

    if (!replyText) {
        alert("Please enter a reply message.");
        return;
    }

    // Placeholder for sending the reply (e.g., via API)
    console.log("Reply Text:", replyText);
    if (attachment) {
        console.log("Attached File:", attachment.name);
    }

    alert("Reply sent successfully!");
    closeReplyModal(); // Close modal after sending
    document.getElementById("replyForm").reset(); // Clear form
}

// Close the modal if clicking outside of it
window.onclick = function(event) {
    const replyModal = document.getElementById("replyModal");
    if (event.target === replyModal) {
        closeReplyModal();
    }
}

// Get references to elements
const reportsSection = document.getElementById("reportsSection");
const reportsLink = document.createElement("a");
reportsLink.id = "reportsLink";
reportsLink.href = "#";
reportsLink.textContent = "Reports";
reportsLink.addEventListener("click", function (e) {
    e.preventDefault();
    toggleView("reports");
});
document.querySelector(".sidebar nav").appendChild(reportsLink);

// Update toggleView function to handle reports section
function toggleView(view) {
  if (view === "dashboard") {
    dashboardSection.style.display = "grid";
    ordersSection.style.display = "none";
    inventorySection.style.display = "block";
    historySection.style.display = "none";
    notificationsSection.style.display = "none";
    reportsSection.style.display = "none";
    mainHeader.textContent = "Dashboard";

    dashboardLink.classList.add("active");
    ordersLink.classList.remove("active");
    historyLink.classList.remove("active");
    notificationsLink.classList.remove("active");
    reportsLink.classList.remove("active");
  } else if (view === "orders") {
    dashboardSection.style.display = "none";
    ordersSection.style.display = "block";
    inventorySection.style.display = "none";
    historySection.style.display = "none";
    notificationsSection.style.display = "none";
    reportsSection.style.display = "none";
    mainHeader.textContent = "Orders";

    ordersLink.classList.add("active");
    dashboardLink.classList.remove("active");
    historyLink.classList.remove("active");
    notificationsLink.classList.remove("active");
    reportsLink.classList.remove("active");
  } else if (view === "history") {
    dashboardSection.style.display = "none";
    ordersSection.style.display = "none";
    inventorySection.style.display = "none";
    historySection.style.display = "block";
    notificationsSection.style.display = "none";
    reportsSection.style.display = "none";
    mainHeader.textContent = "Order History";

    historyLink.classList.add("active");
    dashboardLink.classList.remove("active");
    ordersLink.classList.remove("active");
    notificationsLink.classList.remove("active");
    reportsLink.classList.remove("active");
  } else if (view === "notifications") {
    dashboardSection.style.display = "none";
    ordersSection.style.display = "none";
    inventorySection.style.display = "none";
    historySection.style.display = "none";
    notificationsSection.style.display = "block";
    reportsSection.style.display = "none";
    mainHeader.textContent = "Notifications";

    notificationsLink.classList.add("active");
    dashboardLink.classList.remove("active");
    ordersLink.classList.remove("active");
    historyLink.classList.remove("active");
    reportsLink.classList.remove("active");
  } else if (view === "reports") {
    dashboardSection.style.display = "none";
    ordersSection.style.display = "none";
    inventorySection.style.display = "none";
    historySection.style.display = "none";
    notificationsSection.style.display = "none";
    reportsSection.style.display = "block";
    mainHeader.textContent = "Reports";

    reportsLink.classList.add("active");
    dashboardLink.classList.remove("active");
    ordersLink.classList.remove("active");
    historyLink.classList.remove("active");
    notificationsLink.classList.remove("active");
  }
}

// Initialize event listeners for the new "Reports" link
reportsLink.addEventListener("click", function (e) {
  e.preventDefault();
  toggleView("reports");
});


 // Ensure all charts initialize after DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Monthly Sales Chart - Initialize context and chart
    const monthlySalesCtx = document.getElementById('monthlySalesChart').getContext('2d');
    const monthlySalesChart = new Chart(monthlySalesCtx, {
        type: 'line',
        data: {  
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: 'Sales ($)',
                data: [1200, 1900, 3000, 5000, 2500, 4200, 6000, 7500, 8200, 9500, 10300, 12000],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Top Selling Products Chart - Initialize context and chart
    const topSellingProductsCtx = document.getElementById('topSellingProductsChart').getContext('2d');
    const topSellingProductsChart = new Chart(topSellingProductsCtx, {
        type: 'bar',
        data: {
            labels: ["Seeds", "Fertilizer", "Tools", "Irrigation Kit", "Pesticides"],
            datasets: [{
                label: 'Units Sold',
                data: [300, 500, 200, 150, 100],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Customer Reviews Chart - Initialize context and chart
    const customerReviewsCtx = document.getElementById('customerReviewsChart').getContext('2d');
    const customerReviewsChart = new Chart(customerReviewsCtx, {
        type: 'pie',
        data: {
            labels: ["Positive", "Neutral", "Negative"],
            datasets: [{
                label: 'Customer Reviews',
                data: [65, 25, 10],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});


    // Customer Reviews Chart
    const customerReviewsCtx = document.getElementById('customerReviewsChart').getContext('2d');
    const customerReviewsChart = new Chart(customerReviewsCtx, {
        type: 'pie',
        data: {
            labels: ["Positive", "Neutral", "Negative"],
            datasets: [{
                label: 'Customer Reviews',
                data: [65, 25, 10],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });


