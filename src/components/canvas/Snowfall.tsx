import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";

export const Snowfall = () => {
    const ref = useRef<THREE.Points>(null);

    // Load a snowflake PNG texture
    const texture = useLoader(THREE.TextureLoader, "/snowflake.png");

    const count = 2000;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            pos[i] = (Math.random() - 0.5) * 20;
        }
        return pos;
    }, []);

    const speeds = useMemo(() => new Float32Array(count).map(() => Math.random() * 0.02 + 0.01), []);

    useFrame(() => {
        if (!ref.current) return;

        const pos = ref.current.geometry.attributes.position.array as Float32Array;

        for (let i = 1; i < pos.length; i += 3) {
            pos[i] -= speeds[i / 3 | 0]; // fall down
            if (pos[i] < -10) pos[i] = 10; // reset to top
        }

        ref.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                map={texture}
                size={0.15}
                depthWrite={false}
                opacity={0.8}
            />
        </Points>
    );
};
