'use client';

import { useState, useEffect } from 'react';

interface LocationData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  loading: boolean;
  error: string | null;
}

export function useUserLocation() {
  const [location, setLocation] = useState<LocationData>({
    city: '',
    country: '',
    latitude: 0,
    longitude: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchLocation() {
      // Check if we have cached location in localStorage
      const cached = localStorage.getItem('userLocation');
      const cacheTime = localStorage.getItem('userLocationTime');

      // Use cache if it's less than 1 hour old
      if (cached && cacheTime) {
        const age = Date.now() - parseInt(cacheTime);
        if (age < 3600000) { // 1 hour in milliseconds
          setLocation({ ...JSON.parse(cached), loading: false, error: null });
          return;
        }
      }

      try {
        // Try ipapi.co first (1000 requests per day free)
        const response = await fetch('https://ipapi.co/json/');

        if (!response.ok) {
          throw new Error('ipapi.co failed');
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.reason || 'IP geolocation failed');
        }

        const locationData = {
          city: data.city || 'Unknown',
          country: data.country_name || 'Unknown',
          latitude: data.latitude || 0,
          longitude: data.longitude || 0,
          loading: false,
          error: null,
        };

        // Cache the result
        localStorage.setItem('userLocation', JSON.stringify({
          city: locationData.city,
          country: locationData.country,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        }));
        localStorage.setItem('userLocationTime', Date.now().toString());

        setLocation(locationData);
      } catch (error) {
        console.error('IP geolocation error:', error);

        // Fallback to ip-api.com
        try {
          const response = await fetch('http://ip-api.com/json/');
          const data = await response.json();

          if (data.status === 'fail') {
            throw new Error(data.message);
          }

          const locationData = {
            city: data.city || 'Unknown',
            country: data.country || 'Unknown',
            latitude: data.lat || 0,
            longitude: data.lon || 0,
            loading: false,
            error: null,
          };

          // Cache the result
          localStorage.setItem('userLocation', JSON.stringify({
            city: locationData.city,
            country: locationData.country,
            latitude: locationData.latitude,
            longitude: locationData.longitude,
          }));
          localStorage.setItem('userLocationTime', Date.now().toString());

          setLocation(locationData);
        } catch (fallbackError) {
          console.error('Fallback geolocation error:', fallbackError);
          setLocation({
            city: 'Unknown',
            country: 'Unknown',
            latitude: 0,
            longitude: 0,
            loading: false,
            error: 'Failed to detect location',
          });
        }
      }
    }

    fetchLocation();
  }, []);

  return location;
}
