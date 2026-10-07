export interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
  techStack?: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: 2,
    company: "WeSalvator",
    role: "Backend Developer Intern (Python & Django)",
    duration: "March 2026 - August 2026",
    location: "Remote",
    description: [
      "Worked as a Backend Developer Intern at WeSalvator, building and improving web applications using Python and the Django framework.",
      "Designed, developed, and tested backend functionality for production web applications.",
      "Developed and integrated RESTful APIs, and worked with databases to implement core application features.",
      "Optimized performance and helped ensure the reliability and scalability of applications.",
      "Recognized for strong analytical and problem-solving skills, a positive attitude for learning, and professional, collaborative teamwork."
    ],
    techStack: ["Python", "Django", "REST API", "Database Design"]
  },
  {
    id: 1,
    company: "Analyze Infotech",
    role: "Python Developer",
    duration: "July 2024 - September 2024",
    location: "Lucknow",
    description: [
      "Worked as a Python Developer Intern at Analyze Infotech.",
      "Developed scalable web applications using Python, Django, and Django REST Framework (DRF).",
      "Designed and implemented RESTful APIs with authentication and authorization.",
      "Managed databases using SQL and optimized queries for better performance.",
      "Performed testing, debugging, and API validation using Postman."
    ],
    techStack: ["Python", "djnago","DRF", "pandas", "numpy", "matplotlib", "ML"]
  },
  
];