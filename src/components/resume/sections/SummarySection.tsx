import React from "react";

interface Props {
  summary: string;
}

const SummarySection: React.FC<Props> = ({ summary }) => (
  <section>
    <h2 className="text-2xl font-bold mb-4 text-primary">Professional Summary</h2>
    <p className="text-muted-foreground leading-relaxed">{summary}</p>
  </section>
);

export default SummarySection;
