document.getElementById('search-box').addEventListener('input', function () {
	const searchQuery = this.value.toLowerCase();
	const table = document.getElementById('order-table');
	const rows = table.getElementsByTagName('tr');

	for (let i = 1; i < rows.length; i++) {
		const row = rows[i];
		const cells = row.getElementsByTagName('td');
		let match = false;

		for (let j = 0; j < cells.length; j++) {
			if (cells[j].innerText.toLowerCase().includes(searchQuery)) {
				match = true;
				break;
			}
		}

		row.style.display = match ? '' : 'none';
	}
});


// Select all top-nav links
const topNavLinks = document.querySelectorAll('.top-nav a');

// Function to handle active class
function setActiveLink(event) {
    // Remove active class from all links
    topNavLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    event.currentTarget.classList.add('active');
}

// Attach click event to all links
topNavLinks.forEach(link => {
    link.addEventListener('click', setActiveLink);
});


