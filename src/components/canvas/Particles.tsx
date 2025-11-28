import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";

export const Particles = () => {
    const ref = useRef<THREE.Points>(null);

    const sphere = useMemo(
        () => random.inSphere(new Float32Array(5000), { radius: 10 }) as Float32Array,
        []
    );

    useFrame((state, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                size={0.02}
                depthWrite={false}
                opacity={0.5}
            />
        </Points>
    );
};
