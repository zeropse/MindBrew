import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import topics from "@/data/topics";
import { useEffect } from "react";

const Inspirations = () => {
  useEffect(() => {
    document.title = "Inspirations ~ MindBrew";
  }, []);

  return (
    <div className="flex items-center justify-center p-4 h-screen">
      <Card className="bg-neutral-900 text-gray-100 border border-neutral-700 shadow-2xl w-full max-w-5xl p-6 sm:p-8 md:p-10 lg:p-12">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center">
            What are you seeking inspiration for today?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 text-black">
            {topics.map((t) => (
              <Link key={t.slug} to={`/inspiration/${t.slug}`}>
                <Button
                  variant="outline"
                  className="w-full p-6 lg:p-7 cursor-pointer border border-gray-500 hover:bg-gray-500 hover:text-white hover:scale-105 transition-transform duration-300"
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
