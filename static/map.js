let map = L.map('map').setView([12.9716, 77.5946], 13);  // Default view set to Bangalore

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

let startMarker, endMarker;
let routeLayer;
let liveLocationMarker;
let routeControl;
let distanceDisplay = document.getElementById('distance');
let timeDisplay = document.getElementById('time');
let clearBtn = document.getElementById('clearBtn');

// Get user's live location
navigator.geolocation.getCurrentPosition(
    position => {
        const { latitude, longitude } = position.coords;
        const liveLocation = [latitude, longitude];

        liveLocationMarker = L.marker(liveLocation).addTo(map).bindPopup("Your location").openPopup();
        map.setView(liveLocation, 13);

        // Place the start marker at live location
        startMarker = L.marker(liveLocation, { draggable: true }).addTo(map).bindPopup("Start").openPopup();

        // Enable route planning when the user clicks anywhere on the map
        map.on('click', function(e) {
            const destination = [e.latlng.lat, e.latlng.lng];
            if (endMarker) {
                map.removeLayer(endMarker);
            }
            endMarker = L.marker(destination, { draggable: true }).addTo(map).bindPopup("End").openPopup();
            calculateRoute(liveLocation, destination);
        });

    },
    error => {
        console.error("Error getting location:", error);
        alert("Unable to get live location.");
    }
);

function calculateRoute(start, end) {
    if (routeLayer) {
        map.removeLayer(routeLayer);  // Remove any existing route layer
    }

    const startCoords = [start[1], start[0]];  // Convert to [longitude, latitude]
    const endCoords = [end[1], end[0]];

    // Make an API request to get the route data
    fetch('/route', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ start: startCoords, end: endCoords })
    })
    .then(response => response.json())
    .then(data => {
        if (data.features && data.features.length > 0) {
            const routeCoordinates = data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
            routeLayer = L.polyline(routeCoordinates, { color: 'blue' }).addTo(map);
            map.fitBounds(routeLayer.getBounds());

            // Display distance and time
            const distance = data.features[0].properties.segments[0].distance / 1000;  // Convert meters to kilometers
            const time = data.features[0].properties.segments[0].duration / 60;  // Convert seconds to minutes

            distanceDisplay.innerText = `${distance.toFixed(2)} km`;
            timeDisplay.innerText = `${time.toFixed(2)} minutes`;
        } else {
            alert("No route found.");
        }
    })
    .catch(error => {
        console.error("Error fetching route:", error);
        alert("Failed to fetch route.");
    });
}

// Clear markers and route when the button is clicked
clearBtn.addEventListener('click', () => {
    if (startMarker) {
        map.removeLayer(startMarker);
    }
    if (endMarker) {
        map.removeLayer(endMarker);
    }
    if (routeLayer) {
        map.removeLayer(routeLayer);
    }
    distanceDisplay.innerText = '--';
    timeDisplay.innerText = '--';
});
