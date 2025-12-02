export interface EventItem {
    event_title: string;
    poster: string;
}

interface EventsResponse {
    cache_date: string;
    from_cache: boolean;
    items: EventItem[];
}

export async function getEvents(): Promise<EventItem[]> {
    try {
        const response = await fetch("http://localhost:5500/api/events", {
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("Failed to fetch events:", response.statusText);
            return [];
        }

        const data: EventsResponse = await response.json();
        return Array.isArray(data.items) ? data.items : [];
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}
