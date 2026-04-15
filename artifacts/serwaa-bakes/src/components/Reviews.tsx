import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Going to dance & eat, coming?",
      role: "Local Guide",
      text: "Fried or baked the food was on point, well seasoned and just good. Hit the spot and the happy dance, even the watermelon juice was good. No complaints.",
    },
    {
      id: 2,
      name: "Patience Anyah",
      role: "Customer",
      text: "Serwaa bakes helped us during my dad's founders day celebration and she delivered her best. Till today everyone praises her handwork. Well done Serwaa.",
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-muted/40 relative overflow-hidden">
      {/* Decorative subtle glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-script text-2xl mb-2 block">Testimonials</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold mb-4">
            What People Say
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-card p-8 md:p-10 rounded-2xl border border-border relative"
            >
              <div className="absolute -top-4 -left-2 text-6xl text-accent/20 font-serif leading-none">
                "
              </div>
              
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#f5c542] text-[#f5c542]" />
                ))}
              </div>
              
              <p className="text-foreground/90 italic text-lg leading-relaxed mb-8 relative z-10 font-serif font-light">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                  <span className="text-accent font-serif font-bold text-lg">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-accent font-medium tracking-wide">{review.name}</h4>
                  {review.role && <p className="text-muted-foreground text-sm text-xs uppercase tracking-widest mt-1">{review.role}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}