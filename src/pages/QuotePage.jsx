import { Navigate, useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { IconQuote, IconArrowLeft, IconShare } from "@tabler/icons-react";
import topics from "@/data/topics";
import { getQuoteByTopic, getRandomQuote } from "@/lib/quoteUtils";
import { shareAsImage } from "@/lib/sharing";

export default function QuotePage() {
  const { slug } = useParams();
  const topicData = topics.find((t) => t.slug === slug);
  const [loading, setLoading] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [quote, setQuote] = useState(null);
  const previousQuoteRef = useRef(null);
  const cardRef = useRef(null);

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
      document.title = `${topicData.name} | MindBrew`;
      fetchNewQuote();
    }
  }, [topicData, fetchNewQuote]);

  const handleShare = async () => {
    if (isSharing || !cardRef.current || !quote) return;
    const d = new Date();

    setIsSharing(true);
    try {
      await shareAsImage(
        cardRef.current,
        `mindbrew-${slug}-${String(d.getDate()).padStart(2, "0")}${String(
          d.getMonth() + 1
        ).padStart(2, "0")}${d.getFullYear()}.png`
      );
    } catch (error) {
      console.error("Failed to share:", error);
    } finally {
      setIsSharing(false);
    }
  };

  if (!topicData) return <Navigate to="/404" replace />;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 mb-12 sm:mb-0">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6 gap-4">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full group"
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
            className="px-4 py-1.5 rounded-full uppercase tracking-widest font-bold whitespace-nowrap"
          >
            {topicData.name}
          </Badge>
        </div>

        <Card className="sm:shadow-xl shadow-sm border sm:border-muted">
          <div className="rounded-t-xl overflow-hidden">
            <CardContent
              ref={cardRef}
              className="px-6 sm:px-10 md:px-14 py-12 sm:py-20 min-h-87.5 sm:min-h-112.5 flex flex-col items-center justify-center text-center bg-card"
            >
              {loading ? (
                <div className="flex flex-col items-center gap-6">
                  <IconQuote className="h-12 w-12 text-primary/20 animate-bounce" />
                  <p className="text-sm font-medium text-muted-foreground animate-pulse">
                    Brewing your inspiration...
                  </p>
                </div>
              ) : (
                <div className="space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif leading-tight text-foreground tracking-tight italic">
                    “{quote.quote}”
                  </h2>
                  <div className="flex flex-col items-center">
                    <div className="h-1 w-12 bg-primary/20 mb-6 rounded-full" />
                    <p className="text-base sm:text-lg md:text-xl font-bold tracking-widest uppercase text-primary/50 px-4">
                      {quote.author}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </div>

          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center p-6 sm:p-10">
            <Button
              onClick={fetchNewQuote}
              disabled={loading}
              size="lg"
              className="h-12 px-8 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer w-full sm:w-auto"
            >
              {loading && <Spinner className="h-5 w-5" />}
              New Quote
            </Button>
            <Button
              onClick={handleShare}
              disabled={loading || isSharing}
              variant="outline"
              size="lg"
              className="h-12 px-8 rounded-full cursor-pointer font-semibold hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
            >
              {isSharing ? (
                <Spinner className="h-5 w-5" />
              ) : (
                <IconShare className="h-5 w-5" />
              )}
              {isSharing ? "Sharing..." : "Share"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
