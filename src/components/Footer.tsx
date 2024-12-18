import { Facebook, Instagram, Twitter, CreditCard, Smartphone, Wallet, Bitcoin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-secondary mb-4">Contact Us</h3>
            <p className="text-gray-600 mb-2">Call us 24/7</p>
            <p className="text-primary font-semibold mb-2">+254 700 000000</p>
            <address className="text-gray-600 not-italic">
              123 African Craft Street<br />
              Nairobi, Kenya
            </address>
            <div className="flex gap-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-5 h-5 text-gray-600 hover:text-primary cursor-pointer transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 text-gray-600 hover:text-primary cursor-pointer transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-5 h-5 text-gray-600 hover:text-primary cursor-pointer transition-colors" />
              </a>
            </div>
            {/* Payment Methods - Integrated into contact section */}
            <div className="mt-6">
              <p className="text-xs font-medium text-gray-600 mb-2">We Accept</p>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded text-xs">
                  <Smartphone className="h-3.5 w-3.5 text-gray-600" />
                  <span className="font-medium text-gray-700">M-Pesa</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded text-xs">
                  <CreditCard className="h-3.5 w-3.5 text-gray-600" />
                  <span className="font-medium text-gray-700">Cards</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded text-xs">
                  <Wallet className="h-3.5 w-3.5 text-gray-600" />
                  <span className="font-medium text-gray-700">PayPal</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded text-xs">
                  <Bitcoin className="h-3.5 w-3.5 text-gray-600" />
                  <span className="font-medium text-gray-700">Crypto</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-secondary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/shipping-policy" className="text-gray-600 hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns-policy" className="text-gray-600 hover:text-primary transition-colors">Returns & Exchanges</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-secondary mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/careers" className="text-gray-600 hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/affiliate" className="text-gray-600 hover:text-primary transition-colors">Become an Affiliate</Link></li>
              <li><Link to="/vendor/register" className="text-gray-600 hover:text-primary transition-colors">Become a Vendor</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-secondary mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">Subscribe to get updates about our products and offers</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-black px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-600 mt-8">
          <p className="mb-2">© {new Date().getFullYear()} Shop African Brand. All rights reserved.</p>
          <p className="text-sm">
            Created with ❤️ by{" "}
            <a 
              href="https://kevinjulu.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Julu
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};