import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import topics from "../data/topics";
import Quotes from "../components/Quotes";
import NotFound from "./NotFound";

const QuotePage = () => {
  const { slug } = useParams();
  const topicData = topics.find((t) => t.slug === slug);

  if (!topicData) {
    return <NotFound />;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] p-4">
      <Card className="bg-neutral-900 text-gray-100 border border-neutral-700 shadow-2xl w-full max-w-3xl">
        <CardHeader className="text-center border-b border-neutral-800 pb-4">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            {topicData.name} Quote
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6 px-6 sm:px-8 md:px-10">
          <Quotes topic={topicData.slug} />
        </CardContent>
      </Card>
    </div>
  );
};

export default QuotePage;
