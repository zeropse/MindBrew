import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import quotesData from "@/data/quotes.json";

const Quotes = ({ topic }) => {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(null);
  const [previousQuote, setPreviousQuote] = useState(null);

  const getRandomQuote = () => {
    setLoading(true);

    setTimeout(() => {
      let availableQuotes = [];

      if (topic === "random") {
        quotesData.forEach((topicObj) => {
          topicObj.quotes.forEach((quoteObj) => {
            availableQuotes.push({
              quote: quoteObj.quote,
              author: quoteObj.author,
              topic: topicObj.topic,
            });
          });
        });
      } else {
        const topicObj = quotesData.find(
          (q) => q.topic.toLowerCase() === topic.toLowerCase()
        );
        if (topicObj && topicObj.quotes) {
          availableQuotes = topicObj.quotes.map((q) => ({
            quote: q.quote,
            author: q.author,
            topic: topicObj.topic,
          }));
        }
      }

      if (availableQuotes.length > 0) {
        let randomIndex = Math.floor(Math.random() * availableQuotes.length);
        let selectedQuote = availableQuotes[randomIndex];

        if (
          previousQuote &&
          availableQuotes.length > 1 &&
          selectedQuote.quote === previousQuote.quote
        ) {
          randomIndex = (randomIndex + 1) % availableQuotes.length;
          selectedQuote = availableQuotes[randomIndex];
        }

        setPreviousQuote(selectedQuote);
        setQuote(selectedQuote);
      } else {
        setQuote(null);
      }

      setLoading(false);
    }, 500); // Simulate loading
  };

  useEffect(() => {
    getRandomQuote();
  }, [topic]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Brewing your inspiration...</p>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No quotes available for this topic.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/inspirations">Choose Another Topic</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <blockquote className="text-lg md:text-xl italic text-foreground">
        "{quote.quote}"
      </blockquote>
      <p className="text-muted-foreground">- {quote.author}</p>
      <div className="flex gap-4 justify-center">
        <Button onClick={getRandomQuote} variant="outline">
          Get Another Quote
        </Button>
        <Button asChild variant="outline">
          <Link to="/inspirations">Change Topic</Link>
        </Button>
      </div>
    </div>
  );
};

export default Quotes;
