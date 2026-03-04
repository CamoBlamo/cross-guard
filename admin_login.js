const adminLoginForm = document.getElementById('adminLoginForm');

const adminList = {
    'admin1': 'password1',
    'admin2': 'password2',
    'admin3': 'password3'
};

// Function to get active admin username based on 360-day rotation cycle
function getActiveAdminUsername() {
    const adminUsernames = Object.keys(adminList);
    const startDate = new Date('2024-01-01'); // Reference epoch date
    const currentDate = new Date();
    const daysPassed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    const rotationIndex = Math.floor(daysPassed / 360) % adminUsernames.length;
    return adminUsernames[rotationIndex];
}

adminLoginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const activeUsername = getActiveAdminUsername();
    
    if (username === activeUsername && password === adminList[activeUsername]) {
        // Successful login
        localStorage.setItem('currentAdmin', activeUsername);
        localStorage.setItem('adminType', 'regular');
        window.location.href = 'admin_dashboard.html';
    } else {
        alert('Invalid username or password.');
    }
});