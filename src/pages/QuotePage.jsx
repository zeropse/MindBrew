import { Navigate, useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconRefresh,
  IconQuote,
  IconArrowLeft,
  IconShare,
  IconCopy,
} from "@tabler/icons-react";
import topics from "@/data/topics";
import { getQuoteByTopic, getRandomQuote } from "@/lib/quoteUtils";

export default function QuotePage() {
  const { slug } = useParams();
  const topicData = topics.find((t) => t.slug === slug);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(null);
  const previousQuoteRef = useRef(null);

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
      setTimeout(() => setLoading(false), 600);
    }
  }, [slug]);

  useEffect(() => {
    previousQuoteRef.current = null;
  }, [slug]);

  useEffect(() => {
    if (topicData) {
      document.title = `${topicData.name} ~ MindBrew`;
      fetchNewQuote();
    }
  }, [topicData, fetchNewQuote]);

  if (!topicData) return <Navigate to="/404" replace />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="rounded-full hover:bg-primary/5 group"
          >
            <Link to="/inspirations" className="gap-2">
              <IconArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="hidden sm:inline">Back to Topics</span>
            </Link>
          </Button>

          <Badge
            variant="secondary"
            className="px-4 py-1.5 rounded-full uppercase tracking-widest font-bold"
          >
            {topicData.name}
          </Badge>
        </div>

        <Card>
          <CardContent className="px-8 md:px-14 py-12 min-h-100 flex flex-col items-center justify-center text-center">
            {loading ? (
              <div className="flex flex-col items-center gap-6">
                <IconQuote className="h-12 w-12 text-primary/20 animate-bounce" />
                <p className="text-sm font-medium text-muted-foreground animate-pulse">
                  Brewing your inspiration...
                </p>
              </div>
            ) : (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl md:text-5xl font-serif leading-[1.2] text-foreground tracking-tight italic">
                  “{quote.quote}”
                </h2>
                <div className="flex flex-col items-center">
                  <p className="text-xl font-bold tracking-wide uppercase text-primary/50">
                    {quote.author}
                  </p>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center p-3">
            <Button
              onClick={fetchNewQuote}
              disabled={loading}
              size="lg"
              className="h-12 px-8 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all cursor-pointer w-full sm:w-auto"
            >
              <IconRefresh
                className={`h-5 w-5 ${loading ? "animate-spin" : ""}`}
              />
              New Quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 rounded-full cursor-pointer font-semibold hover:scale-105 transition-all w-full sm:w-auto"
            >
              <IconShare className="h-5 w-5" />
              Share
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
