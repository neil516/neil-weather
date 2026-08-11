// Weather API - Open-Meteo (Free, No API Key Needed)
const API_URL = 'https://api.open-meteo.com/v1/forecast';
const LOCATION = {
    latitude: 12.5,
    longitude: 121.1,
    name: 'Santa Cruz, Occidental Mindoro'
};

// Weather themes
const themes = {
    sunny: ['Clear', 'Sunny', 'Partly cloudy', 'Mostly clear'],
    rainy: ['Rain', 'Showers', 'Heavy rain', 'Thunderstorm', 'Drizzle', 'Freezing rain'],
    cloudy: ['Cloudy', 'Overcast', 'Mostly cloudy', 'Fog']
};

let weatherData = {
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 75,
    wind: 12,
    pressure: 1013,
    feelsLike: 30
};

// Initialize
window.addEventListener('load', function() {
    fetchLiveWeather();
    setInterval(fetchLiveWeather, 30 * 60 * 1000); // Update every 30 minutes
});

// Fetch real-time weather from Open-Meteo API
async function fetchLiveWeather() {
    try {
        const params = new URLSearchParams({
            latitude: LOCATION.latitude,
            longitude: LOCATION.longitude,
            current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature',
            temperature_unit: 'celsius',
            wind_speed_unit: 'kmh',
            timezone: 'auto'
        });

        const response = await fetch(`${API_URL}?${params}`);
        const data = await response.json();

        if (data.current) {
            const current = data.current;
            
            // Update weather data
            weatherData.temp = Math.round(current.temperature_2m);
            weatherData.feelsLike = Math.round(current.apparent_temperature);
            weatherData.humidity = current.relative_humidity_2m;
            weatherData.wind = Math.round(current.wind_speed_10m);
            weatherData.condition = getWeatherDescription(current.weather_code);
            
            // Pressure estimation (simplified)
            weatherData.pressure = 1013;

            console.log('✅ Live weather updated:', weatherData);
        }

        applyTheme();
        updateDisplay();
        updateTimestamp();
    } catch (error) {
        console.error('❌ Error fetching weather:', error);
        // Fallback to demo data
        updateDisplay();
    }
}

// Convert WMO Weather Codes to descriptions
function getWeatherDescription(code) {
    const weatherCodes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Foggy',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
    };
    return weatherCodes[code] || 'Unknown';
}

// Apply theme based on weather
function applyTheme() {
    document.body.classList.remove('sunny', 'rainy', 'cloudy');
    
    const condition = weatherData.condition.toLowerCase();
    
    if (themes.sunny.some(c => condition.includes(c.toLowerCase()))) {
        document.body.classList.add('sunny');
        console.log('🌞 Sunny Theme Applied');
    } else if (themes.rainy.some(c => condition.includes(c.toLowerCase()))) {
        document.body.classList.add('rainy');
        console.log('🌧️ Rainy Theme Applied');
    } else {
        document.body.classList.add('cloudy');
        console.log('☁️ Cloudy Theme Applied');
    }
}

// Update display
function updateDisplay() {
    document.getElementById('temp').textContent = weatherData.temp;
    document.getElementById('condition').textContent = weatherData.condition;
    document.getElementById('humidity').textContent = weatherData.humidity + '%';
    document.getElementById('wind').textContent = weatherData.wind + ' km/h';
    document.getElementById('pressure').textContent = weatherData.pressure + ' mb';
}

// Update timestamp
function updateTimestamp() {
    const now = new Date();
    document.getElementById('updateTime').textContent = now.toLocaleString();
    
    const next = new Date();
    next.setMinutes(next.getMinutes() + 30);
    document.getElementById('nextUpdate').textContent = next.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

console.log('🌍 Neil Weather Live - Connecting to Santa Cruz...');
console.log('📍 Location:', LOCATION.name);
console.log('⏰ Updates: Every 30 minutes');
