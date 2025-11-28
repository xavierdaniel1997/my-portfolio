"use client";

import { motion } from "framer-motion";
import Section from "./Section";

const About = () => {
    return (
        <Section id="about" className="items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">ABOUT ME</h2>
                    <p className="text-xl text-secondary leading-relaxed">
                        I'm a passionate developer with a keen eye for design. I bridge the gap between engineering and aesthetics, creating software that not only works perfectly but feels amazing to use.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="p-8 rounded-3xl bg-glass border border-white/10 backdrop-blur-md hover:bg-glass-hover transition-colors duration-500"
                >
                    <h3 className="text-2xl font-bold mb-4">Philosophy</h3>
                    <p className="text-secondary mb-6">
                        Minimalism is not about subtraction for the sake of subtraction. It is about subtraction for the sake of focus.
                    </p>
                    <div className="flex gap-4">
                        <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                        <div className="h-2 w-2 rounded-full bg-white animate-pulse delay-75" />
                        <div className="h-2 w-2 rounded-full bg-white animate-pulse delay-150" />
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default About;
