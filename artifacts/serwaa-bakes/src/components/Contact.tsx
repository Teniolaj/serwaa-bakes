import { motion } from "framer-motion";
import { MapPin, Clock, MessageCircle } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-background relative border-t border-border">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-card border border-card-border rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Decorative faint pattern/glow inside card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-accent/5 blur-[80px] pointer-events-none" />

          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold mb-6 relative z-10">
            Ready to Order?
          </h2>
          
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto relative z-10 font-light">
            We bake in small batches to ensure the highest quality. 
            Send us a message on WhatsApp to place your order or ask about our seasonal specials.
          </p>

          <a
            href="https://wa.me/0554287120"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-3 text-lg font-medium transition-all shadow-[0_0_30px_rgba(37,211,102,0.2)] hover:shadow-[0_0_40px_rgba(37,211,102,0.4)] hover:-translate-y-1 relative z-10 mb-12 w-full sm:w-auto"
          >
            <MessageCircle className="w-6 h-6" />
            Message us on WhatsApp
          </a>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border relative z-10 text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                <MapPin className="text-accent w-6 h-6" />
              </div>
              <div>
                <h4 className="text-foreground font-medium text-lg mb-1">Location</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Akoto Bamfo Street,<br />
                  Royal Palm St, Haatso<br />
                  North Legon, Agbogba
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                <Clock className="text-accent w-6 h-6" />
              </div>
              <div>
                <h4 className="text-foreground font-medium text-lg mb-1">Hours</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Baking fresh daily.<br />
                  Open until 7pm.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}