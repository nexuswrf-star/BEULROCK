import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Stats from "../components/landing/Stats";
import ConsoleOutput from "../components/landing/ConsoleOutput";
import InjectionProgress from "../components/landing/InjectionProgress";
import MiniChart from "../components/landing/MiniChart";
import Pricing from "../components/landing/Pricing";
import Testimonials from "../components/landing/Testimonials";
import Footer from "../components/landing/Footer";
import StatusIndicator from "../components/landing/StatusIndicator";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <StatusIndicator />
      <Navbar />
      <Hero />
      <Stats />
      {/* Showcase Tools */}
      <section className="py-16 border-b border-beulrock-border">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 md:grid-cols-2 items-start">
          <ConsoleOutput />
          <div className="flex flex-col gap-8">
            <InjectionProgress />
            <MiniChart />
          </div>
        </div>
      </section>
      <Pricing />
      <Testimonials />
      <Footer />
    </main>
  );
}