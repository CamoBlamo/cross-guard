const loginForm = document.querySelector('.login-form');

const userList = {
    'guard1': 'guard1',
    'guard2': 'guard2',
    'guard3': 'guard3'
};

// Function to get active username based on 360-day rotation cycle
function getActiveUsername() {
    const usernames = Object.keys(userList);
    const startDate = new Date('2024-01-01'); // Reference epoch date
    const currentDate = new Date();
    const daysPassed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    const rotationIndex = Math.floor(daysPassed / 360) % usernames.length;
    return usernames[rotationIndex];
}

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const activeUsername = getActiveUsername();

    if (username === activeUsername) {
        localStorage.setItem('currentGuard', activeUsername);
        window.location.href = 'choose-school.html';
    } else {
        alert('Invalid username or password');
    }
});

