document.getElementById('auth-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const code = document.getElementById('auth-code').value.trim();
    if (code) {
        alert(`Code entered: ${code}`);
    } else {
        alert('Please enter the code.');
    }
});
