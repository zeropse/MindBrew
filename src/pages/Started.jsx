import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Started = () => {
  const topics = [
    "Motivation",
    "Success",
    "Happiness",
    "Love",
    "Perseverance",
    "Focus",
    "Leadership",
    "Self-Improvement",
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-black">
      <Card className="bg-neutral-900 text-gray-100 border border-neutral-700 shadow-2xl w-full max-w-5xl p-6 sm:p-8 md:p-10 lg:p-12">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center">
            Choose Your Topic
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
            {topics.map((topic) => (
              <Button
                key={topic}
                variant="outline"
                className="w-full p-7 sm:p-7 md:p-7 cursor-pointer border border-gray-500 hover:bg-gray-500 hover:text-white hover:scale-105 transition-transform duration-300"
              >
                {topic}
              </Button>
            ))}
            <div className="col-span-1 sm:col-span-2 flex justify-center">
              <Button
                variant="outline"
                className="w-3/4 sm:w-1/2 p-7 sm:p-7 md:p-7 cursor-pointer border border-gray-500 hover:bg-gray-500 hover:text-white hover:scale-105 transition-transform duration-300"
              >
                Random
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Started;
