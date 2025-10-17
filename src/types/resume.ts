export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface ResumeCustomization {
  theme: 'professional' | 'modern' | 'classic' | 'tech';
  fontSize: 'small' | 'medium' | 'large';
  spacing: 'compact' | 'standard' | 'spacious';
  visibleSections: {
    summary: boolean;
    experience: boolean;
    projects: boolean;
    education: boolean;
    achievements: boolean;
    skills: boolean;
  };
}

export const DEFAULT_CUSTOMIZATION: ResumeCustomization = {
  theme: 'professional',
  fontSize: 'medium',
  spacing: 'standard',
  visibleSections: {
    summary: true,
    experience: true,
    projects: true,
    education: true,
    achievements: true,
    skills: true,
  },
};

export const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  name: 'Alex Thompson',
  title: 'Full-Stack Developer & Software Engineer',
  email: 'alex.thompson@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/alexthompson',
  github: 'github.com/alexthompson',
  summary: 'Results-driven Full-Stack Developer with 2+ years of experience building scalable web applications. Proven track record in hackathon competitions, internships at leading tech companies, and continuous learning through professional certifications. Passionate about creating innovative solutions and contributing to impactful projects.',
};
