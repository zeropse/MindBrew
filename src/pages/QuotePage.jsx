import { Navigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import topics from "@/data/topics";
import { useEffect, useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getQuoteByTopic, getRandomQuote } from "@/lib/quoteUtils";

const QuotePage = () => {
  const { slug } = useParams();
  const topicData = topics.find((t) => t.slug === slug);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(null);
  const previousQuoteRef = useRef(null);

  useEffect(() => {
    previousQuoteRef.current = null;
  }, [slug]);

  const fetchNewQuote = useCallback(async () => {
    setLoading(true);
    try {
      const selectedQuote =
        slug === "random"
          ? await getRandomQuote(previousQuoteRef.current)
          : await getQuoteByTopic(slug, previousQuoteRef.current);

      setQuote(selectedQuote);
      previousQuoteRef.current = selectedQuote;
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (topicData) {
      document.title = `${topicData.name} ~ MindBrew`;
      fetchNewQuote();
    }
  }, [topicData, fetchNewQuote]);

  if (!topicData) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            {topicData.name} Quote
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Brewing your inspiration...
              </p>
            </div>
          ) : !quote ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No quotes available for this topic.
              </p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/inspirations">Choose Another Topic</Link>
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <blockquote className="text-lg md:text-xl italic text-foreground">
                "{quote.quote}"
              </blockquote>
              <p className="text-muted-foreground">- {quote.author}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-4 justify-center border-t">
          <Button onClick={fetchNewQuote} variant="outline">
            Get Another Quote
          </Button>
          <Button asChild variant="outline">
            <Link to="/inspirations">Change Topic</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuotePage;
