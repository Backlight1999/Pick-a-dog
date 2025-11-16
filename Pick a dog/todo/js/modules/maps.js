/**
 * Maps Module
 * Integrates Google Maps API to show:
 * - Runner location (approximate, based on zone/geolocation)
 * - Dog location (approximate, based on zone)
 * - Route between runner and dog
 * 
 * SETUP REQUIRED:
 * 1. Get a Google Maps API Key from: https://console.cloud.google.com/
 * 2. Enable these APIs:
 *    - Maps JavaScript API
 *    - Directions API
 *    - Geocoding API
 * 3. Add your key to index.html and other HTML files in a <script> tag:
 *    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places,directions"></script>
 * 4. CORS restrictions: The API key should have HTTP referrers restricted to your domain.
 */

import { leerLS } from './storage.js';

// Fake zone coordinates (for demo purposes)
// In a real app, you'd use geolocation or a geocoding API
const ZONA_COORDS = {
    'zona centro': { lat: 19.4326, lng: -99.1332 },     // CDMX Centro
    'condesa': { lat: 19.4301, lng: -99.1612 },         // La Condesa, CDMX
    'roma': { lat: 19.4155, lng: -99.1658 },            // La Roma, CDMX
    'coyoacán': { lat: 19.3426, lng: -99.1631 },        // Coyoacán, CDMX
    'reforma': { lat: 19.4330, lng: -99.1544 },         // Paseo de la Reforma, CDMX
    'default': { lat: 19.4326, lng: -99.1332 }          // Default: Centro CDMX
};

function getCoordsByZona(zona) {
    const zonaNorm = zona.toLowerCase().trim();
    return ZONA_COORDS[zonaNorm] || ZONA_COORDS['default'];
}

function addRandomOffset(coords, radiusKm = 0.5) {
    // Add small random offset to approximate location within zone
    const latOffset = (Math.random() - 0.5) * (radiusKm / 111); // 1 degree lat ≈ 111 km
    const lngOffset = (Math.random() - 0.5) * (radiusKm / 111);
    return {
        lat: coords.lat + latOffset,
        lng: coords.lng + lngOffset
    };
}

export function initMapView() {
    // Initialize on map-view.html
    if (!window.location.pathname.includes('map-view.html')) return;

    // Check if Google Maps API is loaded
    if (typeof google === 'undefined' || !google.maps) {
        document.body.innerHTML = `
            <div class="container" style="margin-top: 40px;">
                <h2 style="color: #d32f2f;">⚠️ Error: Google Maps API no está cargado</h2>
                <p>Para usar mapas, debes:</p>
                <ol>
                    <li>Obtener una API Key de <a href="https://console.cloud.google.com/" target="_blank">Google Cloud Console</a></li>
                    <li>Habilitar: Maps JavaScript API, Directions API, Geocoding API</li>
                    <li>Agregar este script a la cabecera de HTML:
                        <pre>&lt;script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places,directions"&gt;&lt;/script&gt;</pre>
                    </li>
                    <li>Reemplazar YOUR_API_KEY con tu clave real</li>
                </ol>
                <p><a href="index.html">&larr; Volver al inicio</a></p>
            </div>
        `;
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const runnerId = params.get('runner_id');
    const dogId = params.get('dog_id');

    if (!runnerId || !dogId) {
        document.body.innerHTML = '<h2 style="text-align:center;">Error: Faltan parámetros (runner_id y dog_id)</h2>';
        return;
    }

    const runners = leerLS('runnersDB');
    const perros = leerLS('perros');
    const runner = runners.find(r => String(r.id) === String(runnerId));
    const perro = perros.find(p => String(p.id) === String(dogId));

    if (!runner || !perro) {
        document.body.innerHTML = '<h2 style="text-align:center;">Error: Runner o perro no encontrados</h2>';
        return;
    }

    // Get approximate coordinates
    const runnerBase = getCoordsByZona(runner.zona);
    const runnerCoords = addRandomOffset(runnerBase);
    const perroBase = getCoordsByZona(perro.zona);
    const perroCoords = addRandomOffset(perroBase);

    // Update info section
    const infoDiv = document.getElementById('map-info');
    if (infoDiv) {
        infoDiv.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="card">
                    <h4>🏃 Runner</h4>
                    <p><strong>${runner.nombre}</strong></p>
                    <p>Zona: ${runner.zona}</p>
                </div>
                <div class="card">
                    <h4>🐕 Perro</h4>
                    <p><strong>${perro.nombre}</strong></p>
                    <p>Zona: ${perro.zona}</p>
                </div>
            </div>
        `;
    }

    // Initialize map
    const mapDiv = document.getElementById('map');
    if (!mapDiv) return;

    const centerLat = (runnerCoords.lat + perroCoords.lat) / 2;
    const centerLng = (runnerCoords.lng + perroCoords.lng) / 2;

    const map = new google.maps.Map(mapDiv, {
        zoom: 15,
        center: { lat: centerLat, lng: centerLng },
        mapTypeId: 'roadmap'
    });

    // Add markers
    const runnerMarker = new google.maps.Marker({
        position: runnerCoords,
        map: map,
        title: `${runner.nombre} (Runner)`,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });

    const dogMarker = new google.maps.Marker({
        position: perroCoords,
        map: map,
        title: `${perro.nombre} (Perro)`,
        icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'
    });

    // Add info windows
    const runnerInfo = new google.maps.InfoWindow({
        content: `<div><strong>${runner.nombre}</strong><br>Runner<br>${runner.zona}</div>`
    });

    const dogInfo = new google.maps.InfoWindow({
        content: `<div><strong>${perro.nombre}</strong><br>Perro<br>${perro.zona}</div>`
    });

    runnerMarker.addListener('click', () => {
        dogInfo.close();
        runnerInfo.open(map, runnerMarker);
    });

    dogMarker.addListener('click', () => {
        runnerInfo.close();
        dogInfo.open(map, dogMarker);
    });

    // Draw route using DirectionsService
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: {
            strokeColor: '#4A90E2',
            strokeWeight: 3
        }
    });

    directionsService.route(
        {
            origin: runnerCoords,
            destination: perroCoords,
            travelMode: google.maps.TravelMode.WALKING
        },
        (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);

                // Display route info
                const routeDiv = document.getElementById('route-info');
                if (routeDiv && result.routes[0].legs[0]) {
                    const leg = result.routes[0].legs[0];
                    routeDiv.innerHTML = `
                        <div class="card" style="background: #e3f2fd; border-left: 4px solid #4A90E2;">
                            <h4>📍 Detalles de la Ruta</h4>
                            <p><strong>Distancia:</strong> ${leg.distance.text}</p>
                            <p><strong>Tiempo estimado:</strong> ${leg.duration.text}</p>
                        </div>
                    `;
                }
            } else {
                console.warn('Directions request failed:', status);
                const routeDiv = document.getElementById('route-info');
                if (routeDiv) {
                    routeDiv.innerHTML = `<p style="color: #d32f2f;">No se pudo calcular la ruta.</p>`;
                }
            }
        }
    );
}
