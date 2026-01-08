import { Link } from "react-router-dom";
import { useEffect } from "react";
import topics from "@/data/topics";
import { IconSparkles } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Inspirations() {
  useEffect(() => {
    document.title = "Inspirations ~ MindBrew";
  }, []);

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-8 hover:bg-primary/20 transition-colors">
            <IconSparkles size={14} />
            Explore Topics
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            What are you seeking inspiration for today?
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((t) => (
            <Link
              key={t.slug}
              to={`/inspirations/${t.slug}`}
              className="group relative"
            >
              <Card className="relative h-full rounded-2xl hover:bg-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 group">
                <CardHeader>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {t.name}
                  </CardTitle>
                  <CardDescription>
                    Explore wisdom and insights about {t.name.toLowerCase()}.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
