# Deployment Guide

## Environment Variables Setup

### Local Development (.env.local)
```bash
NEXT_PUBLIC_API_BASE_URL=https://api-sekian-info.onrender.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WEATHERAPI_KEY=your_weather_api_key_here
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
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

   | Name | Value | Required |
   |------|-------|----------|
   | `NEXT_PUBLIC_API_BASE_URL` | `https://api-sekian-info.onrender.com` | ✅ Yes |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` | ✅ Yes |
   | `NEXT_PUBLIC_WEATHERAPI_KEY` | Your WeatherAPI key | ✅ Yes |
   | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | ⚠️ Optional |
   | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Your verification code | ⚠️ Optional |

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app
   - Your app will be live at `https://your-project.vercel.app`

## SEO Setup

### Google Analytics GA4

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
4. Add it to Vercel environment variables as `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property
3. Get verification code
4. Add it to Vercel environment variables as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

### Open Graph Image

- Create an image `public/og-image.png` (1200x630px)
- This will be used for social media previews (Facebook, Twitter, LinkedIn)
- Recommended: Use your logo and site name

### Meta Tags Included

✅ Open Graph (Facebook, LinkedIn)
✅ Twitter Cards
✅ Meta Description
✅ Meta Keywords
✅ Canonical URLs
✅ Robots meta tags
✅ Favicon (multiple sizes)
✅ Apple Touch Icon

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
