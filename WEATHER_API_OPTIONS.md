# Weather API Options

## Recommended Free Weather APIs for Indonesia

### 1. **OpenWeatherMap** (Recommended)
- **Website:** https://openweathermap.org/api
- **Free Tier:** 1,000 calls/day, 60 calls/minute
- **Coverage:** Excellent for Indonesia
- **Features:** Current weather, forecasts, historical data
- **API Key:** Required (free signup)

**Example Endpoint:**
```
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric&lang=id
```

**Response Example:**
```json
{
  "main": {
    "temp": 28.5,
    "feels_like": 32.1,
    "humidity": 78
  },
  "weather": [
    {
      "main": "Clouds",
      "description": "berawan"
    }
  ],
  "name": "Jakarta"
}
```

**Pros:**
- ✅ Very reliable
- ✅ Good documentation
- ✅ Supports Indonesian language
- ✅ Free tier is generous

**Cons:**
- ❌ Requires API key
- ❌ 1000 requests/day limit

---

### 2. **WeatherAPI.com**
- **Website:** https://www.weatherapi.com/
- **Free Tier:** 1 million calls/month
- **Coverage:** Excellent worldwide including Indonesia
- **Features:** Current weather, forecasts, astronomy, alerts

**Example Endpoint:**
```
http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={city}&aqi=no
```

**Response Example:**
```json
{
  "location": {
    "name": "Jakarta",
    "country": "Indonesia"
  },
  "current": {
    "temp_c": 28,
    "condition": {
      "text": "Partly cloudy"
    },
    "humidity": 75,
    "wind_kph": 15
  }
}
```

**Pros:**
- ✅ Very generous free tier (1M calls/month!)
- ✅ Simple API
- ✅ No credit card required

**Cons:**
- ❌ Requires API key

---

### 3. **BMKG (Badan Meteorologi Indonesia)** - Native Indonesia
- **Website:** https://data.bmkg.go.id/
- **Free Tier:** Unlimited (public data)
- **Coverage:** All Indonesia cities
- **Features:** Official Indonesian weather data

**Example Endpoints:**
```
https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-{ProvinsiID}.xml
```

**Pros:**
- ✅ Official Indonesian data
- ✅ No API key needed
- ✅ Free unlimited access
- ✅ Most accurate for Indonesia

**Cons:**
- ❌ XML format (not JSON)
- ❌ Limited documentation
- ❌ Requires province ID mapping

---

### 4. **Open-Meteo**
- **Website:** https://open-meteo.com/
- **Free Tier:** Unlimited non-commercial use
- **Coverage:** Worldwide
- **Features:** Weather forecasts, no API key needed

**Example Endpoint:**
```
https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true
```

**Response Example:**
```json
{
  "current_weather": {
    "temperature": 28.5,
    "windspeed": 12.0,
    "weathercode": 3
  }
}
```

**Pros:**
- ✅ No API key required
- ✅ Unlimited free usage
- ✅ Uses coordinates (good for our IP geolocation)

**Cons:**
- ❌ Weather codes need mapping to descriptions
- ❌ Limited to forecasts (no real-time observations)

---

## Recommended Choice for Your Project

**I recommend starting with OpenWeatherMap** for these reasons:
1. ✅ 1,000 calls/day is enough for a dashboard (even with 100 users visiting daily)
2. ✅ Indonesian language support (`lang=id`)
3. ✅ Easy to integrate
4. ✅ Can use city name or coordinates
5. ✅ Great documentation

## Implementation Example for OpenWeatherMap

```typescript
// In your WeatherCard.tsx

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

async function fetchWeather(city: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`
  );
  const data = await response.json();
  
  return {
    temperature: Math.round(data.main.temp),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
  };
}
```

## Getting Started

1. **Sign up for OpenWeatherMap:**
   - Go to https://openweathermap.org/api
   - Create free account
   - Generate API key
   - Add to `.env.local`:
     ```
     NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
     ```

2. **Alternative: Use Open-Meteo (No API key):**
   - No signup required
   - Use coordinates from `useUserLocation` hook
   - Start coding immediately

## Weather Icons

OpenWeatherMap provides icon codes. You can either:
- Use their icons: `http://openweathermap.org/img/wn/{icon}@2x.png`
- Map to react-icons based on condition
- Use custom icons

---

**Need help choosing?** 
- **Just testing?** → Use Open-Meteo (no signup)
- **Production app?** → Use OpenWeatherMap (best reliability)
- **Indonesia-specific?** → Use BMKG (official data)