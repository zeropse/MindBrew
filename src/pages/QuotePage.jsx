import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import topics from "@/data/topics";
import Quotes from "@/components/Quotes";
import { useEffect } from "react";

const QuotePage = () => {
  const { slug } = useParams();
  const topicData = topics.find((t) => t.slug === slug);

  useEffect(() => {
    if (topicData) {
      document.title = `${topicData.name} ~ MindBrew`;
    }
  }, [topicData]);

  if (!topicData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center">
          <CardTitle>Topic Not Found</CardTitle>
          <p className="text-muted-foreground mt-2">
            The requested inspiration topic doesn't exist.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            {topicData.name} Quote
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Quotes topic={topicData.slug} />
        </CardContent>
      </Card>
    </div>
  );
};

export default QuotePage;
