# Deployment Guide

## Environment Variables Setup

### Local Development (.env.local)
```bash
NEXT_PUBLIC_API_BASE_URL=https://api-sekian-info.onrender.com
NEXT_PUBLIC_WEATHERAPI_KEY=your_weather_api_key_here
```

### Vercel Deployment

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables in Vercel**
   - Go to your project settings
   - Navigate to "Settings" > "Environment Variables"
   - Add the following variables:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_API_BASE_URL` | `https://api-sekian-info.onrender.com` |
   | `NEXT_PUBLIC_WEATHERAPI_KEY` | Your WeatherAPI key |

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app
   - Your app will be live at `https://your-project.vercel.app`

## API Endpoints Used

All API calls now use the environment variable `NEXT_PUBLIC_API_BASE_URL`:

- `/api/cinema` - Cinema movies
- `/api/events` - Events
- `/api/sembako` - Grocery prices
- `/api/flights/arrivals` - Flight arrivals
- `/api/google_trend` - Google trends

## Fallback

If `NEXT_PUBLIC_API_BASE_URL` is not set, the app will fallback to `http://localhost:5500` for local development.

## Testing Before Deployment

1. Update `.env.local` with production API URL
2. Run `npm run build` to test production build
3. Run `npm start` to test production mode locally
4. Verify all cards load data correctly

## Troubleshooting

### API not loading
- Check if Render API is running: https://api-sekian-info.onrender.com
- Verify environment variables are set in Vercel
- Check browser console for CORS errors

### Build fails
- Run `npm run build` locally to see errors
- Check all imports and dependencies
- Verify all environment variables are set

## Post-Deployment

After deployment, test all features:
- [ ] Weather card loads
- [ ] News cards load
- [ ] Cinema card loads
- [ ] Events card loads
- [ ] Flight arrivals load
- [ ] Google trends load
- [ ] Sembako prices load
- [ ] Dark mode toggle works
- [ ] Mobile responsive
- [ ] All links work
