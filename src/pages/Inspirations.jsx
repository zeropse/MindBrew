import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect } from "react";

// Sample topics - replace with actual data
const topics = [
  { name: "Motivation", slug: "motivation" },
  { name: "Love", slug: "love" },
  { name: "Success", slug: "success" },
  { name: "Happiness", slug: "happiness" },
  { name: "Leadership", slug: "leadership" },
  { name: "Perseverance", slug: "perseverance" },
  { name: "Self-Improvement", slug: "self-improvement" },
  { name: "Focus", slug: "focus" },
];

const Inspirations = () => {
  useEffect(() => {
    document.title = "Inspirations ~ MindBrew";
  }, []);

  return (
    <div className="flex items-center justify-center p-4 min-h-screen">
      <Card className="w-full max-w-5xl p-6 sm:p-8">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center">
            What are you seeking inspiration for today?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((t) => (
              <Link key={t.slug} to={`/inspiration/${t.slug}`}>
                <Button
                  variant="outline"
                  className="w-full p-6 cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  {t.name}
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inspirations;
