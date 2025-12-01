"use client";

import { motion } from "framer-motion";
import Section from "./Section";

const About = () => {
    return (
        <Section id="about" className="items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 w-full max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">ABOUT ME</h2>
                    <p className="text-xl text-secondary leading-relaxed">
                        I'm a full-stack developer who enjoys building applications that can grow with their users and ideas. I approach problems with structure and logic, focusing on long-term performance rather than quick fixes. I'm driven by curiosity and constantly learn by diving into new challenges head-first. For me, development is about understanding how things work, improving them, and creating solutions that last.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative group"
                >
                    {/* Code Editor Window - VS Code Style with Glass Effect */}
                    <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#1e1e1e]/30 backdrop-blur-xl hover:bg-[#1e1e1e]/40 transition-all duration-300 shadow-2xl">
                        {/* Window Header */}
                        <div className="bg-[#323233]/40 px-4 py-3 flex items-center justify-between border-b border-white/10 backdrop-blur-sm">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]/80 group-hover:bg-[#ff5f56] transition-colors" />
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 group-hover:bg-[#ffbd2e] transition-colors" />
                                <div className="w-3 h-3 rounded-full bg-[#27c93f]/80 group-hover:bg-[#27c93f] transition-colors" />
                            </div>
                            <div className="flex-1 text-center">
                                <span className="text-xs text-white/70 font-mono">my-story.tsx</span>
                            </div>
                            <div className="w-16" />
                        </div>

                        {/* Tab Bar */}
                        <div className="bg-[#252526]/40 px-2 py-0 flex items-center border-b border-white/10 backdrop-blur-sm">
                            <div className="px-3 py-2 bg-[#1e1e1e]/40 text-xs text-white/90 font-mono border-r border-white/10">
                                my-story.tsx
                            </div>
                        </div>

                        {/* Code Content */}
                        <div className="p-6 font-mono text-sm overflow-x-auto">
                            <div className="space-y-1">
                                {/* Line 1 */}
                                <motion.div
                                    className="flex gap-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="text-white/30 select-none w-6 text-right">1</span>
                                    <span>
                                        <span className="text-[#c586c0]">const</span>
                                        <span className="text-[#9cdcfe]"> developer</span>
                                        <span className="text-white/70"> = {`{`}</span>
                                    </span>
                                </motion.div>

                                {/* Line 2 */}
                                <motion.div
                                    className="flex gap-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="text-white/30 select-none w-6 text-right">2</span>
                                    <span>
                                        <span className="text-white/60">  </span>
                                        <span className="text-[#9cdcfe]">philosophy</span>
                                        <span className="text-white/70">: </span>
                                        <span className="text-[#ce9178]">"Minimalism for focus"</span>
                                        <span className="text-white/70">,</span>
                                    </span>
                                </motion.div>

                                {/* Line 3 */}
                                <motion.div
                                    className="flex gap-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="text-white/30 select-none w-6 text-right">3</span>
                                    <span>
                                        <span className="text-white/60">  </span>
                                        <span className="text-[#9cdcfe]">approach</span>
                                        <span className="text-white/70">: </span>
                                        <span className="text-[#ce9178]">"Build to last, not to patch"</span>
                                        <span className="text-white/70">,</span>
                                    </span>
                                </motion.div>

                                {/* Line 4 */}
                                <motion.div
                                    className="flex gap-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="text-white/30 select-none w-6 text-right">4</span>
                                    <span>
                                        <span className="text-white/60">  </span>
                                        <span className="text-[#9cdcfe]">drivenBy</span>
                                        <span className="text-white/70">: [</span>
                                        <span className="text-[#ce9178]">"curiosity"</span>
                                        <span className="text-white/70">, </span>
                                        <span className="text-[#ce9178]">"challenge"</span>
                                        <span className="text-white/70">],</span>
                                    </span>
                                </motion.div>

                                {/* Line 5 */}
                                <motion.div
                                    className="flex gap-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="text-white/30 select-none w-6 text-right">5</span>
                                    <span>
                                        <span className="text-white/60">  </span>
                                        <span className="text-[#dcdcaa]">build</span>
                                        <span className="text-white/70">: () {`=>`} </span>
                                        <span className="text-[#ce9178]">"Solutions that scale"</span>
                                    </span>
                                </motion.div>

                                {/* Line 6 */}
                                <motion.div
                                    className="flex gap-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="text-white/30 select-none w-6 text-right">6</span>
                                    <span className="text-white/70">{`}`};</span>
                                </motion.div>

                                {/* Line 7 - Empty */}
                                <div className="flex gap-6">
                                    <span className="text-white/30 select-none w-6 text-right">7</span>
                                    <span />
                                </div>

                                {/* Line 8 - Comment */}
                                <motion.div
                                    className="flex gap-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="text-white/30 select-none w-6 text-right">8</span>
                                    <span className="text-[#6a9955]">// Every line of code tells a story</span>
                                </motion.div>

                                {/* Line 9 - Cursor */}
                                <motion.div
                                    className="flex gap-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="text-white/30 select-none w-6 text-right">9</span>
                                    <span className="flex items-center">
                                        <motion.span
                                            className="inline-block w-2 h-5 bg-white ml-0.5"
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        />
                                    </span>
                                </motion.div>
                            </div>
                        </div>

                        {/* Status Bar */}
                        <div className="bg-[#007acc]/60 backdrop-blur-sm px-4 py-1.5 flex items-center justify-between text-xs font-mono border-t border-white/10">
                            <div className="flex items-center gap-4">
                                <span className="text-white/95">TypeScript React</span>
                                <span className="text-white/70">UTF-8</span>
                            </div>
                            <div className="text-white/90">Ln 9, Col 1</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default About;
