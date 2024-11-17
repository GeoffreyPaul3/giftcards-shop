"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const faqData = [
  { question: "What is your return policy?", answer: "We accept returns within 30 days of purchase." },
  { question: "How do I track my order?", answer: "Use the tracking number provided after dispatch." },
  { question: "What payment methods do you accept?", answer: "We accept credit cards, PayPal, and bank transfers." },
];

export default function FAQ() {
  const [search, setSearch] = useState("");

  const filteredFaqs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
      <div className="mt-6">
        <Input
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Accordion className="mt-8" type="multiple"> {/* Added type prop here */}
        {filteredFaqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
