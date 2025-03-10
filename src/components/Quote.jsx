import Card from "./ui/card";
import { useState } from "react";

const Quote = ({ quote }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="bg-neutral-900 text-gray-100 border border-neutral-700 shadow-2xl w-full max-w-5xl p-6 sm:p-8 md:p-10 lg:p-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center">
          {quote.topic}
        </h2>
        <button
          onClick={toggleExpand}
          className="p-2 sm:p-2 md:p-2 cursor-pointer"
        >
          {isExpanded ? "Hide" : "Show"}
        </button>
      </div>
      <div className="text-black">
        {isExpanded ? quote.quote : quote.quote.slice(0, 100) + "..."}
      </div>
    </Card>
  );
};

export default Quote;
