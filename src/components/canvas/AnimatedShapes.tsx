import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus, Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';
import { random } from 'maath';

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

const AnimatedShapes = () => {
    const meshRef = useRef<THREE.Group>(null);
    const icosahedronRef = useRef<THREE.Mesh>(null);
    const torusRef = useRef<THREE.Mesh>(null);
    const sphereRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        const { scrollProgress } = useStore.getState();

        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05;
            // Smooth parallax based on scroll
            meshRef.current.position.y = THREE.MathUtils.lerp(
                meshRef.current.position.y,
                -scrollProgress * 5,
                0.05
            );
        }

        if (icosahedronRef.current) {
            icosahedronRef.current.rotation.x += delta * 0.2;
            icosahedronRef.current.rotation.y += delta * 0.2;
        }

        if (torusRef.current) {
            torusRef.current.rotation.x -= delta * 0.1;
            torusRef.current.rotation.y -= delta * 0.1;
        }

        if (sphereRef.current) {
            sphereRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
        }
    });

    return (
        <group>
            <Particles />
            <group ref={meshRef}>
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <Icosahedron ref={icosahedronRef} args={[1, 0]} position={[3, 0, -2]}>
                        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.3} />
                    </Icosahedron>
                </Float>

                <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
                    <Torus ref={torusRef} args={[0.8, 0.2, 16, 100]} position={[-3, 2, -3]}>
                        <meshStandardMaterial color="#555555" roughness={0.2} metalness={0.8} />
                    </Torus>
                </Float>

                <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Sphere ref={sphereRef} args={[0.3, 32, 32]} position={[0, -2, 0]}>
                        <meshStandardMaterial emissive="#ffffff" emissiveIntensity={1} color="#ffffff" />
                    </Sphere>
                </Float>

                {/* Extra shapes for more density */}
                <Float speed={1} rotationIntensity={2} floatIntensity={0.5}>
                    <Icosahedron args={[0.5, 0]} position={[-2, -3, -2]}>
                        <meshStandardMaterial color="#333333" wireframe />
                    </Icosahedron>
                </Float>

                <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                    <Torus args={[0.5, 0.1, 16, 50]} position={[2, 3, -4]} rotation={[Math.PI / 2, 0, 0]}>
                        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
                    </Torus>
                </Float>
            </group>
        </group>
    );
};

export default AnimatedShapes;
