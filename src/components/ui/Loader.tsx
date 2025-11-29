"use client";



import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";

export default function Loader() {
    const { setIsLoading, isLoading } = useStore();
    const [displayProgress, setDisplayProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Random increment for organic feel
                const increment = Math.random() * 1.5 + 0.5;
                return Math.min(prev + increment, 100);
            });
        }, 20);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (displayProgress === 100) {
            const timeout = setTimeout(() => {
                setIsLoading(false);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [displayProgress, setIsLoading]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
                >
                    <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mb-4 relative">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-white"
                            initial={{ width: 0 }}
                            animate={{ width: `${displayProgress}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                        />
                    </div>
                    <div className="font-mono text-xs tracking-[0.2em] text-white/50">
                        LOADING {Math.round(displayProgress)}%
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
