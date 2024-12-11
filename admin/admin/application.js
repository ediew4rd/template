
function toggleDropdown(event) {
    event.preventDefault(); // Prevent default link behavior
    const dropdownMenu = event.target.closest('.dropdown').querySelector('.dropdown-menu');
    
    // Toggle the hidden/active class
    dropdownMenu.classList.toggle('hidden');
    dropdownMenu.classList.toggle('active');
}

function toggleDropdown(event) {
    event.preventDefault(); // Prevent default link behavior
    const dropdownMenu = event.target.closest('.dropdown').querySelector('.dropdown-menu');

    // Toggle the active class
    dropdownMenu.classList.toggle('active');

    // Ensure smooth transition effect
    if (dropdownMenu.classList.contains('active')) {
        dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px"; // Expand to content height
    } else {
        dropdownMenu.style.maxHeight = "0"; // Collapse
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const viewButtons = document.querySelectorAll(".btn.view");
    const modal = document.getElementById("documentModal");
    const closeModal = document.getElementById("closeModal");

    // Show the modal when a view button is clicked
    viewButtons.forEach(button => {
        button.addEventListener("click", function () {
            modal.classList.remove("hidden"); // Remove the 'hidden' class
            modal.style.display = "block"; // Ensure display is set to 'block'
        });
    });

    // Hide the modal when the close button is clicked
    closeModal.addEventListener("click", function () {
        modal.classList.add("hidden"); // Add the 'hidden' class
        modal.style.display = "none"; // Set display back to 'none'
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.add("hidden"); // Add the 'hidden' class
            modal.style.display = "none"; // Set display back to 'none'
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".filters input");
    const categorySelect = document.querySelector(".filters select");
    const approveAllButton = document.querySelector(".approve-all");
    const rejectAllButton = document.querySelector(".reject-all");
    const tableRows = document.querySelectorAll("tbody tr");

    // Function to filter table rows
    function filterRows() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;

        tableRows.forEach((row) => {
            const applicantName = row.querySelector(".employee span").textContent.toLowerCase();
            const description = row.querySelector("td:nth-child(5)").textContent.toLowerCase();

            let matchesSearch = applicantName.includes(searchTerm);
            let matchesCategory = selectedCategory === "Category" || description.includes(selectedCategory.toLowerCase());

            if (matchesSearch && matchesCategory) {
                row.style.display = ""; // Show row
            } else {
                row.style.display = "none"; // Hide row
            }
        });
    }

    // Search input event
    searchInput.addEventListener("input", filterRows);

    // Category select event
    categorySelect.addEventListener("change", filterRows);

    // Approve All
    approveAllButton.addEventListener("click", () => {
        tableRows.forEach((row) => {
            if (row.style.display !== "none") {
                const approveButton = row.querySelector(".btn.approve");
                approveButton.click(); // Simulate approve button click
            }
        });
    });

    // Reject All
    rejectAllButton.addEventListener("click", () => {
        tableRows.forEach((row) => {
            if (row.style.display !== "none") {
                const rejectButton = row.querySelector(".btn.reject");
                rejectButton.click(); // Simulate reject button click
            }
        });
    });

    // Individual Approve/Reject functionality (optional enhancement)
    tableRows.forEach((row) => {
        const approveButton = row.querySelector(".btn.approve");
        const rejectButton = row.querySelector(".btn.reject");

        approveButton.addEventListener("click", () => {
            row.style.backgroundColor = "#d4edda"; // Light green background for approval
            row.querySelector(".btn.approve").textContent = "Approved";
        });

        rejectButton.addEventListener("click", () => {
            row.style.backgroundColor = "#f8d7da"; // Light red background for rejection
            row.querySelector(".btn.reject").textContent = "Rejected";
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const tableRows = document.querySelectorAll("tbody tr");

    tableRows.forEach((row) => {
        const approveButton = row.querySelector(".btn.approve");
        const rejectButton = row.querySelector(".btn.reject");
        const buttonGroup = row.querySelector(".button-group");

        approveButton.addEventListener("click", () => {
            // Hide all buttons
            buttonGroup.style.display = "none";

            // Show check icon
            const successIcon = document.createElement("i");
            successIcon.classList.add("bx", "bx-check-circle");
            successIcon.style.color = "green";
            successIcon.style.fontSize = "24px";
            row.querySelector("td:nth-child(6)").appendChild(successIcon);
        });

        rejectButton.addEventListener("click", () => {
            // Hide all buttons
            buttonGroup.style.display = "none";

            // Show X icon
            const errorIcon = document.createElement("i");
            errorIcon.classList.add("bx", "bx-x-circle");
            errorIcon.style.color = "red";
            errorIcon.style.fontSize = "24px";
            row.querySelector("td:nth-child(6)").appendChild(errorIcon);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const darkModeSwitch = document.getElementById("switch-mode");

    darkModeSwitch.addEventListener("change", function () {
        if (this.checked) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    });
});




