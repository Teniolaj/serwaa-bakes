import { Instagram, Facebook } from "lucide-react";


export function Footer() {
  return (
    <footer className="bg-background text-foreground pt-16 pb-8 text-sm border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6 max-w-sm">
            <div className="text-3xl font-script text-accent">
              Serwaa Bakes
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Accra's top-rated women-owned bakery, elevating special moments across Adenta and the greater Accra region with elegance, precision, and taste.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/serwaa_bakes/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-card-border flex items-center justify-center hover:bg-accent hover:text-background transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/bakedbyserwaa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-card-border flex items-center justify-center hover:bg-accent hover:text-background transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:px-8">
            <h3 className="text-lg font-serif font-semibold text-foreground mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4 font-medium text-muted-foreground">
              <li>
                <a href="#menu" className="hover:text-accent transition-colors">
                  Our Menu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-foreground mb-6">
              Contact Info
            </h3>
            <ul className="space-y-6 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent font-semibold">A:</span>
                <span>Akoto Bamfo Street, Royal Palm St</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold">P:</span>
                <span>055 428 7120</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold">H:</span>
                <div className="flex flex-col">
                  <span>Mon–Sat: 8 am – 7 pm</span>
                  <span>Sun: 11 am – 7 pm</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground/80">
          <p>&copy; 2026 Serwaa Bakes. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
