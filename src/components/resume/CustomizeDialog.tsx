import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PersonalInfo, ResumeCustomization } from "@/types/resume";
import { Palette, Eye, User } from "lucide-react";

interface CustomizeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customization: ResumeCustomization;
  personalInfo: PersonalInfo;
  onCustomizationChange: (customization: ResumeCustomization) => void;
  onPersonalInfoChange: (info: PersonalInfo) => void;
  onSave: () => void;
  onReset: () => void;
  onGenerateSummary?: () => void;
}

export const CustomizeDialog = ({
  open,
  onOpenChange,
  customization,
  personalInfo,
  onCustomizationChange,
  onPersonalInfoChange,
  onSave,
  onReset,
  onGenerateSummary,
}: CustomizeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Your Resume</DialogTitle>
          <DialogDescription>
            Personalize your resume appearance, visibility, and content
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="style" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="style">
              <Palette className="h-4 w-4 mr-2" />
              Style
            </TabsTrigger>
            <TabsTrigger value="sections">
              <Eye className="h-4 w-4 mr-2" />
              Sections
            </TabsTrigger>
            <TabsTrigger value="info">
              <User className="h-4 w-4 mr-2" />
              Personal Info
            </TabsTrigger>
          </TabsList>

          {/* Style Tab */}
          <TabsContent value="style" className="space-y-6 mt-4">
            <div className="space-y-3">
              <Label>Color Theme</Label>
              <RadioGroup
                value={customization.theme}
                onValueChange={(value) =>
                  onCustomizationChange({ ...customization, theme: value as any })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional" className="font-normal cursor-pointer">
                    Professional Blue
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="modern" id="modern" />
                  <Label htmlFor="modern" className="font-normal cursor-pointer">
                    Modern Purple
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="classic" id="classic" />
                  <Label htmlFor="classic" className="font-normal cursor-pointer">
                    Classic Black
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tech" id="tech" />
                  <Label htmlFor="tech" className="font-normal cursor-pointer">
                    Tech Green
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Font Size</Label>
              <RadioGroup
                value={customization.fontSize}
                onValueChange={(value) =>
                  onCustomizationChange({ ...customization, fontSize: value as any })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="small" />
                  <Label htmlFor="small" className="font-normal cursor-pointer">Small</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="font-normal cursor-pointer">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="large" />
                  <Label htmlFor="large" className="font-normal cursor-pointer">Large</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Spacing</Label>
              <RadioGroup
                value={customization.spacing}
                onValueChange={(value) =>
                  onCustomizationChange({ ...customization, spacing: value as any })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="compact" />
                  <Label htmlFor="compact" className="font-normal cursor-pointer">Compact</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="font-normal cursor-pointer">Standard</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spacious" id="spacious" />
                  <Label htmlFor="spacious" className="font-normal cursor-pointer">Spacious</Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>

          {/* Sections Tab */}
          <TabsContent value="sections" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">Toggle sections to show or hide them on your resume</p>
            
            {Object.entries(customization.visibleSections).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={key} className="font-normal capitalize cursor-pointer">
                  {key}
                </Label>
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) =>
                    onCustomizationChange({
                      ...customization,
                      visibleSections: { ...customization.visibleSections, [key]: checked },
                    })
                  }
                />
              </div>
            ))}
          </TabsContent>

          {/* Personal Info Tab */}
          <TabsContent value="info" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={personalInfo.name}
                    onChange={(e) =>
                      onPersonalInfoChange({ ...personalInfo, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={personalInfo.title}
                    onChange={(e) =>
                      onPersonalInfoChange({ ...personalInfo, title: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) =>
                      onPersonalInfoChange({ ...personalInfo, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) =>
                      onPersonalInfoChange({ ...personalInfo, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={personalInfo.location}
                  onChange={(e) =>
                    onPersonalInfoChange({ ...personalInfo, location: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={personalInfo.linkedin}
                    onChange={(e) =>
                      onPersonalInfoChange({ ...personalInfo, linkedin: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={personalInfo.github}
                    onChange={(e) =>
                      onPersonalInfoChange({ ...personalInfo, github: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <div className="flex gap-2">
                  <Textarea
                    id="summary"
                    rows={4}
                    value={personalInfo.summary}
                    onChange={(e) =>
                      onPersonalInfoChange({ ...personalInfo, summary: e.target.value })
                    }
                  />
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" onClick={onGenerateSummary}>
                      Auto-generate
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onPersonalInfoChange({ ...personalInfo, summary: '' })}>
                      Clear
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onReset}>
            Reset to Default
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={onSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
