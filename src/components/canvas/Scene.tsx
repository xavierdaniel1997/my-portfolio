"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Lights from "./Lights";
import Effects from "./Effects";
import AnimatedShapes from "./AnimatedShapes";
import { Particles } from "./Particles";

const Scene = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ antialias: false, alpha: true }}
                dpr={[1, 1.5]}
            >
                <Suspense fallback={null}>
                    <Lights />
                    <Particles />
                    <AnimatedShapes />
                    <Effects />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene;
