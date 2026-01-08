import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconCoffee,
  IconTargetArrow,
  IconShare,
  IconSparkles,
  IconBook,
  IconArrowRight,
} from "@tabler/icons-react";
import CTA from "@/components/CTA";

export default function Landing() {
  useEffect(() => {
    document.title = "MindBrew | Motivate Your Life";
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const steps = [
    {
      icon: IconTargetArrow,
      title: "Choose Your Topic",
      description:
        "Select from categories like success, mindfulness, or resilience to find quotes that resonate with your current path.",
    },
    {
      icon: IconCoffee,
      title: "Get Curated Quotes",
      description:
        "Receive high-quality, hand-picked insights designed to uplift and provide a fresh perspective on your day.",
    },
    {
      icon: IconShare,
      title: "Share & Reflect",
      description:
        "Save your favorites for daily reflection or share them with your community to spread the positive energy.",
    },
  ];

  return (
    <div>
      <section className="relative overflow-hidden px-4 py-26">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <Badge className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-8 hover:bg-primary/20 transition-colors">
            <IconSparkles size={16} />
            Your daily dose of mental clarity
          </Badge>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95] text-foreground">
            Brew Your Mind with <br className="hidden sm:block" />
            <span>Inspiring Quotes</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
            Discover hand-picked quotes that ignite your passion and fuel your
            journey toward success and fulfillment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              asChild
              className="h-14 px-10 text-lg font-bold group shadow-xl shadow-primary/15 cursor-pointer"
            >
              <Link to="/inspirations" className="flex items-center gap-2">
                Get Inspired Now
                <IconArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="h-14 px-10 text-lg font-semibold cursor-pointer"
              onClick={() => scrollToSection("how-it-works")}
            >
              <IconBook size={20} />
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-26 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Three simple steps to a more motivated you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardHeader className="flex flex-col items-center text-center pt-3">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground mb-2">
                    <step.icon size={32} />
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  {step.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
