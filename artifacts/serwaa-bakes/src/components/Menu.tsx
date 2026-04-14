import { motion } from "framer-motion";

const menuItems = [
  { name: "Mini Pound Cakes (5 pcs)", price: "260" },
  { name: "Baked Doughnuts (60 pcs)", price: "100" },
  { name: "Butter Cookies (50 pcs)", price: "100" },
  { name: "Baked Chips (1 bag)", price: "120" },
  { name: "Fried Chips (1 bag)", price: "160" },
  { name: "Achomo (1 bag)", price: "170" },
  { name: "Achomo Jar", price: "70" },
  { name: "Loaf Cake (all flavors)", price: "120" },
  { name: "Short Bread Cookies (50 pcs)", price: "120" },
  { name: "Sugar Cookies (60 pcs)", price: "100" },
  { name: "Fruit Cake (loaf size)", price: "150" },
  { name: "Frozen Spring Roll (10 pcs)", price: "40" },
  { name: "Frozen Samosa (10 pcs)", price: "40" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function Menu() {
  return (
    <section id="menu" className="py-24 bg-background relative">
      {/* Decorative background blur element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#211d1a] to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="text-accent font-script text-2xl mb-2 block">Our Menu</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold mb-4">
            Made fresh. <br className="md:hidden" /><span className="italic font-light text-muted-foreground">Made with love.</span>
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mt-6" />
        </motion.div>

        {/* Decorative image above menu */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-4xl relative h-[250px] sm:h-[350px]"
        >
          <img 
            src="/menu-decor.png" 
            alt="Artisanal baked goods" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card border border-card-border p-6 rounded-xl hover:border-accent/30 hover:shadow-[0_0_15px_rgba(232,165,152,0.05)] transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-4 gap-4">
                <h3 className="text-foreground font-medium leading-tight group-hover:text-accent transition-colors">
                  {item.name}
                </h3>
                <span className="text-accent font-serif font-bold whitespace-nowrap">
                  GH₵ {item.price}
                </span>
              </div>
              <div className="w-full flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                <div className="h-px bg-accent/20 flex-1" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                <div className="h-px bg-accent/20 flex-1" />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground italic mb-6">Looking for custom cakes or event catering?</p>
          <a
              href="https://wa.me/0554287120"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#1a1714] border border-[#211d1a] text-foreground hover:bg-[#211d1a] hover:border-accent/50 px-8 py-3 text-sm font-medium transition-all"
            >
              Message us for custom orders
            </a>
        </div>
      </div>
    </section>
  );
}