export interface Profile {
  name: string;
  initials: string;
  title: string;
  tagline: string;
  description: string;
  chips: string[];
  email: string;
  phone: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
  cvUrl: string;
  profileImage: string;
}

export interface About {
  paragraphs: string[];
  badges: { label: string; color: string }[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  summary?: string;
  bullets: string[];
  tech: string[];
  featured?: boolean;
}

export interface Project {
  id: string;
  title: string;
  level: "featured" | "advanced";
  commits?: number;
  description: string;
  tech: string[];
  private: boolean;
  github?: string;
  demo?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  cgpa?: string;
  research?: string;
  publications: { title: string; journal: string; date: string }[];
}
