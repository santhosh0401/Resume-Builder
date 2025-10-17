import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Trophy, FolderGit2, Plus, FileText, Download, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();

  const achievements = {
    internships: [
      { title: "Software Engineering Intern", company: "TechCorp Inc.", duration: "Jun 2024 - Aug 2024", verified: true },
      { title: "Frontend Developer Intern", company: "StartupXYZ", duration: "Jan 2024 - Mar 2024", verified: true },
    ],
    courses: [
      { title: "Advanced React & TypeScript", platform: "Udemy", completed: "Sep 2024", verified: true },
      { title: "Full-Stack Web Development", platform: "Coursera", completed: "Jul 2024", verified: true },
    ],
    hackathons: [
      { title: "HackTheCity 2024", position: "1st Place", date: "Oct 2024", verified: true },
      { title: "CodeFest National", position: "Top 10", date: "Aug 2024", verified: true },
    ],
    projects: [
      { title: "AI Resume Builder", tech: "React, Node.js, OpenAI", status: "Completed", verified: true },
      { title: "E-Commerce Platform", tech: "Next.js, PostgreSQL", status: "In Progress", verified: false },
    ],
  };

  const { toast } = useToast();
  const [saved, setSaved] = useState<any[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('resumeAchievements');
      const parsed = raw ? JSON.parse(raw) : [];
      setSaved(parsed);
    } catch (e) {
      setSaved([]);
    }
  }, []);

  const saveLocal = (items: any[]) => {
    localStorage.setItem('resumeAchievements', JSON.stringify(items));
    setSaved(items);
  };

  const achievementCards = [
    { icon: Briefcase, title: "Internships", id: "internships", count: achievements.internships.length + saved.filter(s => s.type === 'internship').length, color: "text-primary" },
    { icon: GraduationCap, title: "Courses", id: "courses", count: achievements.courses.length + saved.filter(s => s.type === 'course').length, color: "text-accent" },
    { icon: Trophy, title: "Hackathons", id: "hackathons", count: achievements.hackathons.length + saved.filter(s => s.type === 'hackathon').length, color: "text-orange-500" },
    { icon: FolderGit2, title: "Projects", id: "projects", count: achievements.projects.length + saved.filter(s => s.type === 'project').length, color: "text-purple-500" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    const header = document.querySelector("header");
    const offset = header ? (header as HTMLElement).getBoundingClientRect().height : 0;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset - 8;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Ensure dashboard always starts at the top when navigated to
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

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
              <Button onClick={() => navigate("/resume")}>
                View Resume
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Alex!</h2>
          <p className="text-muted-foreground">Your dynamic resume is always up-to-date with your latest achievements.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in">
          {achievementCards.map((item, idx) => (
            <Card key={idx} className="p-6 hover:shadow-medium transition-shadow cursor-pointer bg-gradient-card" onClick={() => item.id && scrollTo(item.id)}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{item.title}</p>
                  <p className="text-3xl font-bold">{item.count}</p>
                </div>
                <item.icon className={`h-10 w-10 ${item.color}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Resume Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="p-6 bg-gradient-primary text-white">
            <h3 className="text-xl font-bold mb-2">Your Resume is Ready!</h3>
            <p className="mb-4 opacity-90">All your verified achievements are automatically included.</p>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => navigate("/resume") }>
                <FileText className="h-4 w-4 mr-2" />
                View Resume
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" onClick={() => navigate('/resume?print=true')}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-2">Add New Achievement</h3>
            <p className="text-muted-foreground mb-4">Keep your resume fresh with your latest accomplishments.</p>
            <Button variant="outline" className="w-full" onClick={() => navigate('/add-achievement')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Achievement
            </Button>
          </Card>
        </div>

        {/* Achievements Sections */}
        <div className="space-y-6">
          {/* Internships */}
          <section id="internships">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-primary" />
                Internships
              </h3>
              <Button variant="ghost" size="sm" onClick={() => scrollTo('internships')}>View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.internships.map((item, idx) => (
                    <Card key={`static-intern-${idx}`} className="p-6 hover:shadow-medium transition-shadow group relative">
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" onClick={() => toast({ title: 'Demo achievement', description: 'Demo achievements cannot be edited.' })}><Pencil className="h-4 w-4" /></Button>
                      </div>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{item.title}</h4>
                        {item.verified && <Badge variant="secondary" className="bg-green-100 text-green-700">Verified</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{item.company}</p>
                      <p className="text-xs text-muted-foreground">{item.duration}</p>
                    </Card>
                  ))}

                  {/* saved internships */}
                  {saved.filter((s) => s.type === 'internship').map((item, idx) => {
                    const globalIndex = saved.findIndex((s) => s === item);
                    return (
                      <Card key={`saved-intern-${globalIndex}-${idx}`} className="p-6 hover:shadow-medium transition-shadow group relative">
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/add-achievement?edit=${globalIndex}`)}><Pencil className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => {
                            const idxToRemove = globalIndex;
                            const remaining = saved.filter((_, i) => i !== idxToRemove);
                            saveLocal(remaining);
                            toast({ title: 'Deleted', description: 'Achievement removed.' });
                          }}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{item.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{item.companyOrPlatform}</p>
                        <p className="text-xs text-muted-foreground">{item.dateOrDuration}</p>
                      </Card>
                    );
                  })}
            </div>
          </section>

          {/* Courses */}
          <section id="courses">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-accent" />
                Courses & Certifications
              </h3>
              <Button variant="ghost" size="sm" onClick={() => scrollTo('courses')}>View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.courses.map((item, idx) => (
                <Card key={`static-course-${idx}`} className="p-6 hover:shadow-medium transition-shadow group relative">
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" onClick={() => toast({ title: 'Demo achievement', description: 'Demo achievements cannot be edited.' })}><Pencil className="h-4 w-4" /></Button>
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{item.title}</h4>
                    {item.verified && <Badge variant="secondary" className="bg-green-100 text-green-700">Verified</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{item.platform}</p>
                  <p className="text-xs text-muted-foreground">Completed: {item.completed}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Hackathons */}
          <section id="hackathons">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="h-6 w-6 text-orange-500" />
                Hackathons
              </h3>
              <Button variant="ghost" size="sm" onClick={() => scrollTo('hackathons')}>View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.hackathons.map((item, idx) => (
                <Card key={`static-hackathon-${idx}`} className="p-6 hover:shadow-medium transition-shadow group relative">
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" onClick={() => toast({ title: 'Demo achievement', description: 'Demo achievements cannot be edited.' })}><Pencil className="h-4 w-4" /></Button>
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{item.title}</h4>
                    {item.verified && <Badge variant="secondary" className="bg-green-100 text-green-700">Verified</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{item.position}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section id="projects">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <FolderGit2 className="h-6 w-6 text-purple-500" />
                Projects
              </h3>
              <Button variant="ghost" size="sm" onClick={() => scrollTo('projects')}>View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.projects.map((item, idx) => (
                <Card key={`static-project-${idx}`} className="p-6 hover:shadow-medium transition-shadow group relative">
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" onClick={() => toast({ title: 'Demo achievement', description: 'Demo achievements cannot be edited.' })}><Pencil className="h-4 w-4" /></Button>
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{item.title}</h4>
                    {item.verified && <Badge variant="secondary" className="bg-green-100 text-green-700">Verified</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{item.tech}</p>
                  <p className="text-xs text-muted-foreground">Status: {item.status}</p>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
