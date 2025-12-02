'use server';

export interface CinemaItem {
    title: string;
    poster: string | null;
    cinema?: string;
    [key: string]: any;
}

export async function getCinema(): Promise<CinemaItem[]> {
    try {
        const response = await fetch('http://localhost:5500/api/cinema', {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch cinema data: ${response.statusText}`);
        }

        const data = await response.json();

        // Handle different response structures
        // If data is already an array, return it
        if (Array.isArray(data)) {
            return data.map(item => ({
                title: item.title || '',
                poster: item.img || item.poster || null,
                cinema: item.cinema || '',
            }));
        }

        // If data has a nested array property (common API pattern)
        if (data && typeof data === 'object') {
            // Try common property names for arrays
            const possibleArrayKeys = ['items', 'data', 'results', 'cinemas', 'movies'];
            for (const key of possibleArrayKeys) {
                if (Array.isArray(data[key])) {
                    return data[key].map((item: any) => ({
                        title: item.title || '',
                        poster: item.img || item.poster || null,
                        cinema: item.cinema || '',
                    }));
                }
            }
        }

        // If we still don't have an array, log the structure and return empty
        console.error('Unexpected API response structure:', data);
        return [];
    } catch (error) {
        console.error('Error fetching cinema data:', error);
        return [];
    }
}
