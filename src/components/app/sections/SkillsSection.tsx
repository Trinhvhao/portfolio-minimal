import React from "react";
import { SkillTree } from "../SkillTree";

export const SkillsSection = React.memo(function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-20 px-6 w-full relative">
      <SkillTree />
    </section>
  );
});
