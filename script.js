// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map centered on Scotland's Central Belt
    const map = L.map('map', {
        center: [55.95, -3.7],
        zoom: 8,
        zoomControl: true,
        scrollWheelZoom: true
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 6
    }).addTo(map);

    // Central Belt targeting areas with real coordinates and performance data
    const targetingAreas = [
        {
            name: "Edinburgh",
            lat: 55.9533,
            lng: -3.1883,
            population: "500,000+",
            type: "capital",
            spend: "£35.20",
            impressions: "7,850",
            cpm: "£4.48",
            clicks: "156",
            ctr: "1.99%"
        },
        {
            name: "Glasgow", 
            lat: 55.8642,
            lng: -4.2518,
            population: "600,000+",
            type: "major_city",
            spend: "£42.15",
            impressions: "9,200",
            cpm: "£4.58",
            clicks: "184",
            ctr: "2.00%"
        },
        {
            name: "Falkirk",
            lat: 55.9989,
            lng: -3.7842,
            population: "160,000+",
            type: "town",
            spend: "£18.95",
            impressions: "4,120",
            cpm: "£4.60",
            clicks: "82",
            ctr: "1.99%"
        },
        {
            name: "Stirling",
            lat: 56.1165,
            lng: -3.9369,
            population: "93,000+",
            type: "town",
            spend: "£15.80",
            impressions: "3,450",
            cpm: "£4.58",
            clicks: "69",
            ctr: "2.00%"
        },
        {
            name: "Livingston",
            lat: 55.8864,
            lng: -3.5230,
            population: "57,000+",
            type: "town",
            spend: "£22.70",
            impressions: "4,890",
            cpm: "£4.64",
            clicks: "98",
            ctr: "2.00%"
        },
        {
            name: "Hamilton",
            lat: 55.7781,
            lng: -4.0581,
            population: "54,000+",
            type: "town",
            spend: "£15.23",
            impressions: "3,265",
            cpm: "£4.66",
            clicks: "65",
            ctr: "1.99%"
        }
    ];

    // HC-One facilities with detailed information
    const hcOneFacilities = [
        { 
            name: "HC-One Glasgow North", 
            lat: 55.8842, 
            lng: -4.2018, 
            beds: "60",
            type: "Residential & Nursing Care",
            specialties: "Dementia, General Nursing"
        },
        { 
            name: "HC-One Edinburgh East", 
            lat: 55.9433, 
            lng: -3.1583, 
            beds: "45",
            type: "Residential Care",
            specialties: "Elderly Care, Respite Care"
        },
        { 
            name: "HC-One Falkirk Central", 
            lat: 55.9889, 
            lng: -3.7642, 
            beds: "38",
            type: "Nursing Care",
            specialties: "Post-Acute Care, Rehabilitation"
        },
        { 
            name: "HC-One Hamilton", 
            lat: 55.7681, 
            lng: -4.0481, 
            beds: "52",
            type: "Residential & Nursing Care",
            specialties: "Dementia, Palliative Care"
        }
    ];

    // Create layer groups for better organization
    const targetingLayer = L.layerGroup().addTo(map);
    const citiesLayer = L.layerGroup().addTo(map);
    const facilitiesLayer = L.layerGroup().addTo(map);

    // Add targeting area circles and city markers
    targetingAreas.forEach(area => {
        // 25km targeting radius circle
        const circle = L.circle([area.lat, area.lng], {
            color: '#e74c3c',
            fillColor: '#e74c3c',
            fillOpacity: 0.15,
            radius: 25000, // 25km in meters
            weight: 3,
            opacity: 0.8
        }).addTo(targetingLayer);

        // City marker
        const cityColor = area.type === 'capital' ? '#9b59b6' : 
                         area.type === 'major_city' ? '#3498db' : '#2ecc71';
        
        const cityMarker = L.circleMarker([area.lat, area.lng], {
            radius: area.type === 'capital' ? 14 : area.type === 'major_city' ? 12 : 10,
            fillColor: cityColor,
            color: 'white',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.9
        }).addTo(citiesLayer);

        // Detailed popup content
        const popupContent = `
            <div class="custom-popup">
                <h3>${area.name} Targeting Zone</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Population</div>
                        <div class="info-value">${area.population}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Targeting Radius</div>
                        <div class="info-value">25km</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Spend</div>
                        <div class="info-value">${area.spend}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Impressions</div>
                        <div class="info-value">${area.impressions}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">CPM</div>
                        <div class="info-value">${area.cpm}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Clicks</div>
                        <div class="info-value">${area.clicks}</div>
                    </div>
                </div>
                <div class="highlight">
                    <strong>CTR:</strong> ${area.ctr} | 
                    <strong>Coverage:</strong> This 25km radius captures the city center and surrounding suburbs, maximizing reach to potential healthcare workers in the Central Belt region.
                </div>
            </div>
        `;

        circle.bindPopup(popupContent);
        cityMarker.bindPopup(popupContent);
    });

    // Add HC-One facility markers
    hcOneFacilities.forEach(facility => {
        const facilityMarker = L.circleMarker([facility.lat, facility.lng], {
            radius: 10,
            fillColor: '#f39c12',
            color: 'white',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.9
        }).addTo(facilitiesLayer);

        facilityMarker.bindPopup(`
            <div class="custom-popup">
                <h3>🏥 ${facility.name}</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Capacity</div>
                        <div class="info-value">${facility.beds} beds</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Type</div>
                        <div class="info-value">${facility.type}</div>
                    </div>
                </div>
                <div class="highlight">
                    <strong>Specialties:</strong> ${facility.specialties}<br>
                    <strong>Strategy:</strong> Strategically located within the Central Belt targeting zone to attract qualified healthcare professionals from the local area.
                </div>
            </div>
        `);
    });

    // Add layer control
    const overlayMaps = {
        "Targeting Zones": targetingLayer,
        "Cities": citiesLayer,
        "HC-One Facilities": facilitiesLayer
    };

    L.control.layers(null, overlayMaps, {
        position: 'topright',
        collapsed: false
    }).addTo(map);

    // Add custom legend control
    const legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'legend');
        div.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); font-size: 14px; min-width: 200px;">
                <h4 style="margin: 0 0 15px 0; color: #2a5298; border-bottom: 2px solid #2a5298; padding-bottom: 5px;">Map Legend</h4>
                <div style="display: flex; align-items: center; margin: 8px 0;">
                    <div style="width: 20px; height: 20px; border: 3px solid #e74c3c; border-radius: 50%; margin-right: 10px; background: rgba(231, 76, 60, 0.15);"></div>
                    <span>25km targeting radius</span>
                </div>
                <div style="display: flex; align-items: center; margin: 8px 0;">
                    <div style="width: 16px; height: 16px; background: #9b59b6; border: 2px solid white; border-radius: 50%; margin-right: 12px;"></div>
                    <span>Capital city (Edinburgh)</span>
                </div>
                <div style="display: flex; align-items: center; margin: 8px 0;">
                    <div style="width: 16px; height: 16px; background: #3498db; border: 2px solid white; border-radius: 50%; margin-right: 12px;"></div>
                    <span>Major city (Glasgow)</span>
                </div>
                <div style="display: flex; align-items: center; margin: 8px 0;">
                    <div style="width: 16px; height: 16px; background: #2ecc71; border: 2px solid white; border-radius: 50%; margin-right: 12px;"></div>
                    <span>Towns/cities</span>
                </div>
                <div style="display: flex; align-items: center; margin: 8px 0;">
                    <div style="width: 16px; height: 16px; background: #f39c12; border: 2px solid white; border-radius: 50%; margin-right: 12px;"></div>
                    <span>HC-One facilities</span>
                </div>
                <div style="margin-top: 15px; padding: 12px; background: #f8f9fa; border-radius: 6px; font-size: 12px; border-left: 4px solid #2a5298;">
                    <strong>Total Coverage:</strong><br>
                    6 targeting zones • 25km radius each<br>
                    ~2M people in Central Belt region<br>
                    <em>Click any marker for detailed metrics</em>
                </div>
            </div>
        `;
        return div;
    };
    legend.addTo(map);

    // Add scale control
    L.control.scale({
        position: 'bottomleft',
        metric: true,
        imperial: false
    }).addTo(map);

    // Fit map to show all targeting areas with padding
    const allPoints = targetingAreas.map(area => [area.lat, area.lng]);
    const group = new L.featureGroup(targetingAreas.map(area => 
        L.marker([area.lat, area.lng])
    ));
    
    setTimeout(() => {
        map.fitBounds(group.getBounds().pad(0.1));
    }, 500);

    // Add map click handler for coordinates (useful for debugging)
    map.on('click', function(e) {
        console.log('Clicked at: ' + e.latlng.lat.toFixed(4) + ', ' + e.latlng.lng.toFixed(4));
    });
});
