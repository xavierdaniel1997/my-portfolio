import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

const Effects = () => {
    return (
        <EffectComposer enableNormalPass={false}>
            <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} radius={0.4} />
            <Vignette eskil={false} offset={0.1} darkness={0.5} />
        </EffectComposer>
    );
};

export default Effects;
