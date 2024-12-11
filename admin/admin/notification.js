document.addEventListener('DOMContentLoaded', () => {
    const notificationIcon = document.querySelector('.notification');
    const notificationBar = document.getElementById('notificationBar');
    const markAllReadButton = document.getElementById('markAllRead');
    const notificationList = document.getElementById('notificationList');

    // Show/Hide notification bar
    notificationIcon.addEventListener('click', (event) => {
        event.preventDefault();
        notificationBar.classList.toggle('hidden');
    });

    // Mark all notifications as read
    markAllReadButton.addEventListener('click', () => {
        const notifications = notificationList.querySelectorAll('li');
        notifications.forEach(notification => {
            notification.classList.add('read');
            notification.querySelector('.mark-read-btn').textContent = 'Read';
        });
        notificationIcon.querySelector('.num').textContent = '0'; // Update notification count
    });

    // Mark individual notification as read
    notificationList.addEventListener('click', (event) => {
        if (event.target.classList.contains('mark-read-btn')) {
            const notificationItem = event.target.closest('li');
            notificationItem.classList.add('read');
            event.target.textContent = 'Read';

            // Update notification count
            const unreadCount = notificationList.querySelectorAll('li:not(.read)').length;
            notificationIcon.querySelector('.num').textContent = unreadCount;
        }
    });

    // Close notification bar when clicking outside
    document.addEventListener('click', (event) => {
        if (!notificationBar.contains(event.target) && !notificationIcon.contains(event.target)) {
            notificationBar.classList.add('hidden');
        }
    });
});
