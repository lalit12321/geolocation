const map = L.map('map').setView([0, 0], 13);
let path = L.polyline([], { color: 'blue' }).addTo(map);
// Set up the Leaflet tile layer for the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Create a marker with an initial position
let marker = L.marker([23.2599333, 77.412615]).addTo(map);

// Track the user's location
function updateLocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
   path.addLatLng([lat, lon]);
    
    // Update the map center
    map.setView([lat, lon], 13);
    
    // Move the marker to the new position
    marker.setLatLng([lat, lon]);
    
    console.log(`Lat  ${lat}, Lon: ${lon}`);
}

// Handle error in case geolocation fails
function handleError(error) {
    console.error('Geolocation error:', error);
}

// Watch the user's position in real time
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateLocation, handleError, {
        enableHighAccuracy: true,  // Use high accuracy for more precise location tracking
        timeout: 10000,            // Maximum time to wait for a location
        maximumAge: 0              // Do not use cached positions
    });
} else {
    alert('Geolocation is not supported by your browser.');
}