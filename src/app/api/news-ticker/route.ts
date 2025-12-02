import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const rssUrl = searchParams.get("url") || "https://feeds.bbci.co.uk/news/world/rss.xml";

        const response = await fetch(rssUrl, {
            cache: "no-store",
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; NewsBot/1.0)",
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch RSS feed" },
                { status: 500 }
            );
        }

        const xmlText = await response.text();

        // Simple regex parsing for multiple items
        const items = [];
        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        let match;

        while ((match = itemRegex.exec(xmlText)) !== null) {
            const itemContent = match[1];
            const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || itemContent.match(/<title>(.*?)<\/title>/);
            const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);

            if (titleMatch && linkMatch) {
                items.push({
                    title: titleMatch[1],
                    link: linkMatch[1],
                });
            }

            if (items.length >= 10) break; // Limit to 10 items
        }

        return NextResponse.json({ items });
    } catch (error) {
        console.error("Error fetching RSS:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
