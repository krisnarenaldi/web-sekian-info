'use server';

import Parser from 'rss-parser';

const parser = new Parser({
    customFields: {
        item: [
            ['media:content', 'mediaContent'],
            ['enclosure', 'enclosure'],
            ['content:encoded', 'contentEncoded'],
            ['description', 'description'],
        ],
    },
});

export interface NewsItem {
    title: string;
    link: string;
    image: string | null;
    source: string;
    pubDate: string;
}

export async function getNews(sourceUrl: string, sourceName: string): Promise<NewsItem[]> {
    try {
        const feed = await parser.parseURL(sourceUrl);

        return feed.items.slice(0, 5).map((item) => {
            let image = null;

            // Try to find image in various RSS fields
            if (item.mediaContent && item.mediaContent.$ && item.mediaContent.$.url) {
                image = item.mediaContent.$.url;
            } else if (item.enclosure && item.enclosure.url && item.enclosure.type?.startsWith('image')) {
                image = item.enclosure.url;
            } else if (item.contentEncoded) {
                const match = item.contentEncoded.match(/<img[^>]+src="([^">]+)"/);
                if (match) image = match[1];
            } else if (item.description) {
                const match = item.description.match(/<img[^>]+src="([^">]+)"/);
                if (match) image = match[1];
            }

            return {
                title: item.title || 'No Title',
                link: item.link || '#',
                image,
                source: sourceName,
                pubDate: item.pubDate || '',
            };
        });
    } catch (error) {
        console.error(`Error fetching RSS from ${sourceName}:`, error);
        return [];
    }
}
