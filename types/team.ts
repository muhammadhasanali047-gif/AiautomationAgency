export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tagline: string;
  description: string;
  image: string;
  accent: {
    gradient: string;
    borderHover: string;
    pillBg: string;
    pillText: string;
    badgeGlow: string;
  };
  skills: string[];
  detailedExpertise: string[];
  keyDeliverables: string[];
  linkedinUrl?: string;
}
