import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const RootLayout = () => {
  return (
    <div className="bg-black relative">
      <StarsBackground
        allStarsTwinkle={true}
        starDensity={0.001}
        minTwinkleSpeed={0.5}
        maxTwinkleSpeed={1}
        className="z-0"
      />
      <ShootingStars minDelay={800} maxDelay={2200} className="z-0" />
      <Header className="z-10 relative" />
      <main className="flex-grow z-10 relative">
        <Outlet />
      </main>
      <Footer className="z-10 relative" />
    </div>
  );
};

export default RootLayout;
