export interface SingleNewsItem {
  title: string;
  link: string;
  description: string;
  image?: string;
  pubDate: string;
}

export async function getSingleNews(rssUrl?: string): Promise<SingleNewsItem | null> {
  try {
    const url = rssUrl 
      ? `/api/single-news?url=${encodeURIComponent(rssUrl)}`
      : "/api/single-news";
    
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch news");
      return null;
    }

    const data = await response.json();
    
    if (data.error) {
      console.error("Error from API:", data.error);
      return null;
    }

    return {
      title: data.title,
      link: data.link,
      description: data.description,
      image: data.image,
      pubDate: data.pubDate,
    };
  } catch (error) {
    console.error("Error fetching single news:", error);
    return null;
  }
}
