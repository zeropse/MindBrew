import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import quotes from "../data/quotes.json";
import QuoteSharer from "./QuoteSharer";

const Quotes = ({ topic }) => {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(null);
  const [previousQuote, setPreviousQuote] = useState(null);

  const getRandomQuote = () => {
    setLoading(true);

    setTimeout(() => {
      let availableQuotes = [];

      if (topic === "random") {
        quotes.forEach((topicObj) => {
          topicObj.quotes.forEach((quoteObj) => {
            availableQuotes.push({
              quote: quoteObj.quote,
              author: quoteObj.author,
              topic: topicObj.topic,
            });
          });
        });
      } else {
        const topicObj = quotes.find(
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

        setQuote(selectedQuote);
        setPreviousQuote(selectedQuote);
      } else {
        setQuote(null);
      }

      setLoading(false);
    }, 750);
  };

  useEffect(() => {
    getRandomQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  const handleGetAnotherQuote = () => {
    getRandomQuote();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <div className="h-12 w-12 rounded-full border-4 border-gray-400 border-t-gray-100 animate-spin"></div>
        <p className="mt-4 text-gray-400">Loading inspiration...</p>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="text-center min-h-[200px] flex flex-col items-center justify-center py-6">
        <p className="text-lg sm:text-xl font-medium mb-6 text-gray-200">
          No quotes found for this topic.
        </p>
        <Link to="/inspiration" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="text-black border-gray-500 hover:bg-gray-500 hover:text-white w-full cursor-pointer"
          >
            Change Topic
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center min-h-[200px] flex flex-col items-center justify-center py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-medium mb-6 italic text-gray-100">
        "{quote.quote}"
      </p>
      <p className="text-gray-400">— {quote.author}</p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full justify-center">
        <Link to="/inspiration" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="text-black border-gray-500 hover:bg-gray-500 hover:text-white w-full cursor-pointer"
          >
            Change Topic
          </Button>
        </Link>

        <QuoteSharer quote={quote.quote} author={quote.author} />

        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto cursor-pointer"
          onClick={handleGetAnotherQuote}
        >
          Get Another Quote
        </Button>
      </div>
    </div>
  );
};

export default Quotes;
