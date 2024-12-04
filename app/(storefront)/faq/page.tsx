"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";



interface FaqItem {
  question: string;
  answer: string;
}


const faqData: FaqItem[] = [
  { question: "What is an online gift card?", answer: "An online gift card is a digital version of a physical gift card. It can be sent via email, text message, or through a retailer’s app, and can be used for online purchases at the associated retailer or platform." },
  { question: "How do I use an online gift card?", answer: "To use an online gift card, you typically enter the card number and PIN during the checkout process on the retailer's website. Some online gift cards can also be linked to your account for easier future use." },
  { question: "Can I buy an online gift card without a physical card?", answer: "Yes, online gift cards are digital and do not require a physical card. You can purchase them through a retailer's website or third-party services." },
  { question: "Can I send an online gift card as a gift?", answer: "Yes, most online gift cards allow you to send them directly to someone else via email or text message, and you can even personalize the message." },
  { question: "How do I check the balance of my online gift card?", answer: "You can check the balance by visiting the retailer’s website, app, or by calling customer service." },
  { question: "Do online gift cards expire?", answer: "It depends on the retailer, but many online gift cards do not have expiration dates. Always check the terms and conditions." },
  { question: "Can I use an online gift card to buy items from a physical store?", answer: "Some online gift cards can be used in-store, especially if linked to your account. Verify with the retailer for in-store use." },
  { question: "Can I use an online gift card for subscriptions or digital content?", answer: "Yes, many online gift cards can be used for subscriptions like Netflix, Spotify, and gaming platforms." },
  { question: "How do I redeem an online gift card?", answer: "To redeem, enter the card number and PIN at checkout or link it to your account on the retailer’s website." },
  { question: "Can I use an online gift card for international purchases?", answer: "It depends on the retailer. Some cards are region-specific, so check the terms for international use." },
  { question: "Can I reload my online gift card?", answer: "Most online gift cards are not reloadable. You would need to purchase a new card." },
  { question: "What happens if I lose my online gift card or forget the details?", answer: "Contact the retailer with your receipt or proof of purchase to recover the card details." },
  { question: "Can I use multiple online gift cards for a single purchase?", answer: "Yes, many retailers allow multiple gift cards per purchase, but there may be limits. Check with the retailer." },
  { question: "Can I exchange or return an online gift card for cash?", answer: "Online gift cards are typically non-refundable. However, some jurisdictions may allow redemption for cash if the balance is low." },
  { question: "How do I send an online gift card to someone else?", answer: "You can send an online gift card via email or text by entering the recipient's details during purchase." },
  { question: "Can I use an online gift card on a mobile app?", answer: "Yes, many retailers allow you to use online gift cards on their mobile apps." },
  { question: "Can I cancel an online gift card after purchasing it?", answer: "In most cases, gift cards are non-cancellable once purchased, as they are often delivered instantly." },
  { question: "What are e-gift cards?", answer: "E-gift cards are electronic gift cards sent via email, text, or app, functioning the same as physical gift cards." },
  { question: "How do I transfer funds from an online gift card to my bank account?", answer: "Generally, you can't transfer funds from a gift card to a bank account, but you can use the card for purchases you’d normally make with your bank card." },
  { question: "Can I use my online gift card for a different retailer or website?", answer: "No, most gift cards are retailer-specific and cannot be used on different platforms." },
];

const FaqPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expanded, setExpanded] = useState<string[]>([]);
  const { toast } = useToast();


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleAccordion = (index: number) => {
    setExpanded((prev) =>
      prev.includes(index.toString())
        ? prev.filter((item) => item !== index.toString())
        : [...prev, index.toString()]
    );
  };

  const filteredFaqData = faqData.filter((item) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="search-box">
        <Input
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for an answer..."
          className="mb-4"
        />
      </div>

      <Accordion type="multiple" value={expanded}>
        {filteredFaqData.map((faq, index) => (
          <AccordionItem key={index} value={index.toString()}>
            <AccordionTrigger onClick={() => toggleAccordion(index)}>
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              <p>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-4">
      <Button onClick={() => toast({ variant:"destructive", 
        description: "More questions and answers will be added soon!",
        title: "Update Coming Soon",
         })}>
        Add Question
     </Button>

      </div>
    </div>
  );
};

export default FaqPage;
