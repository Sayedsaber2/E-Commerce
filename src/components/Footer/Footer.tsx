

import Link from "next/link";
import { MapPin, Phone, Mail, } from "lucide-react";

export default function Footer() {
  return (
    <footer  className="bg-white/5 backdrop-blur-md text-blue-200 border-t mt-12 border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-blue-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">Shop Mart</h3>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Your one-stop destination for the latest technology, fashion,
              and lifestyle products. Quality guaranteed with fast shipping
              and excellent customer service.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>123 Shop Street, Octoper City, DC 12345</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@shopmart.com</span>
              </div>
            </div>

            
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categories" className="hover:text-white transition">Electronics</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Fashion</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Home & Garden</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Sports</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Deals</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition">About shopmart</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">Help Center</Link></li>
              <li><Link href="/track" className="hover:text-white transition">Track Order</Link></li>
              <li><Link href="/returns" className="hover:text-white transition">Returns & Exchanges</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition">Shipping Policy</Link></li>
              <li><Link href="/refund" className="hover:text-white transition">Refund Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-blue-200">
          © {new Date().getFullYear()} Shop Mart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}