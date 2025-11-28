"use client";

import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { useState, useEffect } from "react";
import clsx from "clsx";

const navItems = [
    { name: "Home", target: "#hero" },
    { name: "About", target: "#about" },
    { name: "Skills", target: "#skills" },
    { name: "Projects", target: "#projects" },
    { name: "Contact", target: "#contact" },
];

const Navbar = () => {
    const lenis = useLenis();
    const [active, setActive] = useState("Home");
    const [scrolled, setScrolled] = useState(false);

    // Track active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Intersection Observer to track which section is in view
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-50% 0px -50% 0px", // Trigger when section is in the middle of viewport
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

        // Observe all sections
        navItems.forEach((item) => {
            const sectionId = item.target.replace("#", "");
            const element = document.getElementById(sectionId);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleScrollTo = (target: string, name: string) => {
        if (lenis) {
            lenis.scrollTo(target, { duration: 1.5 });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 flex justify-center py-6 transition-all duration-300",
                scrolled ? "py-4 bg-black/10 backdrop-blur-md border-b border-white/5" : "bg-transparent"
            )}
        >
            <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg">
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
        </motion.nav>
    );
};

export default Navbar;
