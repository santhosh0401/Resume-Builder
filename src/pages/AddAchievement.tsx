import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";

type TypeKey = "internship" | "course" | "hackathon" | "project";

const AddAchievement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState<number>(1);
  const [type, setType] = useState<TypeKey | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Shared fields
  const [title, setTitle] = useState("");
  const [companyOrPlatform, setCompanyOrPlatform] = useState("");
  const [dateOrDuration, setDateOrDuration] = useState("");
  const [extra, setExtra] = useState("");

  const reset = () => {
    setStep(1);
    setType(null);
    setTitle("");
    setCompanyOrPlatform("");
    setDateOrDuration("");
    setExtra("");
    setEditIndex(null);
  };

  const saveAchievement = () => {
    try {
      const key = 'resumeAchievements';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      const item = { type, title, companyOrPlatform, dateOrDuration, extra };
      if (editIndex !== null && editIndex >= 0 && editIndex < existing.length) {
        existing[editIndex] = item;
        localStorage.setItem(key, JSON.stringify(existing));
        toast({ title: 'Achievement updated', description: 'Your achievement has been updated.' });
      } else {
        existing.push(item);
        localStorage.setItem(key, JSON.stringify(existing));
        toast({ title: 'Achievement added', description: 'Your achievement has been saved.' });
      }
      reset();
      navigate('/dashboard');
    } catch (e) {
      toast({ title: 'Save failed', description: 'Could not save achievement.' });
    }
  };

  // Load edit item if ?edit=<index> is present
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const edit = params.get('edit');
    if (edit) {
      const idx = parseInt(edit, 10);
      if (!isNaN(idx)) {
        try {
          const existing = JSON.parse(localStorage.getItem('resumeAchievements') || '[]');
          const item = existing[idx];
          if (item) {
            setEditIndex(idx);
            setType(item.type);
            setTitle(item.title || '');
            setCompanyOrPlatform(item.companyOrPlatform || '');
            setDateOrDuration(item.dateOrDuration || '');
            setExtra(item.extra || '');
            setStep(2);
          }
        } catch (e) {
          // ignore
        }
      }
    }
  }, [location.search]);

  const renderTypePicker = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Button onClick={() => { setType('internship'); setStep(2); }} className="p-6">Internship</Button>
      <Button onClick={() => { setType('course'); setStep(2); }} className="p-6">Course</Button>
      <Button onClick={() => { setType('hackathon'); setStep(2); }} className="p-6">Hackathon</Button>
      <Button onClick={() => { setType('project'); setStep(2); }} className="p-6">Project</Button>
    </div>
  );

  const renderForm = () => {
    return (
      <div className="space-y-4">
        <div>
          <Label>Title / Role</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <Label>{type === 'internship' ? 'Company' : type === 'course' ? 'Institute' : type === 'project' ? 'Project Tech' : 'Organizer' }</Label>
          <Input value={companyOrPlatform} onChange={(e) => setCompanyOrPlatform(e.target.value)} />
        </div>

        <div>
          <Label>{type === 'course' ? 'Duration / Completed' : 'Date / Period'}</Label>
          <Input value={dateOrDuration} onChange={(e) => setDateOrDuration(e.target.value)} />
        </div>

        <div>
          <Label>Details</Label>
          <Textarea rows={4} value={extra} onChange={(e) => setExtra(e.target.value)} />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => { setStep(1); setType(null); }}>Back</Button>
          <Button onClick={saveAchievement}>Save Achievement</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">Add New Achievement</h1>
          <p className="text-sm text-muted-foreground mb-6">Choose an achievement type and provide details. This will be added to your resume.</p>

          {step === 1 ? renderTypePicker() : renderForm()}

          <div className="mt-6">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>Cancel</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddAchievement;
