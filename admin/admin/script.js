const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})


document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.querySelector('.bx-search');
    const filterIcon = document.querySelector('.bx-filter');
    const searchPanel = document.getElementById('search-panel');
    const filterPanel = document.getElementById('filter-panel');
    const sideSearch = document.getElementById('side-search');

    // Toggle search panel
    searchIcon.addEventListener('click', () => {
        searchPanel.classList.toggle('hidden');
        filterPanel.classList.add('hidden'); // Close filter panel if open
    });

    // Toggle filter panel
    filterIcon.addEventListener('click', () => {
        filterPanel.classList.toggle('hidden');
        searchPanel.classList.add('hidden'); // Close search panel if open
    });

    // Live search functionality
    sideSearch.addEventListener('input', () => {
        const query = sideSearch.value.toLowerCase();
        const rows = document.querySelectorAll("table tbody tr");
        rows.forEach(row => {
            const cells = Array.from(row.children);
            const match = cells.some(cell => cell.textContent.toLowerCase().includes(query));
            row.style.display = match ? '' : 'none';
        });
    });
});

// Filter table rows based on status
function filterTable(status) {
    const rows = document.querySelectorAll("table tbody tr");
    rows.forEach(row => {
        const statusCell = row.querySelector('.status');
        if (!status || statusCell.textContent.toLowerCase().includes(status)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}


// Get the search input and the table rows
const searchInput = document.querySelector('.inventory-search');
const tableRows = document.querySelectorAll('.inventory-table tbody tr');

// Add an event listener to capture input changes
searchInput.addEventListener('input', function () {
    const searchValue = searchInput.value.toLowerCase();

    tableRows.forEach((row) => {
        const productName = row.cells[0].textContent.toLowerCase(); // Get the product name from the first cell
        if (productName.includes(searchValue)) {
            row.style.display = ''; // Show the row if it matches the search
        } else {
            row.style.display = 'none'; // Hide the row if it doesn't match
        }
    });
});


