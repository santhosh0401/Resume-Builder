import React from "react";

interface Education {
  degree: string;
  institution: string;
  years: string;
}

interface Certification {
  title: string;
  platform: string;
  completed: string;
  verified?: boolean;
}

interface Props {
  education: Education[];
  certifications: Certification[];
}

const EducationSection: React.FC<Props> = ({ education, certifications }) => (
  <section>
    <h2 className="text-2xl font-bold mb-4 text-primary">Education & Certifications</h2>
    <div className="space-y-4">
      {education.map((edu, idx) => (
        <div key={idx}>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold">{edu.degree}</h3>
              <p className="text-muted-foreground">{edu.institution}</p>
            </div>
            <p className="text-sm font-medium">{edu.years}</p>
          </div>
        </div>
      ))}
      {certifications.map((cert, idx) => (
        <div key={idx}>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold">{cert.title}</h3>
              <p className="text-muted-foreground">{cert.platform}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{cert.completed}</p>
              {cert.verified && <span className="badge badge-verified">Verified</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default EducationSection;
