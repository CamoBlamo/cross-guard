const guardBtn = document.getElementById('crossingBtn');
const adminBtn = document.getElementById('adminBtn');

function redirectAdmin() {
//window.alert('Administrator login is currently unavailable. Please contact your administrator for access.');
    window.location.href = 'admin_login.html';
}

function redirectGuard() {
    //window.alert('Crossing Guard login is currently unavailable. Please contact your administrator for access.');
    window.location.href = 'guard_login.html';
}

guardBtn.addEventListener('click', redirectGuard);
adminBtn.addEventListener('click', redirectAdmin);