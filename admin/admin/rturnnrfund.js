// Select all view buttons
const viewButtons = document.querySelectorAll('.view-btn');

// Modal and close button
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');

// Function to show the modal
const showModal = (details) => {
    // Debugging image path
    console.log('Photo path:', details.photo);

    document.getElementById('customer-id').textContent = details.customerId;
    document.getElementById('seller-id').textContent = details.sellerId;
    document.getElementById('rider-name').textContent = details.riderName;
    document.getElementById('order').textContent = details.order;
    document.getElementById('price').textContent = details.price;
    document.getElementById('request-date').textContent = details.date;
    document.getElementById('refund-reason').textContent = details.reason;

    const productPhoto = document.getElementById('product-photo');
    productPhoto.src = details.photo; // Set image source

    // Fallback in case the image fails to load
    productPhoto.onerror = function () {
        this.src = 'img/default.jpg'; // Path to a default image
    };

    // Show modal
    modal.style.display = 'block';
};

// Hide modal on close
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Hide modal if clicked outside content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Add event listeners to view buttons
viewButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Replace with actual data fetching
        const details = {
            customerId: 'C123',
            sellerId: 'S456',
            riderName: 'John Doe',
            price: '₱20',
            order: 'Rice',
            date: '2024-12-07',
            reason: 'Scam, wipes dumating...',
            photo: 'img/wipes.jpg', // Example image path
        };
        showModal(details);
    });
});
