"use client";

import { motion, PanInfo } from "framer-motion";
import Image from "next/image";
import Section from "./Section";
import { useState } from "react";

const projects = [

    {
        title: "TeamSync",
        category: "Agile Project Management Platform",
        description: "Built a comprehensive project management platform for Agile workflows featuring epics, user stories, backlogs, sprints, and real-time progress tracking. Integrated Socket.io and ZegoCloud for team chat and video calls, with live notifications and Stripe subscription management.",
        tech: ["React js", "TanStack Query", "Redux", "Tailwind CSS", "Material-UI", "Node.js", "Express.js", "MongoDB", "Socket.io", "ZegoCloud", "Google OAuth", "Stripe", "Cloudinary", "Nodemailer"],
        image: "/teamsync.png",
        githubFrontend: "https://github.com/xavierdaniel1997/teamsync_frontend",
        githubBackend: "https://github.com/xavierdaniel1997/teamsync_backend",
        // live: "https://teamsync.demo.com"
    },
    {
        title: "MyBus",
        category: "Bus Booking App",
        description: "A mobile-first bus booking application simplifying travel. Users can search routes, select seats, book tickets, and track buses in real-time.",
        tech: ["Next js", "Zustand", "Tailwind CSS", "Node.js", "Express js", "MongoDB"],
        year: "2023",
        image: "/mybus.png",
        githubFrontend: "https://github.com/xavierdaniel1997/mybus-client",
        githubBackend: "https://github.com/xavierdaniel1997/mybus-server",
        live: "https://www.mybus.buzz"
    },
    {
        title: "FootFlex",
        category: "Full-Stack E-commerce Platform",
        description: "Built a comprehensive e-commerce platform for seamless buying and selling of footwear. Features responsive UI with React and Material-UI, secure authentication with JWT and Google OAuth, Razorpay payment integration, and Cloudinary-powered image management.",
        tech: ["React", "Redux Toolkit", "Material-UI", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Google OAuth", "Razorpay", "Cloudinary"],
        image: "/footflex.png",
        githubFrontend: "https://github.com/xavierdaniel1997/footflex-client",
        githubBackend: "https://github.com/xavierdaniel1997/footflex-server",
        live: "https://footflex-client-kappa.vercel.app/"
    },
];

import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
    const [showAllTech, setShowAllTech] = useState(false);
    const techLimit = 4;
    const hasMoreTech = project.tech.length > techLimit;
    const displayedTech = showAllTech ? project.tech : project.tech.slice(0, techLimit);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
            className="min-w-[280px] sm:min-w-[350px] md:min-w-[450px] bg-glass border border-white/10 rounded-3xl overflow-hidden flex flex-col snap-center hover:bg-glass-hover transition-all duration-300 group"
        >
            {/* Project Image */}
            <div className="w-full h-48 sm:h-56 md:h-64 bg-white/5 overflow-hidden relative">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, 450px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading={index === 0 ? "eager" : "lazy"}
                    quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3 md:mb-4">
                    <div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">{project.title}</h3>
                        <p className="text-xs sm:text-sm text-secondary font-mono">{project.category}</p>
                    </div>
                </div>

                <p className="text-secondary/80 text-xs sm:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-3">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-3 md:mb-4 mt-auto">
                    <motion.div
                        className="flex flex-wrap gap-1.5 sm:gap-2"
                        initial={false}
                        animate={{ height: "auto" }}
                    >
                        {displayedTech.map((tech) => (
                            <motion.span
                                key={tech}
                                className="text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 bg-white/5 rounded-full text-white/70 border border-white/5"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Show More/Less Button */}
                    {hasMoreTech && (
                        <motion.button
                            onClick={() => setShowAllTech(!showAllTech)}
                            className="mt-2 sm:mt-3 flex items-center gap-1.5 text-[10px] sm:text-xs text-white/60 hover:text-white transition-colors group/btn"
                            whileHover={{ x: 3 }}
                        >
                            <span>{showAllTech ? 'Show Less' : `Show ${project.tech.length - techLimit} More`}</span>
                            <motion.div
                                animate={{ rotate: showAllTech ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FaChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            </motion.div>
                        </motion.button>
                    )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/10 mt-3 sm:mt-4 flex-wrap">
                    {project.githubFrontend && (
                        <a
                            href={project.githubFrontend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-colors"
                        >
                            <FaGithub className="text-base sm:text-lg" />
                            <span>Frontend</span>
                        </a>
                    )}
                    {project.githubBackend && (
                        <a
                            href={project.githubBackend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-colors"
                        >
                            <FaGithub className="text-base sm:text-lg" />
                            <span>Backend</span>
                        </a>
                    )}
                    {project.live && <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-colors sm:ml-auto"
                    >
                        <span>Live Demo</span>
                        <FaExternalLinkAlt className="text-xs sm:text-sm" />
                    </a>}
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const handleDragEnd = (_: any, info: PanInfo) => {
        const threshold = 50;
        if (info.offset.x < -threshold) {
            handleNext();
        } else if (info.offset.x > threshold) {
            handlePrev();
        }
    };

    return (
        <Section id="projects" className="items-center overflow-hidden py-20">
            <div className="w-full max-w-7xl">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-8 sm:mb-12 md:mb-16 px-4"
                >
                    PROJECTS
                </motion.h2>

                {/* Mobile carousel */}
                <div className="flex sm:hidden flex-col items-center px-4 pb-8">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="w-full flex justify-center"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={handleDragEnd}
                    >
                        <ProjectCard project={projects[currentIndex]} index={currentIndex} />
                    </motion.div>

                    <div className="mt-4 flex items-center justify-between w-full max-w-xs">
                        <button
                            onClick={handlePrev}
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors"
                            aria-label="Previous project"
                        >
                            <FaChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2">
                            {projects.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-2 w-2 rounded-full transition-all duration-200 ${idx === currentIndex ? "bg-white/90 w-4" : "bg-white/30"}`}
                                    aria-label={`Go to project ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors"
                            aria-label="Next project"
                        >
                            <FaChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Existing horizontal scroll for sm+ */}
                <div
                    className="hidden sm:flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-8 sm:pb-10 md:pb-12 px-4 snap-x snap-mandatory touch-pan-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Projects;
