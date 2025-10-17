import React from "react";
import { PersonalInfo } from "@/types/resume";

interface Props {
  personalInfo: PersonalInfo;
}

const PersonalInfoSection: React.FC<Props> = ({ personalInfo }) => (
  <section className="text-center mb-8">
    <h1 className="text-4xl font-bold mb-2">{personalInfo.name}</h1>
    <p className="text-xl text-muted-foreground mb-4">{personalInfo.title}</p>
    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
      <div className="flex items-center gap-2">
        <span className="material-icons">mail</span>
        {personalInfo.email}
      </div>
      <div className="flex items-center gap-2">
        <span className="material-icons">phone</span>
        {personalInfo.phone}
      </div>
      <div className="flex items-center gap-2">
        <span className="material-icons">location_on</span>
        {personalInfo.location}
      </div>
    </div>
    <div className="flex items-center justify-center gap-4 mt-4">
      {personalInfo.linkedin && <a href={personalInfo.linkedin} className="btn-link">LinkedIn</a>}
      {personalInfo.github && <a href={personalInfo.github} className="btn-link">GitHub</a>}
    </div>
  </section>
);

export default PersonalInfoSection;
