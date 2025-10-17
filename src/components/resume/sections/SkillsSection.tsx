import React from "react";

interface Props {
  skills: string[];
  frameworks: string[];
  tools: string[];
}

const SkillsSection: React.FC<Props> = ({ skills, frameworks, tools }) => (
  <section>
    <h2 className="text-2xl font-bold mb-4 text-primary">Skills</h2>
    <div className="space-y-3">
      <div>
        <p className="text-sm font-semibold mb-2">Programming Languages</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => <span key={idx} className="badge badge-outline">{skill}</span>)}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Frameworks & Libraries</p>
        <div className="flex flex-wrap gap-2">
          {frameworks.map((fw, idx) => <span key={idx} className="badge badge-outline">{fw}</span>)}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Tools & Technologies</p>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool, idx) => <span key={idx} className="badge badge-outline">{tool}</span>)}
        </div>
      </div>
    </div>
  </section>
);

export default SkillsSection;
