// Weather API - Open-Meteo (Free, No API Key Needed)
const API_URL = 'https://api.open-meteo.com/v1/forecast';
const LOCATION = {
    latitude: 13.1167,
    longitude: 120.7467,
    name: 'Santa Cruz, Occidental Mindoro'
};

// Weather themes
const themes = {
    sunny: ['Clear', 'Sunny', 'Partly cloudy', 'Mostly clear'],
    rainy: ['Rain', 'Showers', 'Heavy rain', 'Thunderstorm', 'Drizzle', 'Freezing rain'],
    cloudy: ['Cloudy', 'Overcast', 'Mostly cloudy', 'Fog']
};

let weatherData = {
    temp: null,
    condition: 'Loading...',
    humidity: null,
    wind: null,
    pressure: null,
    feelsLike: null
};

// Initialize
window.addEventListener('load', function() {
    console.log('🌍 Neil Weather App Initialized');
    console.log('📍 Location:', LOCATION.name);
    console.log('Coordinates: ' + LOCATION.latitude + '°N, ' + LOCATION.longitude + '°E');
    console.log('Click "Get Weather Now" button to fetch live weather');
});

// Fetch real-time weather from Open-Meteo API
async function fetchLiveWeather() {
    console.log('🔄 Fetching live weather for Santa Cruz...');
    document.getElementById('condition').textContent = 'Loading...';
    document.getElementById('temp').textContent = '--';
    
    try {
        const params = new URLSearchParams({
            latitude: LOCATION.latitude,
            longitude: LOCATION.longitude,
            current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature,pressure_msl',
            temperature_unit: 'celsius',
            wind_speed_unit: 'kmh',
            timezone: 'Asia/Manila'
        });

        const response = await fetch(`${API_URL}?${params}`);
        const data = await response.json();

        if (data.current) {
            const current = data.current;
            
            // Update weather data with EXACT values
            weatherData.temp = current.temperature_2m;
            weatherData.feelsLike = current.apparent_temperature;
            weatherData.humidity = current.relative_humidity_2m;
            weatherData.wind = current.wind_speed_10m;
            weatherData.pressure = current.pressure_msl || 1013;
            weatherData.condition = getWeatherDescription(current.weather_code);

            console.log('✅ LIVE Weather Data Retrieved:');
            console.log('🌡️ Temperature:', weatherData.temp + '°C');
            console.log('💨 Wind Speed:', weatherData.wind + ' km/h');
            console.log('💧 Humidity:', weatherData.humidity + '%');
            console.log('🔽 Pressure:', weatherData.pressure + ' mb');
            console.log('☁️ Condition:', weatherData.condition);

            applyTheme();
            updateDisplay();
            updateTimestamp();
        }
    } catch (error) {
        console.error('❌ Error fetching weather:', error);
        document.getElementById('condition').textContent = 'Error loading weather';
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
        console.log('☀️ Sunny Theme Applied');
    } else if (themes.rainy.some(c => condition.includes(c.toLowerCase()))) {
        document.body.classList.add('rainy');
        console.log('🌧️ Rainy Theme Applied');
    } else {
        document.body.classList.add('cloudy');
        console.log('☁️ Cloudy Theme Applied');
    }
}

// Update display with EXACT values
function updateDisplay() {
    document.getElementById('temp').textContent = weatherData.temp !== null ? weatherData.temp.toFixed(1) : '--';
    document.getElementById('feelsLike').textContent = weatherData.feelsLike !== null ? weatherData.feelsLike.toFixed(1) : '--';
    document.getElementById('condition').textContent = weatherData.condition;
    document.getElementById('humidity').textContent = weatherData.humidity !== null ? weatherData.humidity + '%' : '--';
    document.getElementById('wind').textContent = weatherData.wind !== null ? weatherData.wind.toFixed(1) + ' km/h' : '--';
    document.getElementById('pressure').textContent = weatherData.pressure !== null ? weatherData.pressure.toFixed(0) + ' mb' : '--';
}

// Update timestamp
function updateTimestamp() {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('updateTime').textContent = 'Last updated: ' + timeString;
    document.getElementById('lastUpdate').textContent = '⏱️ Last updated: ' + timeString;
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

console.log('🌐 Neil Weather Live Website Ready');
console.log('Click "Get Weather Now" or "Refresh Weather" button for exact current conditions');
