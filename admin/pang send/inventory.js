document.querySelector('.btn-add-activity').addEventListener('click', () => {
    document.querySelector('#add-activity-modal').classList.remove('hidden');
});

document.querySelector('#cancel-button').addEventListener('click', () => {
    document.querySelector('#add-activity-modal').classList.add('hidden');
});

document.querySelector('#add-activity-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const role = document.querySelector('#role').value;
    const activity = document.querySelector('#activity').value;
    const details = document.querySelector('#details').value;
    const timestamp = document.querySelector('#timestamp').value;

    const tableBody = document.querySelector('.activity-table tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${role}</td>
        <td>${activity}</td>
        <td>${details}</td>
        <td>${timestamp}</td>
    `;
    tableBody.appendChild(newRow);

    document.querySelector('#add-activity-modal').classList.add('hidden');
});
