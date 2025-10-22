import { Header } from "@/features/landing/components/header";
import { HeroSection } from "@/features/landing/components/hero-section";
import { FeaturesGrid } from "@/features/landing/components/features-grid";
import { Footer } from "@/features/landing/components/footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesGrid />
      </main>
      <Footer />
    </div>
  );
}
