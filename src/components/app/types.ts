import type React from "react";

export type Project = {
  title: string;
  tags: string[];
  image: string;
  colSpan: string;
};

export type Capability = {
  title: string;
  description: string;
  tags: string[];
};

export type LabItem = {
  id: string;
  title: string;
  category: string;
  Visual: () => React.JSX.Element;
};

export type ArchiveItem = {
  year: string;
  title: string;
  role: string;
  tech: string;
  link: string;
  image: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type Experience = {
  company: string;
  year: string;
  description: string;
};
