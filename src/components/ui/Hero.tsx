"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Section from "./Section";
import { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [currentRole, setCurrentRole] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Smooth mouse tracking for magnetic effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 200 });
    const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 200 });

    // Roles to cycle through
    const roles = [
        "Full Stack Developer",
        "Problem Solver",
        "Front End Developer",
    ];

    // Cycle through roles
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePosition({ x, y });
        mouseX.set(x - rect.width / 2);
        mouseY.set(y - rect.height / 2);
    };

    // Parallax effect for title
    const titleX = useTransform(smoothMouseX, [-300, 300], [-10, 10]);
    const titleY = useTransform(smoothMouseY, [-300, 300], [-10, 10]);

    // Generate floating particles
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
    }));

    return (
        <Section id="hero" className="items-start overflow-hidden relative">
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full bg-white/20"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Gradient Orbs */}
            <motion.div
                className="absolute top-1/4 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/4 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            {/* Hero Background SVG */}
            <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-1/2 pointer-events-none z-0 flex items-center justify-center opacity-20"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 0.2, x: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <img
                    src="/hero-bg.svg"
                    alt="Hero Background"
                    className="h-[70%] w-auto object-contain mr-8"
                />
            </motion.div>

            <div
                ref={containerRef}
                className="max-w-5xl z-10 relative w-full px-4 md:px-8 lg:px-0"
                onMouseMove={handleMouseMove}
            >
                {/* Main Title with Magnetic Effect */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ x: titleX, y: titleY }}
                    className="relative"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <h1 className="font-display font-bold tracking-tighter leading-[0.9] relative overflow-hidden cursor-default">
                        {/* White base text */}
                        <motion.span
                            className="block text-5xl md:text-6xl bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Hi, I'm
                        </motion.span>
                        <motion.span
                            className="block text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            DANIEL <span className="text-gray-500">XAVIER</span>
                        </motion.span>

                        {/* Brighter gradient overlay that appears on hover */}
                        <span
                            className="absolute inset-0 transition-opacity duration-500"
                            style={{
                                opacity: isHovering ? 1 : 0,
                            }}
                        >
                            <span className="block text-5xl md:text-6xl bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">Hi, I'm</span>
                            <span className="block text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">DANIEL XAVIER</span>
                        </span>

                        {/* Spotlight effect */}
                        {isHovering && (
                            <motion.div
                                className="absolute pointer-events-none"
                                style={{
                                    left: mousePosition.x,
                                    top: mousePosition.y,
                                    width: '500px',
                                    height: '500px',
                                    background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
                                    transform: 'translate(-50%, -50%)',
                                    filter: 'blur(50px)',
                                }}
                                animate={{
                                    scale: [1, 1.3, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        )}
                    </h1>
                </motion.div>

                {/* Animated Role Text */}
                <motion.div
                    className="mt-6 h-12 flex items-center"
                >
                    <motion.p
                        className="text-2xl md:text-3xl font-medium bg-gradient-to-r from-white/80 to-white/60 bg-clip-text text-transparent"
                    >
                        Full Stack Developer
                    </motion.p>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                    className="mt-6 text-xl md:text-2xl text-secondary max-w-3xl font-light leading-relaxed"
                >
                    Building digital products that hold strong under scale, shaped by logic, curiosity, and continuous improvement
                </motion.p>

                {/* Social Links with Enhanced Interactions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                    className="mt-8 flex items-center gap-4"
                >
                    {[
                        { icon: FaGithub, href: "https://github.com/xavierdaniel1997", label: "GitHub", color: "from-purple-500/20 to-blue-500/20" },
                        { icon: FaLinkedin, href: "https://www.linkedin.com/in/danielxavieroffical", label: "LinkedIn", color: "from-blue-500/20 to-cyan-500/20" },
                        { icon: FaXTwitter, href: "https://x.com/cx_daniel58507", label: "X", color: "from-gray-500/20 to-white/20" },
                        { icon: HiMail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=danielcx532@gmail.com", label: "Email", color: "from-red-500/20 to-orange-500/20" },
                    ].map((social, index) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            target={social.label !== "Email" ? "_blank" : undefined}
                            rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                            aria-label={social.label}
                            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                                delay: 0.7 + index * 0.1,
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1],
                                rotate: { type: "spring", stiffness: 200 }
                            }}
                            whileHover={{
                                scale: 1.15,
                                y: -6,
                                rotate: [0, -10, 10, 0],
                            }}
                            whileTap={{ scale: 0.9 }}
                            className="group relative w-14 h-14 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                        >
                            {/* Animated gradient background */}
                            <motion.div
                                className={`absolute inset-0 rounded-full bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />

                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />

                            <social.icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors duration-300 relative z-10" />

                            {/* Enhanced Tooltip */}
                            <motion.span
                                className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-xs text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg"
                                initial={{ y: -5 }}
                                whileHover={{ y: 0 }}
                            >
                                {social.label}
                            </motion.span>

                            {/* Ripple effect */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-white/30 opacity-0 group-hover:opacity-100"
                                initial={{ scale: 1 }}
                                whileHover={{
                                    scale: [1, 1.5],
                                    opacity: [0.5, 0],
                                }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                }}
                            />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Enhanced CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                    className="mt-10"
                >
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300"
                    >
                        {/* Animated background */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white"
                            animate={{
                                x: ["-100%", "100%"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />

                        <span className="relative z-10">Let's Connect</span>

                        <motion.svg
                            className="w-5 h-5 relative z-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{
                                x: [0, 5, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </motion.svg>
                    </motion.a>

                    {/* Secondary CTA */}
                    <motion.a
                        href="/DANIEL_XAVIER.pdf"
                        download="DANIEL_XAVIER.pdf"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="ml-4 inline-flex items-center gap-2 px-6 py-4 text-white/80 hover:text-white font-medium transition-all duration-300 group"
                    >
                        <span>Download Resume</span>
                        <motion.svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            whileHover={{
                                y: [0, 3, 0],
                            }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                            }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </motion.svg>
                    </motion.a>
                </motion.div>
            </div>
        </Section>
    );
};

export default Hero;
