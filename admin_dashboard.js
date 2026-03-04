let currentAdmin = localStorage.getItem('currentAdmin');

// Verify the admin is logged in
if (!currentAdmin) {
    alert('Please log in to access the admin dashboard.');
    window.location.href = 'admin_login.html';
}

// Update the page title
document.title = 'GCPS Crossing Guard || Admin Dashboard';

// Get all sections
const guardLocationMap = document.querySelector('.guard-location-map');
const manageGuards = document.querySelector('.manage-guards');
const viewReports = document.querySelector('.view-reports');
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

// Initialize map function
function initMap() {
    if (!map) {
        // Initialize map centered on a default location (update coordinates as needed)
        map = L.map('map').setView([33.9519, -83.3576], 12); // Gwinnett County, GA coordinates
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
    }
    
    // Refresh map size (important when showing modal)
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}

// Function to get guard locations from API
async function fetchGuardLocations() {
    // TODO: Replace with actual API call to get guard locations
    // Example API structure:
    // try {
    //     const response = await fetch('/api/guards/locations');
    //     const guards = await response.json();
    //     updateGuardLocations(guards);
    // } catch (error) {
    //     console.error('Error fetching guard locations:', error);
    // }
    
    // Mock data for demonstration
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
    // Clear existing markers
    Object.values(guardMarkers).forEach(marker => marker.remove());
    guardMarkers = {};
    
    // Add new markers
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
    
    // Update guard list
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
            
            // TODO: Set up periodic updates (e.g., every 30 seconds)
            // setInterval(fetchGuardLocations, 30000);
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
        // TODO: Add API call here to log admin clock out time
        // Example:
        // try {
        //     await fetch('/api/admin/clockout', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             admin: currentAdmin,
        //             timestamp: new Date().toISOString()
        //         })
        //     });
        // } catch (error) {
        //     console.error('Error clocking out:', error);
        // }
        
        // Clear session and redirect
        localStorage.removeItem('currentAdmin');
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
