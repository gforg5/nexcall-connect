import { motion } from "framer-motion";
import { Phone, Globe, Shield, Zap, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const features = [
  {
    icon: Globe,
    title: "Global Reach",
    description: "Connect with anyone, anywhere in the world instantly.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Crystal clear calls with ultra-low latency connections.",
  },
  {
    icon: Shield,
    title: "End-to-End Secure",
    description: "Your conversations stay private with encrypted calls.",
  },
  {
    icon: Users,
    title: "Easy Contacts",
    description: "Find and add contacts in seconds. Start calling immediately.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/app");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Phone className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-display gradient-text">NexCall</span>
          </div>
          <Button variant="hero" size="sm" onClick={handleGetStarted}>
            {user ? "Open App" : "Get Started"}
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Glow effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-40 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/3 blur-[80px]" />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Now available worldwide
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6">
              Call Anyone,{" "}
              <span className="gradient-text glow-text">Anywhere</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              The fastest way to connect with people around the globe. 
              Crystal clear audio and video calls, zero complexity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="hero"
                size="lg"
                className="text-lg px-8 h-14"
                onClick={handleGetStarted}
              >
                Start Calling Free
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="hero-outline"
                size="lg"
                className="text-lg px-8 h-14"
                onClick={handleGetStarted}
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Floating phone illustration */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-16"
          >
            <div className="relative mx-auto w-full max-w-lg">
              <div className="glass-strong rounded-3xl p-8 relative">
                <div className="absolute inset-0 rounded-3xl glow-primary opacity-30" />
                <div className="relative space-y-4">
                  {/* Mock call UI */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">A</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Alex Johnson</p>
                      <p className="text-sm text-primary">● Online</p>
                    </div>
                    <Button variant="call" size="icon" className="w-10 h-10">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                      <span className="text-accent-foreground font-bold text-lg">M</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Maria Santos</p>
                      <p className="text-sm text-muted-foreground">Last call: 2h ago</p>
                    </div>
                    <Button variant="call" size="icon" className="w-10 h-10">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                    <div className="w-12 h-12 rounded-full bg-glow-muted flex items-center justify-center">
                      <span className="text-foreground font-bold text-lg">K</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Kenji Tanaka</p>
                      <p className="text-sm text-muted-foreground">Last call: yesterday</p>
                    </div>
                    <Button variant="call" size="icon" className="w-10 h-10">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Why <span className="gradient-text">NexCall</span>?
            </h2>
            <p className="text-muted-foreground text-lg">Built for speed, designed for everyone.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary-sm transition-all">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold font-display mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-12 relative"
          >
            <div className="absolute inset-0 rounded-3xl glow-primary opacity-10" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Ready to <span className="gradient-text">Connect</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Join millions of people making free calls worldwide.
              </p>
              <Button variant="hero" size="lg" className="text-lg px-10 h-14" onClick={handleGetStarted}>
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md gradient-primary flex items-center justify-center">
              <Phone className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-display font-bold gradient-text">NexCall</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 NexCall. Connect the world.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
