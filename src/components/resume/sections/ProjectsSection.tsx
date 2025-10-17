import React from "react";

interface Project {
  title: string;
  tech: string;
  status: string;
  verified?: boolean;
  description?: string;
}

interface Props {
  projects: Project[];
}

const ProjectsSection: React.FC<Props> = ({ projects }) => (
  <section>
    <h2 className="text-2xl font-bold mb-4 text-primary">Projects</h2>
    <div className="space-y-4">
      {projects.map((proj, idx) => (
        <div key={idx}>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold">{proj.title}</h3>
              <p className="text-sm text-muted-foreground">{proj.tech}</p>
            </div>
            {proj.verified && <span className="badge badge-verified">Verified</span>}
            {!proj.verified && <span className="badge badge-outline">{proj.status}</span>}
          </div>
          {proj.description && <p className="text-muted-foreground">{proj.description}</p>}
        </div>
      ))}
    </div>
  </section>
);

export default ProjectsSection;
