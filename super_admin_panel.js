let currentAdmin = localStorage.getItem('currentAdmin');
let adminType = localStorage.getItem('adminType');

// Verify the super admin is logged in
if (!currentAdmin || adminType !== 'super') {
    alert('Unauthorized access. Super administrator credentials required.');
    window.location.href = 'super_admin_login.html';
}

// Update the page title
document.title = 'GCPS Crossing Guard || Super Admin Panel';

// Get all sections
const guardLocationMap = document.querySelector('.guard-location-map');
const manageGuards = document.querySelector('.manage-guards');
const viewReports = document.querySelector('.view-reports');
const manageAdmins = document.querySelector('.manage-admins');
const systemSettings = document.querySelector('.system-settings');
const adminResources = document.querySelector('.admin-resources');
const clockoutConfirmation = document.querySelector('.clockout-confirmation');
const overlay = document.getElementById('overlay');

// Map variable
let map = null;
let guardMarkers = {};

// Hide all sections by default
function hideAllSections() {
    if (guardLocationMap) guardLocationMap.style.display = 'none';
    if (manageGuards) manageGuards.style.display = 'none';
    if (viewReports) viewReports.style.display = 'none';
    if (manageAdmins) manageAdmins.style.display = 'none';
    if (systemSettings) systemSettings.style.display = 'none';
    if (adminResources) adminResources.style.display = 'none';
    if (clockoutConfirmation) clockoutConfirmation.style.display = 'none';
    if (overlay) overlay.style.display = 'none';
}

// Show overlay function
function showOverlay() {
    if (overlay) overlay.style.display = 'block';
}

// Initialize - hide all sections
hideAllSections();

// Function to get active admin username based on 360-day rotation cycle
function getActiveAdminUsername() {
    const adminUsernames = ['admin1', 'admin2', 'admin3'];
    const startDate = new Date('2024-01-01');
    const currentDate = new Date();
    const daysPassed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    const rotationIndex = Math.floor(daysPassed / 360) % adminUsernames.length;
    return adminUsernames[rotationIndex];
}

// Display current rotation info
const currentRotation = document.getElementById('currentRotation');
if (currentRotation) {
    const activeAdmin = getActiveAdminUsername();
    const startDate = new Date('2024-01-01');
    const currentDate = new Date();
    const daysPassed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    const daysUntilNextRotation = 360 - (daysPassed % 360);
    currentRotation.textContent = `Current active admin: ${activeAdmin} | Days until next rotation: ${daysUntilNextRotation}`;
}

// Initialize map function
function initMap() {
    if (!map) {
        map = L.map('map').setView([33.9519, -83.3576], 12);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
    }
    
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}

// Function to get guard locations from API
async function fetchGuardLocations() {
    // TODO: Replace with actual API call
    const mockGuardData = [
        {
            id: 'guard1',
            name: 'Guard 1',
            school: 'School 1',
            location: { lat: 33.9519, lng: -83.3576 },
            status: 'active',
            lastUpdate: new Date().toLocaleTimeString()
        },
        {
            id: 'guard2',
            name: 'Guard 2',
            school: 'School 2',
            location: { lat: 33.9619, lng: -83.3476 },
            status: 'active',
            lastUpdate: new Date().toLocaleTimeString()
        },
        {
            id: 'guard3',
            name: 'Guard 3',
            school: 'School 3',
            location: { lat: 33.9419, lng: -83.3676 },
            status: 'inactive',
            lastUpdate: new Date().toLocaleTimeString()
        }
    ];
    
    updateGuardLocations(mockGuardData);
}

// Function to update guard markers on map
function updateGuardLocations(guards) {
    Object.values(guardMarkers).forEach(marker => marker.remove());
    guardMarkers = {};
    
    guards.forEach(guard => {
        if (guard.location && guard.status === 'active') {
            const marker = L.marker([guard.location.lat, guard.location.lng])
                .addTo(map)
                .bindPopup(`
                    <strong>${guard.name}</strong><br>
                    School: ${guard.school}<br>
                    Status: ${guard.status}<br>
                    Last Update: ${guard.lastUpdate}
                `);
            
            guardMarkers[guard.id] = marker;
        }
    });
    
    updateGuardList(guards);
}

// Function to update the guard list sidebar
function updateGuardList(guards) {
    const activeGuardsList = document.getElementById('activeGuards');
    if (activeGuardsList) {
        activeGuardsList.innerHTML = '';
        
        guards.forEach(guard => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="guard-item">
                    <span>${guard.name} - ${guard.school}</span>
                    <span class="guard-status status-${guard.status}">${guard.status}</span>
                </div>
            `;
            activeGuardsList.appendChild(li);
        });
    }
}

// Button event listeners
const guardLocationBtn = document.getElementById('guardLocationBtn');
if (guardLocationBtn) {
    guardLocationBtn.addEventListener('click', () => {
        hideAllSections();
        showOverlay();
        if (guardLocationMap) {
            guardLocationMap.style.display = 'block';
            initMap();
            fetchGuardLocations();
        }
    });
}

const manageGuardsBtn = document.getElementById('manageGuardsBtn');
if (manageGuardsBtn) {
    manageGuardsBtn.addEventListener('click', () => {
        hideAllSections();
        showOverlay();
        if (manageGuards) manageGuards.style.display = 'block';
    });
}

const viewReportsBtn = document.getElementById('viewReportsBtn');
if (viewReportsBtn) {
    viewReportsBtn.addEventListener('click', () => {
        hideAllSections();
        showOverlay();
        if (viewReports) viewReports.style.display = 'block';
    });
}

const manageAdminsBtn = document.getElementById('manageAdminsBtn');
if (manageAdminsBtn) {
    manageAdminsBtn.addEventListener('click', () => {
        hideAllSections();
        showOverlay();
        if (manageAdmins) manageAdmins.style.display = 'block';
    });
}

const systemSettingsBtn = document.getElementById('systemSettingsBtn');
if (systemSettingsBtn) {
    systemSettingsBtn.addEventListener('click', () => {
        hideAllSections();
        showOverlay();
        if (systemSettings) systemSettings.style.display = 'block';
        
        // Update last backup time
        const lastBackup = document.getElementById('lastBackup');
        if (lastBackup) {
            lastBackup.textContent = new Date().toLocaleString();
        }
    });
}

const adminResourcesBtn = document.getElementById('adminResourcesBtn');
if (adminResourcesBtn) {
    adminResourcesBtn.addEventListener('click', () => {
        hideAllSections();
        showOverlay();
        if (adminResources) adminResources.style.display = 'block';
    });
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        hideAllSections();
        showOverlay();
        if (clockoutConfirmation) clockoutConfirmation.style.display = 'block';
    });
}

// Clock out confirmation buttons
const confirmClockoutBtn = document.getElementById('confirmClockout');
if (confirmClockoutBtn) {
    confirmClockoutBtn.addEventListener('click', async () => {
        // TODO: Add API call here
        localStorage.removeItem('currentAdmin');
        localStorage.removeItem('adminType');
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
