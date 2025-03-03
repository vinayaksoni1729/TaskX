import Hero1 from "./components/Hero";
import Features1 from "./components/Features";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import DashboardPreview1 from "./components/Dashboard";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero1 />
      <Features1 />
      <DashboardPreview1 />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
}