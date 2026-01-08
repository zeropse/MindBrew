import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import topics
import topics from "./src/data/topics.js";

async function removeDuplicateQuotes() {
  const dataDir = path.join(__dirname, "src", "data");
  const duplicatesFound = [];

  console.log("Starting duplicate quote removal process...\n");

  // Process each topic
  for (const topic of topics) {
    if (topic.slug === "random") continue; // Skip random as it might be generated

    const filePath = path.join(dataDir, `${topic.slug}.json`);

    try {
      // Read the JSON file
      const fileContent = fs.readFileSync(filePath, "utf8");
      const quotes = JSON.parse(fileContent);

      console.log(`Processing ${topic.name} (${quotes.length} quotes)...`);

      // Filter out duplicates within this topic only
      const seenQuotes = new Map(); // Reset for each topic
      const uniqueQuotes = [];
      const topicDuplicates = [];

      for (const quote of quotes) {
        const quoteKey = quote.quote.toLowerCase().trim(); // Case-insensitive comparison

        if (!seenQuotes.has(quoteKey)) {
          seenQuotes.set(quoteKey, quote);
          uniqueQuotes.push(quote);
        } else {
          topicDuplicates.push({
            quote: quote.quote,
            author: quote.author,
            duplicateOf: seenQuotes.get(quoteKey),
          });
        }
      }

      if (topicDuplicates.length > 0) {
        console.log(
          `  Found ${topicDuplicates.length} duplicates in ${topic.name}`
        );
        duplicatesFound.push(...topicDuplicates);
      }

      // Write back the cleaned quotes
      fs.writeFileSync(filePath, JSON.stringify(uniqueQuotes, null, 2));
      console.log(`  Kept ${uniqueQuotes.length} unique quotes\n`);
    } catch (error) {
      console.error(`Error processing ${topic.name}:`, error.message);
    }
  }

  // Summary
  console.log("\n=== SUMMARY ===");
  console.log(`Total duplicates removed: ${duplicatesFound.length}`);

  if (duplicatesFound.length > 0) {
    console.log("\nDuplicate quotes found:");
    duplicatesFound.forEach((dup, index) => {
      console.log(`${index + 1}. "${dup.quote}" by ${dup.author}`);
      console.log(
        `   Duplicate of: "${dup.duplicateOf.quote}" by ${dup.duplicateOf.author}\n`
      );
    });
  } else {
    console.log("No duplicates found!");
  }
}

// Run the script
removeDuplicateQuotes().catch(console.error);
