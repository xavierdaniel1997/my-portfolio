"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { useStore } from "@/store/useStore";
import clsx from "clsx";

interface SectionProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

const Section = ({ id, children, className }: SectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });
    const setSection = useStore((state) => state.setSection);

    useEffect(() => {
        if (isInView) {
            setSection(id);
        }
    }, [isInView, id, setSection]);

    return (
        <section
            ref={ref}
            id={id}
            className={clsx("min-h-screen w-full flex flex-col justify-center px-4 md:px-20 py-20 relative", className)}
        >
            {children}
        </section>
    );
};

export default Section;
