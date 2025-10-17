import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { PersonalInfo, DEFAULT_CUSTOMIZATION } from "@/types/resume";

const Start = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState<PersonalInfo>({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    summary: "",
  });

  const canSave = info.name.trim() !== "" && info.email.trim() !== "";

  const handleChange = (key: keyof PersonalInfo, value: string) => {
    setInfo((s) => ({ ...s, [key]: value }));
  };

  const handleCreate = () => {
    // Persist user info and default customization, then go to resume
    try {
      localStorage.setItem("resumePersonalInfo", JSON.stringify(info));
      localStorage.setItem("resumeCustomization", JSON.stringify(DEFAULT_CUSTOMIZATION));
    } catch (e) {
      // ignore storage errors
    }
    navigate("/resume");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">Start Building Your Resume</h1>
          <p className="text-sm text-muted-foreground mb-6">Enter your personal details below to create a new resume. You can customize it later.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={info.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="title">Professional Title</Label>
              <Input id="title" value={info.title} onChange={(e) => handleChange('title', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={info.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={info.phone} onChange={(e) => handleChange('phone', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={info.location} onChange={(e) => handleChange('location', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" value={info.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="github">GitHub</Label>
              <Input id="github" value={info.github} onChange={(e) => handleChange('github', e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea id="summary" rows={4} value={info.summary} onChange={(e) => handleChange('summary', e.target.value)} />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button disabled={!canSave} onClick={handleCreate}>Create Resume</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Start;
