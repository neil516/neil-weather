// Weather themes
const themes = {
    sunny: ['Sunny', 'Clear', 'Mostly Sunny', 'Clear Sky', 'Partly Sunny'],
    rainy: ['Rainy', 'Heavy Rain', 'Showers', 'Rain', 'Drizzle', 'Thunderstorm', 'Scattered Showers'],
    cloudy: ['Cloudy', 'Overcast', 'Partly Cloudy', 'Mostly Cloudy']
};

let weatherData = {
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 75,
    wind: 12,
    pressure: 1013
};

// Init
window.addEventListener('load', function() {
    generateWeather();
    applyTheme();
    updateDisplay();
    setNextUpdate();
    setInterval(updateWeather, 24 * 60 * 60 * 1000);
});

// Random weather
function generateWeather() {
    const conditions = ['Sunny', 'Rainy', 'Partly Cloudy', 'Cloudy', 'Clear', 'Scattered Showers', 'Thunderstorm'];
    weatherData.condition = conditions[Math.floor(Math.random() * conditions.length)];
    weatherData.temp = Math.floor(Math.random() * (32 - 24) + 24);
    weatherData.humidity = Math.floor(Math.random() * (90 - 60) + 60);
    weatherData.wind = Math.floor(Math.random() * (20 - 8) + 8);
    weatherData.pressure = Math.floor(Math.random() * (1020 - 1005) + 1005);
}

// Apply theme
function applyTheme() {
    document.body.classList.remove('sunny', 'rainy', 'cloudy');
    
    if (themes.sunny.some(c => weatherData.condition.toLowerCase().includes(c.toLowerCase()))) {
        document.body.classList.add('sunny');
    } else if (themes.rainy.some(c => weatherData.condition.toLowerCase().includes(c.toLowerCase()))) {
        document.body.classList.add('rainy');
    } else {
        document.body.classList.add('cloudy');
    }
}

// Update display
function updateDisplay() {
    document.getElementById('temp').textContent = weatherData.temp;
    document.getElementById('condition').textContent = weatherData.condition;
    document.getElementById('humidity').textContent = weatherData.humidity + '%';
    document.getElementById('wind').textContent = weatherData.wind + ' km/h';
    document.getElementById('pressure').textContent = weatherData.pressure + ' mb';
    document.getElementById('updateTime').textContent = new Date().toLocaleString();
}

// Update weather every 24 hours
function updateWeather() {
    generateWeather();
    applyTheme();
    updateDisplay();
    setNextUpdate();
}

// Set next update time
function setNextUpdate() {
    const next = new Date();
    next.setHours(next.getHours() + 24);
    document.getElementById('nextUpdate').textContent = next.toLocaleDateString() + ' ' + next.toLocaleTimeString();
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
