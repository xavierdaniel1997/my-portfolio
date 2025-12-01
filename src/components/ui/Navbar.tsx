"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";

const navItems = [
    { name: "Home", target: "#hero" },
    { name: "About", target: "#about" },
    { name: "Skills", target: "#skills" },
    { name: "Projects", target: "#projects" },
    { name: "Contact", target: "#contact" },
];

const socialLinks = [
    { icon: FaGithub, href: "https://github.com/xavierdaniel1997", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/danielxavieroffical", label: "LinkedIn" },
    { icon: FaXTwitter, href: "https://x.com/cx_daniel58507", label: "X" },
    { icon: HiMail, href: "mailto:danielcx532@gmail.com", label: "Email" },
];

const Navbar = () => {
    const lenis = useLenis();
    const [active, setActive] = useState("Home");
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Intersection Observer for active section
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-50% 0px -50% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const navItem = navItems.find(item => item.target === `#${sectionId}`);
                    if (navItem) {
                        setActive(navItem.name);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        navItems.forEach((item) => {
            const sectionId = item.target.replace("#", "");
            const element = document.getElementById(sectionId);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const handleScrollTo = (target: string, name: string) => {
        if (lenis) {
            lenis.scrollTo(target, { duration: 1.5 });
        }
        setMobileMenuOpen(false);
    };

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 md:py-6 transition-all duration-300 px-4 md:px-8",
                    scrolled ? "py-3 md:py-4 bg-black/10 backdrop-blur-md border-b border-white/5" : "bg-transparent"
                )}
            >
                {/* Logo/Brand */}
                <motion.div
                    className="md:hidden text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                >
                    DX
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg mx-auto">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleScrollTo(item.target, item.name)}
                            className={clsx(
                                "relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300",
                                active === item.name ? "text-black" : "text-white hover:text-white/80"
                            )}
                        >
                            {active === item.name && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-white rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{item.name}</span>
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-lg text-white hover:bg-white/10 transition-colors"
                    aria-label="Toggle menu"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <AnimatePresence mode="wait">
                        {mobileMenuOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={20} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu size={20} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Enhanced Side Menu */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-80 bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 md:hidden overflow-y-auto"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-white/10">
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-xl font-bold border border-white/10">
                                        DX
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">Daniel Xavier</h3>
                                        <p className="text-xs text-white/60">Full Stack Developer</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Navigation Links */}
                            <div className="p-6">
                                <p className="text-xs font-mono text-white/40 mb-4 uppercase tracking-wider">Navigation</p>
                                {navItems.map((item, index) => (
                                    <motion.button
                                        key={item.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                        onClick={() => handleScrollTo(item.target, item.name)}
                                        className={clsx(
                                            "relative w-full py-3 px-4 text-left text-base font-medium transition-all duration-300 rounded-xl mb-2",
                                            active === item.name
                                                ? "text-black bg-white"
                                                : "text-white/70 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        {item.name}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="px-6 py-4 border-t border-white/10">
                                <p className="text-xs font-mono text-white/40 mb-4 uppercase tracking-wider">Connect</p>
                                <div className="grid grid-cols-4 gap-3">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="aspect-square flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                                        >
                                            <social.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Info */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-black/50"
                            >
                                <p className="text-xs text-white/40 text-center">
                                    © 2025 Daniel Xavier<br />
                                    <span className="text-white/30">Building digital excellence</span>
                                </p>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
