document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = {
        home: document.querySelector('.content'),
        orders: document.getElementById('orders-details'),
        products: document.getElementById('products-details'),
        farmers: document.getElementById('farmer-details'),
        analytics: document.getElementById('analytics-details'),
        settings: document.getElementById('settings-details')
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.textContent.trim().toLowerCase();

            // Smoothly transition between sections
            Object.values(sections).forEach(section => {
                if (section) {
                    section.style.display = 'none';
                    section.classList.remove('fade-in');
                }
            });

            if (sections[target]) {
                sections[target].style.display = 'block';
                sections[target].classList.add('fade-in');
            }
        });
    });

    // Toggle Dark Mode
    document.getElementById('toggleDarkMode').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Load and Save Theme Color Preference
    document.getElementById('colorSchemeSelect').addEventListener('change', function() {
        document.body.className = this.value;
        localStorage.setItem('colorScheme', this.value);
    });
});
