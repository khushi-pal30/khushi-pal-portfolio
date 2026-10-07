import { motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { useRef, useState } from "react";
import React from "react";
import { ImageOff } from "lucide-react";

// Typewriter component
const Typewriter = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = React.useState("");
  React.useEffect(() => {
    let i = 0;
    let forward = true;
    let timeout: NodeJS.Timeout;
    function typeLoop() {
      if (forward) {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
          timeout = setTimeout(typeLoop, 60);
        } else {
          forward = false;
          timeout = setTimeout(typeLoop, 1200);
        }
      } else {
        if (i >= 0) {
          setDisplayed(text.slice(0, i));
          i--;
          timeout = setTimeout(typeLoop, 30);
        } else {
          forward = true;
          timeout = setTimeout(typeLoop, 600);
        }
      }
    }
    typeLoop();
    return () => clearTimeout(timeout);
  }, [text]);
  return (
    <span>
      {displayed}
      <span className="blinking-cursor">|</span>
    </span>
  );
};

// A single project card. All cards share the same fixed size so the grid
// stays clean. The image is shown in full (background-size: contain, so it's
// never cropped) inside that fixed box. Details reveal on hover (desktop) or
// tap (mobile) — the overlay has its own max-height + scroll, so a longer
// description is never cut off, it just scrolls within the card.
const ProjectCard = ({ project }: { project: Project }) => {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border cursor-pointer bg-background"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive((v) => !v)}
    >
      {/* Project image — same fixed box for every card, shown in full
          (letterboxed if needed, never cropped). No image yet -> placeholder. */}
      {project.image ? (
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/10 via-muted to-accent/10">
          <ImageOff className="w-7 h-7 text-muted-foreground/50" />
          <span className="text-xs text-muted-foreground/60 tracking-wide uppercase">Preview coming soon</span>
        </div>
      )}

      
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white
          bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/95 backdrop-blur-sm
          transition-opacity duration-300
          ${active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="w-full max-h-full overflow-y-auto flex flex-col items-center">
          <h3 className="text-lg md:text-xl font-serif mb-2">{project.title}</h3>

          <p className="text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 justify-center mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white/15 border border-white/30"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-sm px-5 py-2.5 rounded-full bg-white text-primary font-medium hover:bg-white/90 transition-colors"
              >
                Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-sm px-5 py-2.5 rounded-full bg-black/30 text-white font-medium border border-white/30 hover:bg-black/50 transition-colors"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Small persistent title strip at the bottom, only when the overlay is hidden */}
      <div
        className={`absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
          active ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <h3 className="text-white font-medium">{project.title}</h3>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="py-24 px-4 section-bg-gradient" ref={projectsRef}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-serif mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text"><Typewriter text="My Projects" /></span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Here are some of my recent works. Hover a project — or tap it on mobile — to see the details.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-16"
        >
         
        </motion.div>
      </div>

      <style>{`
        .blinking-cursor {
          display: inline-block;
          width: 1ch;
          animation: blink 1s steps(1) infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Projects;