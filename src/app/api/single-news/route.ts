import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rssUrl = searchParams.get("url") || "https://www.cnbcindonesia.com/market/rss";
    
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

    // Parse XML manually (simple parsing for RSS)
    const titleMatch = xmlText.match(/<item>[\s\S]*?<title><!\[CDATA\[(.*?)\]\]><\/title>/);
    const linkMatch = xmlText.match(/<item>[\s\S]*?<link>(.*?)<\/link>/);
    const descMatch = xmlText.match(/<item>[\s\S]*?<description><!\[CDATA\[(.*?)\]\]><\/description>/);
    const pubDateMatch = xmlText.match(/<item>[\s\S]*?<pubDate>(.*?)<\/pubDate>/);
    
    // Try multiple ways to extract image
    let image = "";
    
    // Try enclosure tag
    const enclosureMatch = xmlText.match(/<item>[\s\S]*?<enclosure[^>]+url="([^"]+)"/);
    if (enclosureMatch) {
      image = enclosureMatch[1];
    }
    
    // Try media:content or media:thumbnail
    if (!image) {
      const mediaContentMatch = xmlText.match(/<item>[\s\S]*?<media:content[^>]+url="([^"]+)"/);
      if (mediaContentMatch) {
        image = mediaContentMatch[1];
      }
    }
    
    if (!image) {
      const mediaThumbnailMatch = xmlText.match(/<item>[\s\S]*?<media:thumbnail[^>]+url="([^"]+)"/);
      if (mediaThumbnailMatch) {
        image = mediaThumbnailMatch[1];
      }
    }
    
    // Try to extract from description
    if (!image && descMatch) {
      const imgMatch = descMatch[1].match(/<img[^>]+src="([^"]+)"/);
      if (imgMatch) {
        image = imgMatch[1];
      }
    }

    if (!titleMatch || !linkMatch) {
      return NextResponse.json(
        { error: "Failed to parse RSS feed" },
        { status: 500 }
      );
    }

    const title = titleMatch[1];
    const link = linkMatch[1];
    const description = descMatch ? descMatch[1].replace(/<[^>]*>/g, "").substring(0, 150) + "..." : "";
    const pubDate = pubDateMatch ? pubDateMatch[1] : "";

    return NextResponse.json({
      title,
      link,
      description,
      image,
      pubDate,
    });
  } catch (error) {
    console.error("Error fetching RSS:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
