document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category-select');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');
    const tableRows = document.querySelectorAll('#verification-table tr');

    // Filter by Category
    categorySelect.addEventListener('change', () => {
        const selectedCategory = categorySelect.value;
        tableRows.forEach(row => {
            const rowCategory = row.getAttribute('data-category');
            if (selectedCategory === 'all' || rowCategory === selectedCategory) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Search by Name or Email
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        tableRows.forEach(row => {
            const name = row.children[0].textContent.toLowerCase();
            const email = row.children[1].textContent.toLowerCase();
            if (name.includes(searchTerm) || email.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Optional: Trigger search on Enter key press
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category-select');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');
    const tableRows = document.querySelectorAll('#verification-table tr');

    // Filter by Category
    categorySelect.addEventListener('change', () => {
        const selectedCategory = categorySelect.value.toLowerCase();

        tableRows.forEach(row => {
            const rowCategory = row.getAttribute('data-category').toLowerCase();

            // Show or hide rows based on the selected category
            if (selectedCategory === 'all' || rowCategory === selectedCategory) {
                row.style.display = ''; // Show row
            } else {
                row.style.display = 'none'; // Hide row
            }
        });
    });

    // Search by Name or Email
    const filterTable = () => {
        const searchTerm = searchInput.value.toLowerCase();

        tableRows.forEach(row => {
            const name = row.children[0].textContent.toLowerCase();
            const email = row.children[1].textContent.toLowerCase();

            // Show row if name or email matches search term
            if (name.includes(searchTerm) || email.includes(searchTerm)) {
                row.style.display = ''; // Show row
            } else {
                row.style.display = 'none'; // Hide row
            }
        });
    };

    // Trigger search when clicking the search button
    searchButton.addEventListener('click', filterTable);

    // Trigger search when pressing "Enter" in the search input
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            filterTable();
        }
    });
});


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


