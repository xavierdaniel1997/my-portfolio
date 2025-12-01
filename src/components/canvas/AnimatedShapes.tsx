import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

// Shared Geometries to reduce GPU memory and draw calls overhead
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const dodecaGeo = new THREE.DodecahedronGeometry(1, 0);
const octaGeo = new THREE.OctahedronGeometry(1, 0);
const tetraGeo = new THREE.TetrahedronGeometry(1, 0);

// Snowflake Component with variations
const Snowflake = ({ position, type = 'star', size = 1 }: { position: [number, number, number], type?: 'star' | 'crystal' | 'prism' | 'spike', size?: number }) => {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const { pointer } = useThree();

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Complex rotation for more dynamic feel
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
            meshRef.current.rotation.z += delta * 0.1;

            // Hover effect
            const targetScale = hovered ? size * 1.3 : size;
            meshRef.current.scale.setScalar(
                THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
            );

            // Breeze/Wind Effect calculation
            // Convert pointer coordinates (normalized -1 to 1) to world coordinates roughly
            const mouseX = pointer.x * 10; // Approximate world width scale
            const mouseY = pointer.y * 5;  // Approximate world height scale

            const dx = mouseX - meshRef.current.position.x;
            const dy = mouseY - meshRef.current.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Interaction radius
            const radius = 3;

            let targetX = position[0];
            let targetY = position[1];

            if (distance < radius) {
                // Calculate repulsive force
                const force = (radius - distance) / radius;
                const angle = Math.atan2(dy, dx);

                // Push away from mouse
                targetX -= Math.cos(angle) * force * 2;
                targetY -= Math.sin(angle) * force * 2;

                // Add some random turbulence
                meshRef.current.rotation.z += force * delta * 2;
            }

            // Smoothly interpolate to target position (spring-like return)
            meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
            meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
        }
    });

    const materialProps = useMemo(() => ({
        color: hovered ? "#ffffff" : "#e0f7fa",
        emissive: hovered ? "#ffffff" : "#a0e0e0",
        emissiveIntensity: hovered ? 0.8 : 0.3,
        transparent: true,
        opacity: 0.4,
        depthWrite: false, // Optimization for transparent objects
    }), [hovered]);

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <group ref={meshRef} position={position}>
                {type === 'star' && (
                    <group>
                        <mesh rotation={[0, 0, 0]} geometry={boxGeo} scale={[0.1 * size, 1 * size, 0.1 * size]}>
                            <meshLambertMaterial {...materialProps} />
                        </mesh>
                        <mesh rotation={[0, 0, Math.PI / 3]} geometry={boxGeo} scale={[0.1 * size, 1 * size, 0.1 * size]}>
                            <meshLambertMaterial {...materialProps} />
                        </mesh>
                        <mesh rotation={[0, 0, (Math.PI * 2) / 3]} geometry={boxGeo} scale={[0.1 * size, 1 * size, 0.1 * size]}>
                            <meshLambertMaterial {...materialProps} />
                        </mesh>
                        {/* Center detail */}
                        <mesh geometry={dodecaGeo} scale={[0.2 * size, 0.2 * size, 0.2 * size]}>
                            <meshLambertMaterial {...materialProps} />
                        </mesh>
                    </group>
                )}
                {type === 'crystal' && (
                    <mesh geometry={octaGeo} scale={[0.6 * size, 0.6 * size, 0.6 * size]}>
                        <meshLambertMaterial {...materialProps} />
                    </mesh>
                )}
                {type === 'prism' && (
                    <mesh geometry={dodecaGeo} scale={[0.5 * size, 0.5 * size, 0.5 * size]}>
                        <meshLambertMaterial {...materialProps} />
                    </mesh>
                )}
                {type === 'spike' && (
                    <group>
                        <mesh geometry={tetraGeo} scale={[0.6 * size, 0.6 * size, 0.6 * size]}>
                            <meshLambertMaterial {...materialProps} />
                        </mesh>
                        <mesh rotation={[Math.PI, Math.PI / 4, 0]} geometry={tetraGeo} scale={[0.6 * size, 0.6 * size, 0.6 * size]}>
                            <meshLambertMaterial {...materialProps} />
                        </mesh>
                    </group>
                )}
            </group>
        </Float>
    );
};



const AnimatedShapes = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        const { scrollProgress } = useStore.getState();

        if (groupRef.current) {
            // Gentle rotation of entire scene
            groupRef.current.rotation.y += delta * 0.03;

            // Smooth parallax based on scroll
            groupRef.current.position.y = THREE.MathUtils.lerp(
                groupRef.current.position.y,
                -scrollProgress * 5,
                0.05
            );
        }
    });

    return (
        <group ref={groupRef}>
            {/* Large Star Snowflake */}
            <Snowflake position={[0, -1, -1]} type="star" size={0.9} />

            {/* Crystal Shape */}
            <Snowflake position={[4, -2, -4]} type="crystal" size={0.5} />

            {/* Prism Shape */}
            <Snowflake position={[-3, 2, -3]} type="star" size={1} />

            {/* Background Snowflakes */}
            <Snowflake position={[-2, -3, -5]} type="star" size={0.8} />

            <Snowflake position={[3, 1, -2]} type="star" size={0.5} />

            {/* Spike Snowflake */}
            <Snowflake position={[-3.5, 1.5, -2]} type="spike" size={0.3} />

        </group>
    );
};

export default AnimatedShapes;
