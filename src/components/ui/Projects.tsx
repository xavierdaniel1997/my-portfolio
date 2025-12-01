"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Section from "./Section";

const projects = [
    {
        title: "FootFlex",
        category: "E-commerce Application",
        description: "A comprehensive e-commerce platform for footwear enthusiasts. Features include user authentication, product filtering, cart management, and secure checkout integration.",
        tech: ["MERN Stack", "Redux", "Stripe", "Tailwind"],
        year: "2024",
        image: "/footflex_project.png",
        github: "https://github.com/xavierdaniel1997/footflex",
        live: "https://footflex.demo.com"
    },
    {
        title: "TeamSync",
        category: "Project Management System",
        description: "A collaborative project management tool designed for remote teams. Includes real-time task updates, kanban boards, team chat, and progress tracking.",
        tech: ["MERN Stack", "Socket.io", "Chakra UI", "JWT"],
        year: "2024",
        image: "/teamsync_project.png",
        github: "https://github.com/xavierdaniel1997/teamsync",
        live: "https://teamsync.demo.com"
    },
    {
        title: "MyBus",
        category: "Bus Booking App",
        description: "A mobile-first bus booking application simplifying travel. Users can search routes, select seats, book tickets, and track buses in real-time.",
        tech: ["React Native", "Node.js", "MongoDB", "Google Maps"],
        year: "2023",
        image: "/mybus_project.png",
        github: "https://github.com/xavierdaniel1997/mybus",
        live: "https://mybus.demo.com"
    },
];

import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Projects = () => {
    return (
        <Section id="projects" className="items-center overflow-hidden py-20">
            <div className="w-full max-w-7xl">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-display font-bold mb-16 px-4"
                >
                    PROJECTS
                </motion.h2>

                <div className="flex gap-8 overflow-x-auto pb-12 px-4 snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="min-w-[350px] md:min-w-[450px] bg-glass border border-white/10 rounded-3xl overflow-hidden flex flex-col snap-center hover:bg-glass-hover transition-all duration-300 group"
                        >
                            {/* Project Image */}
                            <div className="w-full h-64 bg-white/5 overflow-hidden relative">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-3xl font-bold mb-1">{project.title}</h3>
                                        <p className="text-sm text-secondary font-mono">{project.category}</p>
                                    </div>
                                    <span className="text-xs font-mono border border-white/20 px-2 py-1 rounded-full text-white/60">{project.year}</span>
                                </div>

                                <p className="text-secondary/80 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                                    {project.tech.map((tech) => (
                                        <span key={tech} className="text-xs font-medium px-3 py-1 bg-white/5 rounded-full text-white/70 border border-white/5">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                                    >
                                        <FaGithub className="text-lg" />
                                        <span>Code</span>
                                    </a>
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors ml-auto"
                                    >
                                        <span>Live Demo</span>
                                        <FaExternalLinkAlt className="text-sm" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Projects;
