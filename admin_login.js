const adminLoginForm = document.getElementById('adminLoginForm');
const adminUsername = document.getElementById('adminUsername');
const adminPassword = document.getElementById('adminPassword');
const validAdminCredentials = {
    'admin1': 'password1',
    'admin2': 'password2',
    'admin3': 'password3'
};

adminLoginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = adminUsername.value;
    const password = adminPassword.value;
    
    if (validAdminCredentials[username] && validAdminCredentials[username] === password) {
        // Successful login
        localStorage.setItem('currentAdmin', username);
        window.location.href = 'admin_dashboard.html';
    } else {
        alert('Invalid username or password.');
    }
});