"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";

export const Particles = () => {
    const sphereRef = useRef<THREE.Points>(null);
    const snowRef = useRef<THREE.Points>(null);
    const { pointer, viewport } = useThree();

    // Rotating sphere particles (5000)
    const sphereParticles = useMemo(
        () => random.inSphere(new Float32Array(5000), { radius: 10 }) as Float32Array,
        []
    );

    const originalSpherePositions = useMemo(() => sphereParticles.slice(), [sphereParticles]);

    // Falling snow particles (3000)
    const { snowPositions, snowData } = useMemo(() => {
        const count = 3000;
        const snowPositions = new Float32Array(count * 3);
        const snowData = new Float32Array(count * 3); // speed, swayOffset, swaySpeed

        for (let i = 0; i < count; i++) {
            snowPositions[i * 3] = (Math.random() - 0.5) * 40;     // x
            snowPositions[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
            snowPositions[i * 3 + 2] = (Math.random() - 0.5) * 15; // z

            snowData[i * 3] = 0.3 + Math.random() * 0.6;           // fall speed
            snowData[i * 3 + 1] = Math.random() * Math.PI * 2;     // sway offset
            snowData[i * 3 + 2] = 0.5 + Math.random() * 1.0;       // sway speed
        }

        return { snowPositions, snowData };
    }, []);

    useFrame((state, delta) => {
        // Rotating sphere particles
        if (sphereRef.current) {
            sphereRef.current.rotation.x -= delta / 10;
            sphereRef.current.rotation.y -= delta / 15;

            const positions = sphereRef.current.geometry.attributes.position.array as Float32Array;
            const mouseX = (pointer.x * viewport.width) / 2;
            const mouseY = (pointer.y * viewport.height) / 2;

            for (let i = 0; i < 5000; i++) {
                const i3 = i * 3;
                const px = positions[i3];
                const py = positions[i3 + 1];

                const dx = mouseX - px;
                const dy = mouseY - py;
                const distSq = dx * dx + dy * dy;

                const interactionRadius = 4;
                const radiusSq = interactionRadius * interactionRadius;

                if (distSq < radiusSq && distSq > 0.01) {
                    const dist = Math.sqrt(distSq);
                    const force = (interactionRadius - dist) / interactionRadius;
                    const angle = Math.atan2(dy, dx);
                    const repelStrength = force * delta * 18;

                    positions[i3] -= Math.cos(angle) * repelStrength;
                    positions[i3 + 1] -= Math.sin(angle) * repelStrength;
                    positions[i3 + 2] += force * delta * 8;
                }

                const springForce = 0.05;
                positions[i3] += (originalSpherePositions[i3] - positions[i3]) * springForce;
                positions[i3 + 1] += (originalSpherePositions[i3 + 1] - positions[i3 + 1]) * springForce;
                positions[i3 + 2] += (originalSpherePositions[i3 + 2] - positions[i3 + 2]) * springForce;
            }

            sphereRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // Falling snow particles
        if (snowRef.current) {
            const positions = snowRef.current.geometry.attributes.position.array as Float32Array;
            const mouseX = (pointer.x * viewport.width) / 2;
            const mouseY = (pointer.y * viewport.height) / 2;

            for (let i = 0; i < 3000; i++) {
                const i3 = i * 3;
                const fallSpeed = snowData[i3];
                const swayOffset = snowData[i3 + 1];
                const swaySpeed = snowData[i3 + 2];

                // Falling motion
                positions[i3 + 1] -= fallSpeed * delta * 1.5;

                // Gentle sway
                positions[i3] += Math.sin(state.clock.elapsedTime * swaySpeed + swayOffset) * delta * 0.2;
                positions[i3 + 2] += Math.cos(state.clock.elapsedTime * swaySpeed * 0.5 + swayOffset) * delta * 0.1;

                // Reset if below threshold
                if (positions[i3 + 1] < -15) {
                    positions[i3 + 1] = 15;
                    positions[i3] = (Math.random() - 0.5) * 40;
                    positions[i3 + 2] = (Math.random() - 0.5) * 15;
                }

                // Mouse breeze effect
                const px = positions[i3];
                const py = positions[i3 + 1];
                const dx = mouseX - px;
                const dy = mouseY - py;
                const distSq = dx * dx + dy * dy;

                if (distSq < 16 && distSq > 0.01) { // radius 4
                    const dist = Math.sqrt(distSq);
                    const force = (4 - dist) / 4;
                    const angle = Math.atan2(dy, dx);
                    const pushStrength = force * delta * 6;

                    positions[i3] -= Math.cos(angle) * pushStrength;
                    positions[i3 + 1] -= Math.sin(angle) * pushStrength * 0.3;
                }
            }

            snowRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <>
            {/* Rotating sphere particles */}
            <Points ref={sphereRef} positions={sphereParticles} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    size={0.02}
                    depthWrite={false}
                    opacity={0.5}
                    color="#ffffff"
                    sizeAttenuation={true}
                />
            </Points>

            {/* Falling snow particles */}
            <Points ref={snowRef} positions={snowPositions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    size={0.04}
                    depthWrite={false}
                    opacity={0.7}
                    color="#ffffff"
                    sizeAttenuation={true}
                />
            </Points>
        </>
    );
};
