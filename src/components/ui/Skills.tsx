"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import {
    SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiHtml5, SiCss3,
    SiTailwindcss, SiBootstrap, SiRedux, SiMui, SiNodedotjs, SiExpress,
    SiMongodb, SiPostgresql, SiJsonwebtokens, SiGooglecloud,
    SiNginx, SiGit, SiGithub, SiPostman, SiFigma, SiFirebase, SiSocketdotio
} from "react-icons/si";
import { LayoutTemplate, Server, Binary, Layers, Code2, Cloud } from "lucide-react";

const skillCategories = [
    {
        title: "Languages",
        skills: [
            { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        ]
    },
    {
        title: "Frontend",
        skills: [
            { name: "React.js", icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
            { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
            { name: "CSS3", icon: SiCss3, color: "#1572B6" },
            { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
            { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
            { name: "Redux", icon: SiRedux, color: "#764ABC" },
            { name: "Zustand", icon: Layers, color: "#ffffff" },
            { name: "shadcn/ui", icon: LayoutTemplate, color: "#ffffff" },
            { name: "MUI", icon: SiMui, color: "#007FFF" },
        ]
    },
    {
        title: "Backend",
        skills: [
            { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
            { name: "Express.js", icon: SiExpress, color: "#ffffff" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
            { name: "SQL", icon: SiPostgresql, color: "#4169E1" },
            { name: "JWT", icon: SiJsonwebtokens, color: "#D63AFF" },
            { name: "WebSocket", icon: SiSocketdotio, color: "#ffffff" },
        ]
    },
    {
        title: "Cloud & DevOps",
        skills: [
            { name: "AWS EC2", icon: Cloud, color: "#FF9900" },
            { name: "GCP", icon: SiGooglecloud, color: "#4285F4" },
            { name: "Nginx", icon: SiNginx, color: "#009639" },
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "GitHub", icon: SiGithub, color: "#ffffff" },
        ]
    },
    {
        title: "Architecture & CS",
        skills: [
            { name: "REST API", icon: Server, color: "#ffffff" },
            { name: "MVC", icon: LayoutTemplate, color: "#ffffff" },
            { name: "Clean Arch", icon: Layers, color: "#ffffff" },
            { name: "SOLID", icon: Code2, color: "#ffffff" },
            { name: "DSA", icon: Binary, color: "#ffffff" },
        ]
    },
    {
        title: "Tools",
        skills: [
            { name: "Postman", icon: SiPostman, color: "#FF6C37" },
            { name: "Figma", icon: SiFigma, color: "#F24E1E" },
            { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
        ]
    }
];

const Skills = () => {
    return (
        <Section id="skills" className="items-center py-32">
            <div className="w-full max-w-7xl">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-display font-bold mb-20 text-center"
                >
                    SKILLS
                </motion.h2>

                <div className="space-y-16">
                    {skillCategories.map((category, catIndex) => (
                        <div key={category.title}>
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: catIndex * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-2xl font-light mb-8 text-secondary border-b border-white/10 pb-2 inline-block"
                            >
                                {category.title}
                            </motion.h3>

                            <div className="flex flex-wrap gap-4">
                                {category.skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: (catIndex * 0.1) + (index * 0.05), duration: 0.4 }}
                                        viewport={{ once: true }}
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: "rgba(255,255,255,0.1)",
                                            borderColor: "rgba(255,255,255,0.2)"
                                        }}
                                        className="group flex items-center gap-3 px-6 py-4 rounded-xl bg-glass border border-white/5 backdrop-blur-sm cursor-default transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                    >
                                        <skill.icon
                                            className="text-2xl transition-colors duration-300"
                                            style={{ color: skill.color }}
                                        />
                                        <span className="text-lg font-medium text-white/80 group-hover:text-white transition-colors">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Skills;
