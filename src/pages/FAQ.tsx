import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards (Visa, Mastercard, American Express), PayPal, and mobile money services like M-Pesa for select African countries."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary by location: Local delivery (2-3 business days), International shipping (7-14 business days). All orders are tracked and shipping updates are provided via email."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Please see our Returns Policy page for detailed information."
    },
    {
      question: "Are the products authentic African crafts?",
      answer: "Yes, all our products are sourced directly from verified African artisans and vendors. We work closely with local communities to ensure authenticity and fair trade practices."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can calculate shipping costs at checkout."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website."
    },
    {
      question: "Can I cancel or modify my order?",
      answer: "Orders can be cancelled or modified within 24 hours of placement. Please contact our customer service team as soon as possible if you need to make changes."
    },
    {
      question: "Do you offer wholesale pricing?",
      answer: "Yes, we offer wholesale pricing for bulk orders. Please contact our sales team for wholesale inquiries and pricing information."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border p-2">
              <AccordionTrigger className="text-left font-medium px-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Please contact our customer support team.
          </p>
          <Button>Contact Support</Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;