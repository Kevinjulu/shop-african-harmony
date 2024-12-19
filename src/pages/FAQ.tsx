import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      title: "Shopping & Orders",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We offer multiple secure payment options for your convenience:\n\n• Mobile Money (M-Pesa, MTN Money, etc.)\n• Credit/Debit Cards (Visa, Mastercard, American Express)\n• PayPal\n• Bank Transfer\n• Crypto (Bitcoin, Ethereum)\n\nAll payments are processed through secure, encrypted channels to ensure your financial information remains safe."
        },
        {
          question: "How can I track my order?",
          answer: "Tracking your order is easy:\n\n1. Log into your account\n2. Go to 'Order History'\n3. Click on your order number\n4. View real-time tracking information\n\nYou'll also receive email updates at every stage of delivery. For more detailed tracking, visit our dedicated tracking page.",
          actionButton: {
            text: "Track Your Order",
            link: "/track-order"
          }
        },
        {
          question: "What is your delivery timeframe?",
          answer: "Delivery times vary by location:\n\n• Major Cities (Nairobi, Lagos, etc.): 2-3 business days\n• Other Urban Areas: 3-5 business days\n• Rural Areas: 5-7 business days\n• International Shipping: 7-14 business days\n\nNote: These are estimated timeframes and may vary during peak seasons or due to unforeseen circumstances."
        }
      ]
    },
    {
      title: "Returns & Refunds",
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We offer a comprehensive 30-day return policy:\n\n• Items must be unused and in original packaging\n• Return shipping is free for defective items\n• Refunds are processed within 5-7 business days\n\nFor detailed information, please visit our returns policy page.",
          actionButton: {
            text: "View Returns Policy",
            link: "/returns-policy"
          }
        },
        {
          question: "How do I initiate a return?",
          answer: "To initiate a return:\n\n1. Log into your account\n2. Go to 'Order History'\n3. Select the item you wish to return\n4. Follow the return instructions\n5. Print the return label\n\nOur customer service team will guide you through the process if needed."
        }
      ]
    },
    {
      title: "Product & Quality",
      faqs: [
        {
          question: "Are your products authentic African crafts?",
          answer: "Yes, absolutely! We maintain strict authenticity standards:\n\n• Direct partnerships with verified African artisans\n• Rigorous quality control process\n• Documentation of origin for each product\n• Fair trade practices\n\nEach item comes with a certificate of authenticity when applicable."
        },
        {
          question: "How do you ensure product quality?",
          answer: "Our quality assurance process includes:\n\n• Initial vendor verification\n• Product sample evaluation\n• Regular quality audits\n• Customer feedback monitoring\n• Third-party quality certifications"
        }
      ]
    },
    {
      title: "Account & Security",
      faqs: [
        {
          question: "How do I create an account?",
          answer: "Creating an account is simple:\n\n1. Click the 'Sign Up' button\n2. Enter your email and create a password\n3. Verify your email address\n4. Complete your profile\n\nYou can also sign up using your Google or Facebook account for faster access."
        },
        {
          question: "How do you protect my personal information?",
          answer: "We take data security seriously:\n\n• SSL encryption for all transactions\n• Regular security audits\n• Compliance with data protection regulations\n• Secure payment processing\n• No storage of sensitive payment information"
        }
      ]
    }
  ];

  const filteredFaqs = searchQuery
    ? faqCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.faqs.length > 0)
    : faqCategories;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Find answers to common questions about shopping on Shop African Brand
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg rounded-xl shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          {/* FAQ Categories */}
          {filteredFaqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {category.title}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${categoryIndex}-${faqIndex}`}
                    className="bg-white rounded-lg border shadow-sm"
                  >
                    <AccordionTrigger className="px-6 text-left">
                      <span className="text-lg font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="prose max-w-none">
                        <p className="text-gray-600 whitespace-pre-line">
                          {faq.answer}
                        </p>
                        {faq.actionButton && (
                          <Button
                            className="mt-4"
                            onClick={() => navigate(faq.actionButton.link)}
                          >
                            {faq.actionButton.text}
                          </Button>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {/* Contact Section */}
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border mt-12">
            <h2 className="text-2xl font-semibold mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? We're here to help!
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/contact")}
              >
                Contact Support
              </Button>
              <Button
                onClick={() => window.location.href = "mailto:support@shopafricanbrand.com"}
              >
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;