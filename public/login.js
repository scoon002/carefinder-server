// unfinished
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                // Handle successful login
                sessionStorage.setItem('token', data.token); // Store the token
                window.location.href = '/path-to-dashboard'; // Redirect to dashboard
            } else {
                // Handle failed login
                document.getElementById('message').innerText = 'Login failed';
            }
        })
        .catch(error => console.error('Error:', error));
});
