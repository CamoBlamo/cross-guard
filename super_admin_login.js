const superAdminLoginForm = document.getElementById('superAdminLoginForm');

// Non-rotating super admin credentials
const superAdminCredentials = {
    'superadmin': 'SuperSecure123!',
    'sysadmin': 'SystemAdmin456!'
};

superAdminLoginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('superAdminUsername').value;
    const password = document.getElementById('superAdminPassword').value;
    
    if (superAdminCredentials[username] && superAdminCredentials[username] === password) {
        // Successful super admin login
        localStorage.setItem('currentAdmin', username);
        localStorage.setItem('adminType', 'super');
        window.location.href = 'super_admin_panel.html';
    } else {
        alert('Invalid super administrator credentials.');
    }
});
