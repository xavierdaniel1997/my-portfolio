import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshTransmissionMaterial, RoundedBox, Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';
import { random } from 'maath';

// Floating particles in the background
const Particles = () => {
    const ref = useRef<THREE.Points>(null);
    const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 10 }), []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.5}
                />
            </Points>
        </group>
    );
};

// Interactive Glass Sphere with distortion
const GlassSphere = ({ position }: { position: [number, number, number] }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const { pointer } = useThree();

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Smooth rotation
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;

            // Follow mouse when hovered
            if (hovered) {
                meshRef.current.position.x = THREE.MathUtils.lerp(
                    meshRef.current.position.x,
                    position[0] + pointer.x * 0.5,
                    0.05
                );
                meshRef.current.position.y = THREE.MathUtils.lerp(
                    meshRef.current.position.y,
                    position[1] + pointer.y * 0.5,
                    0.05
                );
            } else {
                meshRef.current.position.x = THREE.MathUtils.lerp(
                    meshRef.current.position.x,
                    position[0],
                    0.05
                );
                meshRef.current.position.y = THREE.MathUtils.lerp(
                    meshRef.current.position.y,
                    position[1],
                    0.05
                );
            }
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere
                ref={meshRef}
                args={[1, 64, 64]}
                position={position}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            >
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    resolution={256}
                    transmission={0.95}
                    roughness={0.1}
                    thickness={1}
                    ior={1.5}
                    chromaticAberration={0.5}
                    anisotropy={1}
                    distortion={hovered ? 0.5 : 0.2}
                    distortionScale={0.5}
                    temporalDistortion={0.2}
                    color="#ffffff"
                />
            </Sphere>
        </Float>
    );
};

// Morphing Abstract Shape
const MorphingShape = ({ position }: { position: [number, number, number] }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const { pointer } = useThree();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.15;
            meshRef.current.rotation.z += delta * 0.1;

            // Scale on hover
            const targetScale = hovered ? 1.3 : 1;
            meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
            meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);
            meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.1);

            // Subtle mouse follow
            if (hovered) {
                meshRef.current.rotation.y += pointer.x * delta;
            }
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
            <mesh
                ref={meshRef}
                position={position}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            >
                <icosahedronGeometry args={[1.2, 1]} />
                <MeshDistortMaterial
                    color={hovered ? "#ffffff" : "#888888"}
                    attach="material"
                    distort={hovered ? 0.6 : 0.3}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
};

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

    const materialProps = {
        color: hovered ? "#ffffff" : "#e0f7fa",
        emissive: hovered ? "#ffffff" : "#a0e0e0",
        emissiveIntensity: hovered ? 0.8 : 0.3,
        metalness: 0.5,
        roughness: 0.1,
        transparent: true,
        opacity: 0.4,
    };

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <group ref={meshRef} position={position}>
                {type === 'star' && (
                    <group>
                        <mesh rotation={[0, 0, 0]}>
                            <boxGeometry args={[0.1 * size, 1 * size, 0.1 * size]} />
                            <meshStandardMaterial {...materialProps} />
                        </mesh>
                        <mesh rotation={[0, 0, Math.PI / 3]}>
                            <boxGeometry args={[0.1 * size, 1 * size, 0.1 * size]} />
                            <meshStandardMaterial {...materialProps} />
                        </mesh>
                        <mesh rotation={[0, 0, (Math.PI * 2) / 3]}>
                            <boxGeometry args={[0.1 * size, 1 * size, 0.1 * size]} />
                            <meshStandardMaterial {...materialProps} />
                        </mesh>
                        {/* Center detail */}
                        <mesh>
                            <dodecahedronGeometry args={[0.2 * size, 0]} />
                            <meshStandardMaterial {...materialProps} />
                        </mesh>
                    </group>
                )}
                {type === 'crystal' && (
                    <mesh>
                        <octahedronGeometry args={[0.6 * size, 0]} />
                        <meshStandardMaterial {...materialProps} />
                    </mesh>
                )}
                {type === 'prism' && (
                    <mesh>
                        <dodecahedronGeometry args={[0.5 * size, 0]} />
                        <meshStandardMaterial {...materialProps} />
                    </mesh>
                )}
                {type === 'spike' && (
                    <group>
                        <mesh>
                            <tetrahedronGeometry args={[0.6 * size, 0]} />
                            <meshStandardMaterial {...materialProps} />
                        </mesh>
                        <mesh rotation={[Math.PI, Math.PI / 4, 0]}>
                            <tetrahedronGeometry args={[0.6 * size, 0]} />
                            <meshStandardMaterial {...materialProps} />
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
