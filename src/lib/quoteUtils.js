import topics from "@/data/topics";

// cache to store loaded quotes by topic
const quoteCache = {};

// Gets a random quote from a specific topic.
export const getQuoteByTopic = async (topic, previousQuote = null) => {
  try {
    // Return from cache if topic already loaded
    if (!quoteCache[topic]) {
      const module = await import(`@/data/${topic}.json`);

      if (!module || !module.default) {
        throw new Error(`Invalid data structure in ${topic}.json`);
      }

      quoteCache[topic] = module.default.map((q) => ({
        quote: q.quote,
        author: q.author,
        topic: topic,
      }));
    }

    const availableQuotes = quoteCache[topic];

    if (availableQuotes.length === 0) return null;

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

    return selectedQuote;
  } catch (error) {
    console.error(`Error loading ${topic}.json:`, error);
    return null;
  }
};

// Gets a random quote from any available topic.
export const getRandomQuote = async (previousQuote = null) => {
  const topicSlugs = topics
    .filter((t) => t.slug !== "random")
    .map((t) => t.slug);

  if (topicSlugs.length === 0) return null;

  // Pick a random topic first to avoid loading all JSON files
  const randomTopic = topicSlugs[Math.floor(Math.random() * topicSlugs.length)];
  return await getQuoteByTopic(randomTopic, previousQuote);
};
