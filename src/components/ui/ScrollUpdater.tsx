"use client";

import { useLenis } from '@studio-freight/react-lenis';
import { useStore } from '@/store/useStore';

const ScrollUpdater = () => {
    const setScrollProgress = useStore((state) => state.setScrollProgress);

    useLenis(({ scroll }) => {
        setScrollProgress(scroll);
    });

    return null;
};

export default ScrollUpdater;
