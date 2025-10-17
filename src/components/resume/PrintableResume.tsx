import React from "react";
import { PersonalInfo, ResumeCustomization } from "@/types/resume";

export interface Props {
  personalInfo: PersonalInfo;
  customization: ResumeCustomization;
  ref?: React.Ref<HTMLDivElement>;
}

const PrintableResume = React.forwardRef<HTMLDivElement, Props>(({ personalInfo, customization }, ref) => {
  return (
    <div ref={ref as any} style={{ background: '#fff', color: '#000', padding: '24px', fontFamily: 'Inter, serif', width: '210mm', boxSizing: 'border-box' }}>
      <header>
        <h1 style={{ fontSize: '20pt', margin: 0 }}>{personalInfo.name}</h1>
        <p style={{ fontSize: '12pt', margin: '0.25em 0' }}>{personalInfo.title}</p>
        <p style={{ fontSize: '10pt', margin: '0.25em 0' }}>{personalInfo.email} • {personalInfo.phone} • {personalInfo.location}</p>
        <p style={{ fontSize: '10pt', margin: '0.25em 0' }}>{personalInfo.linkedin} {personalInfo.github ? `• ${personalInfo.github}` : ''}</p>
        <hr style={{ margin: '8px 0 12px', border: 'none', borderTop: '1px solid #000' }} />
      </header>

      {customization.visibleSections.summary && (
        <section>
          <h2 style={{ fontSize: '12pt', margin: '0 0 6px' }}>Professional Summary</h2>
          <p style={{ margin: 0 }}>{personalInfo.summary}</p>
        </section>
      )}

      {customization.visibleSections.experience && (
        <section style={{ marginTop: 10 }}>
          <h2 style={{ fontSize: '12pt', margin: '0 0 6px' }}>Experience</h2>
          <div>
            <h3 style={{ fontSize: '11pt', margin: '0 0 4px' }}>Software Engineering Intern — TechCorp Inc.</h3>
            <p style={{ margin: '0 0 6px', fontSize: '10pt' }}>Jun 2024 - Aug 2024</p>
            <ul>
              <li>Developed RESTful APIs using Node.js and Express, improving response time by 40%.</li>
              <li>Collaborated with cross-functional teams to deliver features for 100K+ users.</li>
            </ul>
          </div>
        </section>
      )}

      {customization.visibleSections.projects && (
        <section style={{ marginTop: 10 }}>
          <h2 style={{ fontSize: '12pt', margin: '0 0 6px' }}>Projects</h2>
          <div>
            <h3 style={{ fontSize: '11pt', margin: '0 0 4px' }}>AI Resume Builder</h3>
            <p style={{ margin: 0, fontSize: '10pt' }}>Developed an intelligent resume building platform that auto-generates professional resumes from user achievements.</p>
          </div>
        </section>
      )}

      {customization.visibleSections.education && (
        <section style={{ marginTop: 10 }}>
          <h2 style={{ fontSize: '12pt', margin: '0 0 6px' }}>Education & Certifications</h2>
          <div>
            <p style={{ margin: 0 }}><strong>B.S. Computer Science</strong>, University of California, Berkeley — 2022 - 2026</p>
          </div>
        </section>
      )}

      {customization.visibleSections.skills && (
        <section style={{ marginTop: 10 }}>
          <h2 style={{ fontSize: '12pt', margin: '0 0 6px' }}>Skills</h2>
          <p style={{ margin: 0 }}>JavaScript, TypeScript, React, Node.js, SQL, Git, Docker, AWS</p>
        </section>
      )}
    </div>
  );
});

export default PrintableResume;
