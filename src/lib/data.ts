import { Github, Twitter, Figma } from "lucide-react";
import type {
  ExperienceDetails,
  ProjectDetails,
  TechDetails,
  TestimonialDetails,
} from "./types";

export const EXTERNAL_LINKS = {
  GITHUB: "https://github.com",
  TWITTER: "https://twitter.com",
  FIGMA: "https://www.figma.com",
};

export const NAV_LINKS = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Skills",
    href: "#skills",
  },
  {
    label: "Work",
    href: "#work",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export const SOCIAL_LINKS = [
  {
    icon: Github,
    url: EXTERNAL_LINKS.GITHUB,
  },
  {
    icon: Twitter,
    url: EXTERNAL_LINKS.TWITTER,
  },
  {
    icon: Figma,
    url: EXTERNAL_LINKS.FIGMA,
  },
];

export const TECHNOLOGIES: TechDetails[] = [
  {
    label: "JavaScript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    label: "TypeScript",
    url: "https://www.typescriptlang.org/",
  },
  {
    label: "React",
    url: "https://react.dev/",
  },
  {
    label: "Vite",
    url: "https://vitejs.dev/",
  },
  {
    label: "Node.js",
    url: "https://nodejs.org/en",
  },
  {
    label: "Express.js",
    url: "https://expressjs.com/",
  },
  {
    label: "MongoDB",
    url: "https://www.mongodb.com/",
  },
  {
    label: "PostgreSQL",
    url: "https://www.postgresql.org/",
  },
  {
    label: "Tailwindcss",
    url: "https://tailwindcss.com/",
  },
  {
    label: "Git",
    url: "https://git-scm.com/",
  },
];

export const EXPERIENCES: ExperienceDetails[] = [
  {
    logoAlt: "Company logo",
    position: "Senior Developer",
    startDate: new Date(2022, 0),
    currentlyWorkHere: true,
    summary: [
      "Building web applications with React and TypeScript",
      "Mentoring junior developers",
      "Designing system architecture",
    ],
  },
  {
    logoAlt: "Company logo",
    position: "Full Stack Developer",
    startDate: new Date(2020, 5),
    endDate: new Date(2021, 11),
    summary: [
      "Developed full stack applications using MERN stack",
      "Implemented RESTful APIs",
      "Optimized database queries",
    ],
  },
];

export const PROJECTS: ProjectDetails[] = [
  {
    name: "Project One",
    description:
      "A beautiful web application built with React and TypeScript, featuring a modern design and smooth user experience.",
    url: "https://github.com",
    technologies: ["React", "TypeScript", "Tailwindcss", "Vite"],
  },
  {
    name: "Project Two",
    description:
      "An e-commerce platform with advanced features like real-time inventory management and integrated payment processing.",
    url: "https://github.com",
    technologies: ["React", "Node.js", "PostgreSQL", "Express.js"],
  },
  {
    name: "Project Three",
    description:
      "A collaborative task management tool with real-time updates and team collaboration features.",
    url: "https://github.com",
    technologies: ["React", "Firebase", "Tailwindcss", "TypeScript"],
  },
];

export const TESTIMONIALS: TestimonialDetails[] = [
  {
    personName: "John Doe",
    title: "CEO - Tech Company",
    testimonial:
      "Working with this developer was an absolute pleasure. Highly recommended for any complex project!",
  },
  {
    personName: "Jane Smith",
    title: "Product Manager - Startup",
    testimonial:
      "Outstanding work on our recent project. Great attention to detail and excellent communication throughout.",
  },
  {
    personName: "Mike Johnson",
    title: "Freelancer",
    testimonial:
      "Delivered exactly what was promised on time. Professional and skilled developer.",
  },
];
