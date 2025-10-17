import React from "react";

interface Experience {
  title: string;
  company: string;
  duration: string;
  verified?: boolean;
  details?: string[];
}

interface Props {
  experiences: Experience[];
}

const ExperienceSection: React.FC<Props> = ({ experiences }) => (
  <section>
    <h2 className="text-2xl font-bold mb-4 text-primary">Experience</h2>
    <div className="space-y-6">
      {experiences.map((exp, idx) => (
        <div key={idx}>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold">{exp.title}</h3>
              <p className="text-muted-foreground">{exp.company}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{exp.duration}</p>
              {exp.verified && <span className="badge badge-verified">Verified</span>}
            </div>
          </div>
          {exp.details && (
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
              {exp.details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          )}
        </div>
      ))}
    </div>
  </section>
);

export default ExperienceSection;
