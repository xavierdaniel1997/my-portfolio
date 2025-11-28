"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { Send } from "lucide-react";

const Contact = () => {
    return (
        <Section id="contact" className="items-center">
            <div className="w-full max-w-4xl text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-display font-bold mb-8"
                >
                    LET'S TALK
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-secondary mb-12"
                >
                    Have a project in mind? Let's build something extraordinary together.
                </motion.p>

                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-md mx-auto space-y-6"
                >
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full bg-glass border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                        />
                    </div>
                    <div className="relative group">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-glass border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                        />
                    </div>
                    <div className="relative group">
                        <textarea
                            placeholder="Message"
                            rows={4}
                            className="w-full bg-glass border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                        />
                    </div>

                    <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group">
                        <span>Send Message</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.form>
            </div>
        </Section>
    );
};

export default Contact;
