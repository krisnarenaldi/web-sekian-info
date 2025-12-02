import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MasonryGrid from "@/components/MasonryGrid";
import WeatherCard from "@/components/cards/WeatherCard";
import PrayerCard from "@/components/cards/PrayerCard";
import NewsCard from "@/components/cards/NewsCard";
import GoldCard from "@/components/cards/GoldCard";
import ExchangeRateCard from "@/components/cards/ExchangeRateCard";
import EarthquakeCard from "@/components/cards/EarthquakeCard";
import SembakoCard from "@/components/cards/SembakoCard";
import WorldClockCard from "@/components/cards/WorldClockCard";
import GoogleTrendCard from "@/components/cards/GoogleTrendCard";
import FlightArrivalsCard from "@/components/cards/FlightArrivalsCard";
import CinemaCard from "@/components/cards/CinemaCard";
import EventCard from "@/components/cards/EventCard";
import SingleNewsCard from "@/components/cards/SingleNewsCard";
import AnimeCard from "@/components/cards/AnimeCard";
import { AboutMeCard } from "@/components/cards/MiscCards";

export default function Home() {
  return (
    <>
      <main className="container">
        <Header />
        <MasonryGrid>
          <WeatherCard />
          <NewsCard className="span-3" />
          <PrayerCard />
          <WorldClockCard className="span-2" />
          <EarthquakeCard />
          <EventCard className="span-2" />
          <CinemaCard className="span-2" />

          <GoldCard />
          <ExchangeRateCard />
          <SembakoCard className="span-2" />

          <SingleNewsCard />
          <FlightArrivalsCard className="span-2" />

          <AnimeCard />

          <GoogleTrendCard className="span-2" />



          <SingleNewsCard
            title="Berita Olah Raga"
            rssUrl="https://sport.detik.com/rss"
          />
          <AboutMeCard />
          {/* 
          
          
          
          Duplicating some cards to fill the grid as per typical masonry demo */}
        </MasonryGrid>
      </main>
      <Footer />
    </>
  );
}
