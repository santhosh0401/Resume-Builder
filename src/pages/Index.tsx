import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, Shield, TrendingUp, Briefcase, GraduationCap, Trophy, FolderGit2, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState<string>("hero");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    const header = document.querySelector("header");
    const offset = header ? (header as HTMLElement).getBoundingClientRect().height : 0;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset - 8; // small gap
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const header = document.querySelector("header");
    const offset = header ? (header as HTMLElement).getBoundingClientRect().height : 0;
    const sections = ["hero", "features", "how-it-works"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id || "");
          }
        });
      },
      {
        root: null,
        rootMargin: `-${offset + 8}px 0px -40% 0px`,
        threshold: 0.1,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Auto-Generated Resumes",
      description: "Your resume updates automatically as you complete internships, courses, and projects.",
    },
    {
      icon: Shield,
      title: "Verified Achievements",
      description: "All accomplishments are verified through integrated platforms for maximum credibility.",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Updates",
      description: "Connect your accounts and watch your resume grow with every achievement.",
    },
  ];

  const platforms = [
    { icon: Briefcase, name: "Internships", color: "bg-primary/10 text-primary" },
    { icon: GraduationCap, name: "Courses", color: "bg-accent/10 text-accent" },
    { icon: Trophy, name: "Hackathons", color: "bg-orange-100 text-orange-600" },
    { icon: FolderGit2, name: "Projects", color: "bg-purple-100 text-purple-600" },
  ];

  const benefits = [
    "Always up-to-date professional resume",
    "Verified achievements from trusted platforms",
    "Multiple resume templates to choose from",
    "One-click PDF export and sharing",
    "Career progress tracking dashboard",
    "Integration with 50+ platforms",
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">ResumeEco</h1>
              </div>
              <nav className="flex items-center gap-4">
                <Button variant="ghost" className={active === 'hero' ? 'font-semibold text-primary' : ''} onClick={() => scrollTo('hero')}>Home</Button>
                  <Button variant="ghost" className={active === 'features' ? 'font-semibold text-primary' : ''} onClick={() => scrollTo('features')}>Features</Button>
                  <Button variant="ghost" className={active === 'how-it-works' ? 'font-semibold text-primary' : ''} onClick={() => scrollTo('how-it-works')}>How It Works</Button>
                  <Button onClick={() => navigate("/dashboard")}>Get Started</Button>
              </nav>
          </div>
        </div>
      </header>

  {/* Hero Section */}
  <section id="hero" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            Next-Generation Resume Building
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-primary">
            Your Achievements,
            <br />
            One Perfect Resume
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect your internships, courses, hackathons, and projects. 
            We automatically generate and update your professional resume in real-time.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="shadow-medium" onClick={() => navigate("/start")}>
              Start Building Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/resume")}>
              View Demo Resume
            </Button>
          </div>
        </div>
      </section>

  {/* Connected Platforms / Features */}
  <section id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Connect Your Achievements</h2>
          <p className="text-muted-foreground">
            Link your accounts from various platforms and watch your resume build itself
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {platforms.map((platform, idx) => (
            <Card key={idx} className="p-6 text-center hover:shadow-medium transition-all cursor-pointer bg-gradient-card group">
              <div className={`w-16 h-16 rounded-2xl ${platform.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <platform.icon className="h-8 w-8" />
              </div>
              <p className="font-semibold">{platform.name}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose ResumeEco?</h2>
          <p className="text-muted-foreground">
            Build your professional brand with verified, real-time achievements
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <Card key={idx} className="p-8 hover:shadow-large transition-shadow bg-gradient-card">
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6">
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-gradient-card">
            <h2 className="text-3xl font-bold mb-8 text-center">Everything You Need</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

  {/* How It Works */}
  <section id="how-it-works" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">Three simple steps to your perfect resume</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { step: "1", title: "Connect Platforms", desc: "Link your internship, course, and project accounts" },
            { step: "2", title: "Verify Achievements", desc: "We automatically verify your accomplishments" },
            { step: "3", title: "Download Resume", desc: "Get your professional resume instantly" },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-medium">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 bg-gradient-primary text-white text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Build Your Future?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students and professionals who trust ResumeEco
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate("/dashboard")}>
            Get Started for Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-semibold">ResumeEco</span>
            </div>
            {/* Only ResumeEco branding shown, 'All rights reserved' removed */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
