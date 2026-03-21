export type TechDetails = {
  logo?: string;
  darkModeLogo?: string;
  label: string;
  url: string;
  iconName?: string;
};

export type ExperienceDetails = {
  logo?: string;
  darkModeLogo?: string;
  logoAlt: string;
  position: string;
  currentlyWorkHere?: boolean;
  startDate: Date;
  endDate?: Date;
  summary: string[];
};

export type ProjectDetails = {
  name: string;
  description: string;
  url: string;
  previewImage?: string;
  technologies: string[];
};

export type TestimonialDetails = {
  personName: string;
  personAvatar?: string;
  testimonial: string;
  title: string;
};
