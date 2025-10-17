import React from "react";

interface Achievement {
  title: string;
  subtitle: string;
  date: string;
  verified?: boolean;
}

interface Props {
  achievements: Achievement[];
}

const AchievementsSection: React.FC<Props> = ({ achievements }) => (
  <section>
    <h2 className="text-2xl font-bold mb-4 text-primary">Achievements</h2>
    <div className="space-y-2">
      {achievements.map((ach, idx) => (
        <div key={idx} className="flex items-start justify-between">
          <p className="text-muted-foreground">{ach.title} - {ach.subtitle} ({ach.date})</p>
          {ach.verified && <span className="badge badge-verified">Verified</span>}
        </div>
      ))}
    </div>
  </section>
);

export default AchievementsSection;
