import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, Share2, Edit, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomizeDialog } from "@/components/resume/CustomizeDialog";
import { generateSummary, copyToClipboard } from "@/lib/utils";
import { PersonalInfo, ResumeCustomization, DEFAULT_CUSTOMIZATION, DEFAULT_PERSONAL_INFO } from "@/types/resume";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";
import PrintableResume from "@/components/resume/PrintableResume";
import { useRef } from "react";
import html2pdf from "html2pdf.js";

const Resume = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [customization, setCustomization] = useState<ResumeCustomization>(() => {
    const saved = localStorage.getItem('resumeCustomization');
    return saved ? JSON.parse(saved) : DEFAULT_CUSTOMIZATION;
  });
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    const saved = localStorage.getItem('resumePersonalInfo');
    return saved ? JSON.parse(saved) : DEFAULT_PERSONAL_INFO;
  });

  const handleSaveCustomization = () => {
    localStorage.setItem('resumeCustomization', JSON.stringify(customization));
    localStorage.setItem('resumePersonalInfo', JSON.stringify(personalInfo));
    toast({
      title: "Changes saved",
      description: "Your resume customization has been saved successfully.",
    });
    setCustomizeOpen(false);
  };

  const handleGenerateSummary = async () => {
    const summary = generateSummary(personalInfo);
    setPersonalInfo({ ...personalInfo, summary });
    localStorage.setItem('resumePersonalInfo', JSON.stringify({ ...personalInfo, summary }));
    toast({ title: 'Summary generated', description: 'A professional summary was generated and saved.' });
  };

  const handleResetCustomization = () => {
    setCustomization(DEFAULT_CUSTOMIZATION);
    setPersonalInfo(DEFAULT_PERSONAL_INFO);
    localStorage.removeItem('resumeCustomization');
    localStorage.removeItem('resumePersonalInfo');
    toast({
      title: "Reset to default",
      description: "Your resume has been reset to default settings.",
    });
  };

  // Print handling: if ?print=true is present, trigger print and remove query
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('print') === 'true') {
      // small timeout to ensure DOM is ready
      setTimeout(() => {
        window.print();
        params.delete('print');
        const newSearch = params.toString();
        const newPath = window.location.pathname + (newSearch ? `?${newSearch}` : '');
        window.history.replaceState({}, '', newPath);
      }, 250);
    }
  }, [location.search]);

  // If print mode, render a simple ATS-friendly layout
  const params = new URLSearchParams(location.search);
  const isPrint = params.get('print') === 'true';

  if (isPrint) {
    return (
      <PrintableResume personalInfo={personalInfo} customization={customization} />
    );
  }

  // Theme colors
  const themeColors = {
    professional: 'text-primary',
    modern: 'text-purple-600',
    classic: 'text-gray-900',
    tech: 'text-green-600',
  };

  // Font sizes
  const fontSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  // Spacing
  const spacingClasses = {
    compact: 'space-y-4',
    standard: 'space-y-6',
    spacious: 'space-y-8',
  };

  const headingColor = themeColors[customization.theme];
  const bodySize = fontSizes[customization.fontSize];
  const spacing = spacingClasses[customization.spacing];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">ResumeEco</h1>
            </div>
            <nav className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>Dashboard</Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
                <Button onClick={() => navigate('/resume?print=true')}>
                  <Download className="h-4 w-4 mr-2" />
                  Save as PDF
                </Button>
                <Button onClick={() => {
                  // use html2pdf to export a professional PDF
                  const container = document.createElement('div');
                  document.body.appendChild(container);
                  const ref = document.createElement('div');
                  container.appendChild(ref);
                  // render PrintableResume into this container by setting innerHTML (quick approach)
                  // We'll build a minimal HTML snapshot
                  const html = document.querySelector('.container .max-w-4xl')?.outerHTML || document.body.outerHTML;
                  container.innerHTML = html;
                  const opt = {
                    margin:       12,
                    filename:     `${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`,
                    image:        { type: 'jpeg' as const, quality: 0.98 },
                    html2canvas:  { scale: 2 },
                    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
                  };
                  html2pdf().set(opt).from(container).save().then(() => { container.remove(); }).catch(() => { container.remove(); });
                }}>
                  Export PDF
                </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Resume Actions Bar */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Your Professional Resume</h2>
              <p className="text-sm text-muted-foreground">Last updated: Just now • Auto-synced</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={async () => {
                const summary = generateSummary(personalInfo);
                setPersonalInfo({ ...personalInfo, summary });
                localStorage.setItem('resumePersonalInfo', JSON.stringify({ ...personalInfo, summary }));
                toast({ title: 'Summary generated', description: 'A professional summary was generated and saved.' });
              }}>
                Generate Summary
              </Button>

              <Button variant="outline" onClick={async () => {
                const ok = await copyToClipboard(personalInfo.summary || '');
                if (ok) toast({ title: 'Copied', description: 'Summary copied to clipboard.' });
                else toast({ title: 'Copy failed', description: 'Could not copy to clipboard.' });
              }}>
                Copy Summary
              </Button>
              <Button variant="ghost" onClick={async () => {
                const textParts = [] as string[];
                textParts.push(personalInfo.name || '');
                if (personalInfo.title) textParts.push(personalInfo.title);
                if (personalInfo.email) textParts.push(`Email: ${personalInfo.email}`);
                if (personalInfo.phone) textParts.push(`Phone: ${personalInfo.phone}`);
                if (personalInfo.location) textParts.push(`Location: ${personalInfo.location}`);
                if (personalInfo.summary) textParts.push('\nSummary:\n' + personalInfo.summary);
                const ok = await copyToClipboard(textParts.join('\n'));
                if (ok) toast({ title: 'Copied', description: 'Resume text copied to clipboard.' });
                else toast({ title: 'Copy failed', description: 'Could not copy resume text.' });
              }}>
                Copy Resume Text
              </Button>

              <Button variant="outline" onClick={() => setCustomizeOpen(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </div>
          </div>

          {/* Resume Preview */}
          <Card className={`p-12 bg-white shadow-large animate-fade-in ${bodySize}`}>
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">{personalInfo.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{personalInfo.title}</p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {personalInfo.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {personalInfo.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {personalInfo.location}
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-4">
                <Button variant="ghost" size="sm" className="h-8">
                  <Linkedin className="h-4 w-4 mr-2" />
                  {personalInfo.linkedin}
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  <Github className="h-4 w-4 mr-2" />
                  {personalInfo.github}
                </Button>
              </div>
            </div>

            <Separator className="my-8" />

            <div className={spacing}>
              {/* Professional Summary */}
              {customization.visibleSections.summary && (
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${headingColor}`}>Professional Summary</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {personalInfo.summary}
                  </p>
                </section>
              )}

              {/* Experience */}
              {customization.visibleSections.experience && (
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${headingColor}`}>Experience</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">Software Engineering Intern</h3>
                      <p className="text-muted-foreground">TechCorp Inc.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Jun 2024 - Aug 2024</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 mt-1">Verified</Badge>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                    <li>Developed RESTful APIs using Node.js and Express, improving response time by 40%</li>
                    <li>Collaborated with cross-functional teams to deliver features for 100K+ users</li>
                    <li>Implemented automated testing, increasing code coverage from 60% to 85%</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">Frontend Developer Intern</h3>
                      <p className="text-muted-foreground">StartupXYZ</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Jan 2024 - Mar 2024</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 mt-1">Verified</Badge>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                    <li>Built responsive web applications using React and TypeScript</li>
                    <li>Optimized application performance, reducing load time by 30%</li>
                    <li>Contributed to design system development and component library</li>
                  </ul>
                  </div>
                </div>
              </section>
            )}

              {/* Projects */}
              {customization.visibleSections.projects && (
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${headingColor}`}>Projects</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">AI Resume Builder</h3>
                      <p className="text-sm text-muted-foreground">React, Node.js, OpenAI API</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">Verified</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Developed an intelligent resume building platform that auto-generates professional resumes 
                    from user achievements. Integrated OpenAI for smart content generation.
                  </p>
                </div>

                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">E-Commerce Platform</h3>
                      <p className="text-sm text-muted-foreground">Next.js, PostgreSQL, Stripe</p>
                    </div>
                    <Badge variant="outline">In Progress</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Building a full-featured e-commerce solution with payment integration, inventory management, 
                    and real-time analytics dashboard.
                  </p>
                  </div>
                </div>
              </section>
            )}

              {/* Education & Certifications */}
              {customization.visibleSections.education && (
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${headingColor}`}>Education & Certifications</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">Bachelor of Science in Computer Science</h3>
                      <p className="text-muted-foreground">University of California, Berkeley</p>
                    </div>
                    <p className="text-sm font-medium">2022 - 2026</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">Advanced React & TypeScript</h3>
                      <p className="text-muted-foreground">Udemy</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Sep 2024</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 mt-1">Verified</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">Full-Stack Web Development</h3>
                      <p className="text-muted-foreground">Coursera</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Jul 2024</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 mt-1">Verified</Badge>
                    </div>
                  </div>
                  </div>
                </div>
              </section>
            )}

              {/* Achievements */}
              {customization.visibleSections.achievements && (
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${headingColor}`}>Achievements</h2>
              
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <p className="text-muted-foreground">🏆 1st Place - HackTheCity 2024 (Oct 2024)</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Verified</Badge>
                </div>
                <div className="flex items-start justify-between">
                  <p className="text-muted-foreground">🏅 Top 10 - CodeFest National (Aug 2024)</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Verified</Badge>
                  </div>
                </div>
              </section>
            )}

              {/* Skills */}
              {customization.visibleSections.skills && (
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${headingColor}`}>Skills</h2>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold mb-2">Programming Languages</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">JavaScript</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">Java</Badge>
                    <Badge variant="outline">SQL</Badge>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-semibold mb-2">Frameworks & Libraries</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Next.js</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Express</Badge>
                    <Badge variant="outline">TailwindCSS</Badge>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-semibold mb-2">Tools & Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Git</Badge>
                    <Badge variant="outline">Docker</Badge>
                    <Badge variant="outline">PostgreSQL</Badge>
                    <Badge variant="outline">MongoDB</Badge>
                    <Badge variant="outline">AWS</Badge>
                  </div>
                  </div>
                </div>
              </section>
            )}
            </div>
          </Card>

          {/* Footer note removed as requested */}
        </div>
      </div>

      <CustomizeDialog
        open={customizeOpen}
        onOpenChange={setCustomizeOpen}
        customization={customization}
        personalInfo={personalInfo}
        onCustomizationChange={setCustomization}
        onPersonalInfoChange={setPersonalInfo}
        onSave={handleSaveCustomization}
        onReset={handleResetCustomization}
        onGenerateSummary={handleGenerateSummary}
      />
    </div>
  );
};

export default Resume;
