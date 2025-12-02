# Setup Instructions

## 🎯 What's New

Your Station2-Info app now has:
1. ✅ **Automatic Location Detection** - Uses IP geolocation to detect user's city
2. ✅ **Real Weather Data** - Integrates with OpenWeatherMap API
3. ✅ **Prayer Times** - Fetches real-time prayer schedule based on user's city
4. ✅ **Smart Caching** - Location is cached for 1 hour to reduce API calls

---

## 🚀 Quick Start

### Step 1: Add Your API Key

Make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
```

**To get your API key:**
1. Go to https://openweathermap.org/api
2. Sign up for a free account
3. Verify your email
4. Go to "My API Keys" section
5. Copy your API key
6. Paste it in `.env.local`

⚠️ **Important:** It may take 10-15 minutes for your API key to activate after signup!

### Step 2: Restart Development Server

After adding your API key, restart your dev server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
# or
yarn dev
```

### Step 3: Test the App

Open your browser and visit `http://localhost:3000`

You should see:
- **WeatherCard**: Shows real weather for your city (temperature, condition, humidity, wind)
- **PrayerCard**: Shows current prayer time and next prayer time

---

## 📁 New Files Created

### 1. `src/hooks/useUserLocation.ts`
Custom React hook that:
- Detects user's city using IP geolocation
- Falls back to alternative API if primary fails
- Caches location in localStorage (1 hour)
- Returns: `city`, `country`, `latitude`, `longitude`, `loading`, `error`

**Usage:**
```tsx
import { useUserLocation } from '@/hooks/useUserLocation';

const MyComponent = () => {
  const location = useUserLocation();
  
  if (location.loading) return <div>Loading...</div>;
  if (location.error) return <div>Error: {location.error}</div>;
  
  return <div>You are in {location.city}</div>;
};
```

### 2. Updated `src/components/cards/WeatherCard.tsx`
Now features:
- Real-time weather from OpenWeatherMap
- Dynamic weather icons based on conditions
- Temperature, humidity, and wind speed
- Indonesian language support
- Error handling and loading states

### 3. Updated `src/components/cards/PrayerCard.tsx`
Now features:
- Fetches prayer times from MyQuran API
- Shows current prayer time
- Shows next prayer time
- Handles edge cases (before Imsak, after Isya)
- Automatic city ID detection

---

## 🔧 How It Works

### Location Detection Flow:
```
1. Check localStorage cache (valid for 1 hour)
   ↓ (if cache expired or not found)
2. Try ipapi.co API (1000 requests/day free)
   ↓ (if fails)
3. Fallback to ip-api.com (free, unlimited)
   ↓
4. Cache result in localStorage
   ↓
5. Return city, country, lat/lon to components
```

### Weather Data Flow:
```
1. Get city from useUserLocation hook
   ↓
2. Call OpenWeatherMap API with city name
   ↓
3. Parse response (temp, condition, humidity, wind)
   ↓
4. Display with appropriate weather icon
```

### Prayer Times Flow:
```
1. Get city from useUserLocation hook
   ↓
2. Search MyQuran API for city ID
   ↓
3. Fetch today's prayer schedule using city ID
   ↓
4. Calculate current and next prayer based on time
   ↓
5. Display both prayer times
```

---

## 🐛 Troubleshooting

### "API key not configured" error
- Make sure `.env.local` exists in project root
- Check the variable name is exactly: `NEXT_PUBLIC_OPENWEATHER_API_KEY`
- Restart your dev server after adding the key

### Weather shows "Failed to fetch weather data"
- Wait 10-15 minutes after creating OpenWeatherMap account (API key activation)
- Check your API key is valid at https://home.openweathermap.org/api_keys
- Check browser console for specific error messages

### Prayer times show "City not found"
- This happens if your city is not in MyQuran database
- Try manually testing: https://api.myquran.com/v2/sholat/kota/cari/YOUR_CITY
- The API works best with Indonesian cities

### Location shows "Unknown"
- Check browser console for errors
- Your IP might be blocked by geolocation services
- Try clearing localStorage: `localStorage.clear()`
- Try accessing from different network

### Page shows "Loading..." forever
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab to see which API is failing
- Clear localStorage cache: `localStorage.removeItem('userLocation')`

---

## 📊 API Usage Limits

| Service | Free Tier Limit | Current Usage |
|---------|-----------------|---------------|
| **ipapi.co** | 1,000/day | 1 per user per hour (cached) |
| **ip-api.com** | 45/minute | Fallback only |
| **OpenWeatherMap** | 1,000/day, 60/min | 1 per page load |
| **MyQuran API** | Unlimited | 2 per page load |

**Caching Strategy:**
- Location is cached for 1 hour in localStorage
- Weather is fetched on every page load (real-time)
- Prayer times are fetched on every page load (real-time)

---

## 🔮 Future Improvements

### Suggested Weather APIs (if you want to switch):
- **Open-Meteo** - Unlimited free, no API key needed
- **WeatherAPI.com** - 1M calls/month free tier
- **BMKG** - Official Indonesian weather data

### Potential Features:
- [ ] Geolocation API button for exact location
- [ ] Manual city selection dropdown
- [ ] Weather forecast (3-day, 7-day)
- [ ] All prayer times display (expandable)
- [ ] Prayer time notifications
- [ ] Weather alerts/warnings
- [ ] Temperature unit toggle (°C / °F)

---

## 📝 Environment Variables Reference

```env
# Required
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key_here

# Optional (for future use)
# NEXT_PUBLIC_WEATHER_API_KEY=alternative_weather_api
# NEXT_PUBLIC_GOOGLE_MAPS_KEY=for_precise_geocoding
```

---

## 🆘 Need Help?

1. Check browser console (F12) for error messages
2. Verify API key is active and correct
3. Test APIs directly in browser:
   - Weather: `https://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=YOUR_KEY&units=metric`
   - Location: `https://ipapi.co/json/`
   - Prayer: `https://api.myquran.com/v2/sholat/kota/cari/jakarta`

4. Common issues:
   - **CORS errors**: Make sure you're using `NEXT_PUBLIC_` prefix for client-side env vars
   - **401 Unauthorized**: API key is invalid or not activated yet
   - **429 Too Many Requests**: You've hit rate limit, wait a bit
   - **City not found**: Try different city name or check MyQuran API directly

---

## ✅ Testing Checklist

- [ ] API key added to `.env.local`
- [ ] Dev server restarted
- [ ] WeatherCard shows your city name
- [ ] WeatherCard shows current temperature
- [ ] WeatherCard shows weather condition (e.g., "berawan")
- [ ] PrayerCard shows current prayer time
- [ ] PrayerCard shows next prayer time
- [ ] No errors in browser console
- [ ] Location caching works (check localStorage)

---

**Happy Coding! 🚀**