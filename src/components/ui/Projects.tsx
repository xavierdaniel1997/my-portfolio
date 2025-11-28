"use client";

import { motion } from "framer-motion";
import Section from "./Section";

const projects = [
    { title: "Project Alpha", category: "Web App", year: "2024" },
    { title: "Neon Dreams", category: "3D Experience", year: "2023" },
    { title: "Zenith", category: "E-commerce", year: "2023" },
    { title: "Apex", category: "Mobile App", year: "2022" },
];

const Projects = () => {
    return (
        <Section id="projects" className="items-center overflow-hidden">
            <div className="w-full max-w-7xl">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-display font-bold mb-12 px-4"
                >
                    SELECTED WORKS
                </motion.h2>

                <div className="flex gap-8 overflow-x-auto pb-12 px-4 snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="min-w-[300px] md:min-w-[400px] h-[500px] bg-glass border border-white/10 rounded-3xl p-8 flex flex-col justify-between snap-center hover:bg-glass-hover transition-colors group cursor-pointer"
                        >
                            <div className="w-full h-1/2 bg-white/5 rounded-2xl mb-6 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <h3 className="text-3xl font-bold">{project.title}</h3>
                                    <span className="text-sm text-secondary">{project.year}</span>
                                </div>
                                <p className="text-secondary">{project.category}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Projects;
