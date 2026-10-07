export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export const projects = [
  {
    id: 1,
    title: "SiratUlAmal",
    description: "A faith and community app that helps users track their five daily prayers, build lasting streaks, connect with scholars and the community, and ask Q&A/Fatwa — all in one place.",
    tags: ["Python", "django", "Postgre"],
    image: "/projects/siratulamal.png",
    demoUrl: "https://siratulamal.wesalvator.com/",
    repoUrl: ""
  },
   {
    id: 2,
    title: "EzShops",
    description: "A multi-vendor marketplace app where users can shop from trusted vendors, sellers can list and manage their products, and delivery partners can accept and track orders — all in one platform.",
    tags: ["Python", "django", "Postgre"],
    image: "/projects/ez.png",
    demoUrl: "https://ezshops.in/",
    repoUrl: ""
  },
  {
    id: 3,
    title: "Gas Booking System",
    description: "A Gas Booking System is an application that allows customers to book LPG cylinders online. It helps agencies manage bookings, customers, and deliveries efficiently.",
    tags: ["Python", "django", "sqlite"],
    image: "/projects/gas.jpeg",
    demoUrl: "https://gas-booking-system-3.onrender.com/",
    repoUrl: ""
  },
  {
    id: 4,
    title: "Fake Reviews Detection For Movies",
    description: "Fake Reviews Detection for Movies is a system that analyzes movie reviews using machine learning techniques to identify and filter out fake or spam reviews.",
    tags: ["Python", "Django", "dbsqlite","ML Model"],
    image: "/projects/fake.jpeg",
    demoUrl: "",
    repoUrl: ""
  },
  {
    id: 5,
    title: "OM Enterprises- Invoice Manager",
    description: "A project designed to generate, manage, and track invoices efficiently. It helps businesses maintain billing records, manage customer details, and streamline the overall invoicing process.",
    tags: ["Python", "Djnago", "dbsqlite"],
    image: "/projects/om.jpeg",
    demoUrl: "https://om-enterprises-invoice-manager-p296.onrender.com/dashboard/",
    repoUrl: ""
  },
  {
    id: 6,
    title: "Aradhyra Enterprises Website",
    description: "A project features a clean frontend interface where customers can explore available products and view detailed product information easily.",
    tags: ["React.js", "Html", "CSS"],
    image: "/projects/ara.jpeg",
    demoUrl: "https://aradhyaenterprisesfrontend.vercel.app/",
    repoUrl: ""
  },
  

];