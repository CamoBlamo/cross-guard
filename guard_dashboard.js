let schoolName = localStorage.getItem('selectedSchool');
let currentGuard = localStorage.getItem('currentGuard');

// Verify the user is logged in
if (!currentGuard || !schoolName) {
    alert('Please log in and select a school.');
    window.location.href = 'guard_login.html';
}

// Update the page title and display info
document.title = schoolName + ' || Guard Dashboard';
const heading = document.querySelector('h1');
if (heading) {
    heading.textContent = `Welcome to the dashboard for ${schoolName}!`;
}

// Display welcome message
const welcomeMsg = document.querySelector('p');
if (welcomeMsg) {
    welcomeMsg.textContent = `Here you can manage your schedule, view announcements, and access resources related to your crossing guard duties at ${schoolName}.`;
}

// Get all sections
const scheduleSection = document.querySelector('.schedule');
const announcementsSection = document.querySelector('.announcements');
const resourcesSection = document.querySelector('.resources');
const clockoutConfirmation = document.querySelector('.clockout-confirmation');
const overlay = document.getElementById('overlay');

// Hide all sections by default
function hideAllSections() {
    if (scheduleSection) scheduleSection.style.display = 'none';
    if (announcementsSection) announcementsSection.style.display = 'none';
    if (resourcesSection) resourcesSection.style.display = 'none';
    if (clockoutConfirmation) clockoutConfirmation.style.display = 'none';
    if (overlay) overlay.style.display = 'none';
}

// Show overlay function
function showOverlay() {
    if (overlay) overlay.style.display = 'block';
}

// Initialize - hide all sections
hideAllSections();

// Button event listeners
const scheduleBtn = document.getElementById('scheduleBtn');
if (scheduleBtn) {
    scheduleBtn.addEventListener('click', () => {
        hideAllSections();
        showOverlay();
        if (scheduleSection) scheduleSection.style.display = 'block';
    });
}

const announcementsBtn = document.getElementById('announcementsBtn');
if (announcementsBtn) {
    announcementsBtn.addEventListener('click', () => {
        hideAllSections();
        showOverlay();
        if (announcementsSection) announcementsSection.style.display = 'block';
    });
}

const resourcesBtn = document.getElementById('resourcesBtn');
if (resourcesBtn) {
    resourcesBtn.addEventListener('click', () => {
        hideAllSections();
        showOverlay();
        if (resourcesSection) resourcesSection.style.display = 'block';
    });
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        // Show confirmation modal
        hideAllSections();
        showOverlay();
        if (clockoutConfirmation) clockoutConfirmation.style.display = 'block';
    });
}

// Clock out confirmation buttons
const confirmClockoutBtn = document.getElementById('confirmClockout');
if (confirmClockoutBtn) {
    confirmClockoutBtn.addEventListener('click', async () => {
        // TODO: Add API call here to log clock out time
        // Example:
        // try {
        //     await fetch('/api/clockout', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             guard: currentGuard,
        //             school: schoolName,
        //             timestamp: new Date().toISOString()
        //         })
        //     });
        // } catch (error) {
        //     console.error('Error clocking out:', error);
        // }
        
        // Clear session and redirect
        localStorage.removeItem('currentGuard');
        localStorage.removeItem('selectedSchool');
        window.location.href = 'index.html';
    });
}

const cancelClockoutBtn = document.getElementById('cancelClockout');
if (cancelClockoutBtn) {
    cancelClockoutBtn.addEventListener('click', () => {
        hideAllSections();
    });
}

// Close button event listeners
const closeButtons = document.querySelectorAll('.close-btn');
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        hideAllSections();
    });
});

// Close popup when clicking on overlay
if (overlay) {
    overlay.addEventListener('click', () => {
        hideAllSections();
    });
}

