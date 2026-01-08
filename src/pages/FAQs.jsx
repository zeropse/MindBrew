import CTA from "@/components/CTA";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";

export default function FAQsFour() {
  useEffect(() => {
    document.title = "FAQs | MindBrew";
  }, []);

  const faqItems = [
    {
      id: "item-1",
      question: "What exactly is MindBrew?",
      answer:
        "MindBrew is a curated platform for inspirational quotes and insights. We focus on categories like success, mindfulness, and resilience to help you start your day with the right mindset.",
    },
    {
      id: "item-2",
      question: "How can I share these quotes?",
      answer:
        "You can share any quote directly via social media using our sharing tools, or download them as beautifully formatted images to post wherever you'd like.",
    },
    {
      id: "item-3",
      question: "Is there a cost to use MindBrew?",
      answer:
        "No, MindBrew is completely free. Our goal is to make inspiration and positive thinking accessible to everyone.",
    },
    {
      id: "item-4",
      question: "Do I need to create an account?",
      answer:
        "No account is required! You can browse, read, and share quotes instantly without any signup process.",
    },
    {
      id: "item-5",
      question: "How do the different categories work?",
      answer:
        "We organize quotes into specific themes like 'Motivation', 'Success' or 'Focus'. Simply click on a category to see hand-picked quotes tailored to that specific area of life.",
    },
    {
      id: "item-6",
      question: "Can I save my favorite quotes for later?",
      answer:
        "Currently, you can download quotes as images or share them to your social profiles. We may add a favorites feature in the future.",
    },
    {
      id: "item-7",
      question: "Can I suggest a quote or author?",
      answer:
        "We welcome suggestions! If you have a powerful quote or an author you'd like to see featured, please reach out to us via github.",
    },
    {
      id: "item-8",
      question: "Is MindBrew available on mobile devices?",
      answer:
        "MindBrew is fully responsive and designed to work perfectly on smartphones and tablets through your web browser.",
    },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Discover quick and comprehensive answers to common questions about
            MindBrew.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <Accordion
            type="single"
            collapsible
            className="bg-muted dark:bg-muted/50 w-full rounded-2xl p-1"
          >
            {faqItems.map((item) => (
              <div className="group" key={item.id}>
                <AccordionItem
                  value={item.id}
                  className="data-[state=open]:bg-card dark:data-[state=open]:bg-muted peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
                <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
              </div>
            ))}
          </Accordion>
        </div>
      </div>

      <CTA />
    </div>
  );
}
