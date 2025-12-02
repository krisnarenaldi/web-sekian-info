export interface NewsTickerItem {
    title: string;
    link: string;
}

export async function getNewsTicker(rssUrl?: string): Promise<NewsTickerItem[]> {
    try {
        const url = rssUrl
            ? `/api/news-ticker?url=${encodeURIComponent(rssUrl)}`
            : "/api/news-ticker";

        const response = await fetch(url, {
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("Failed to fetch news ticker");
            return [];
        }

        const data = await response.json();

        if (data.error) {
            console.error("Error from API:", data.error);
            return [];
        }

        return data.items || [];
    } catch (error) {
        console.error("Error fetching news ticker:", error);
        return [];
    }
}
