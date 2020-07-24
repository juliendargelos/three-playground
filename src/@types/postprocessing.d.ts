declare module 'postprocessing' {
  export class BlendMode {
    constructor(blendFunction: any, ...args: any[]);

    getBlendFunction(): any;
    getShaderCode(): any;
    setBlendFunction(blendFunction: any): void;
  }

  export class BloomEffect extends Effect {
    constructor(...args: any[]);

    getResolutionScale(): any;
    initialize(renderer: any, alpha: any, frameBufferType: any): void;
    setResolutionScale(scale: any): void;
    setSize(width: any, height: any): void;
    update(renderer: any, inputBuffer: any, deltaTime: any): void;
  }

  export class BlurPass extends Pass {
    constructor(...args: any[]);

    getResolutionScale(): any;
    initialize(renderer: any, alpha: any, frameBufferType: any): void;
    render(renderer: any, inputBuffer: any, outputBuffer: any, deltaTime: any, stencilTest: any): void;
    setResolutionScale(scale: any): void;
    setSize(width: any, height: any): void;

    static AUTO_SIZE: number;
  }

  export class BokehMaterial {
    constructor(...args: any[]);

    generateKernel(): void;
    setTexelSize(x: any, y: any): void;
  }

  export class ChromaticAberrationEffect extends Effect {
    constructor(...args: any[]);

    initialize(renderer: any, alpha: any, frameBufferType: any): void;
  }

  export class CircleOfConfusionMaterial {
    constructor(camera: any);

    adoptCameraSettings(...args: any[]): void;
  }

  export class ClearMaskPass extends Pass {
    constructor();

    render(renderer: any, inputBuffer: any, outputBuffer: any, deltaTime: any, stencilTest: any): void;
  }

  export class ClearPass extends Pass {
    constructor(...args: any[]);

    render(renderer: any, inputBuffer: any, outputBuffer: any, deltaTime: any, stencilTest: any): void;
  }

  export class ColorDepthEffect extends Effect {
    constructor(...args: any[]);

    getBitDepth(): any;
    setBitDepth(bits: any): void;
  }

  export class ColorEdgesMaterial {
    constructor(...args: any[]);

    setEdgeDetectionThreshold(threshold: any): void;
    setLocalContrastAdaptationFactor(factor: any): void;
  }

  export class ConvolutionMaterial {
    constructor(...args: any[]);

    getKernel(): any;
    setTexelSize(x: any, y: any): void;
  }

  export class DepthComparisonMaterial {
    constructor(...args: any[]);

    adoptCameraSettings(...args: any[]): void;
  }

  export class DepthDownsamplingMaterial {
    constructor();

    setTexelSize(x: any, y: any): void;
  }

  export class DepthDownsamplingPass extends Pass {
    constructor(...args: any[]);

    initialize(renderer: any, alpha: any, frameBufferType: any): void;
    render(renderer: any, inputBuffer: any, outputBuffer: any, deltaTime: any, stencilTest: any): void;
    setDepthTexture(depthTexture: any, ...args: any[]): void;
    setSize(width: any, height: any): void;
  }

  export class DepthEffect extends Effect {
    constructor(...args: any[]);
  }

  export class DepthOfFieldEffect extends Effect {
    constructor(camera: any, ...args: any[]);

    calculateFocusDistance(target: any): any;
    initialize(renderer: any, alpha: any, frameBufferType: any): any;
    setDepthTexture(depthTexture: any, ...args: any[]): void;
    setSize(width: any, height: any): any;
    update(renderer: any, inputBuffer: any, deltaTime: any): void;
  }

  export class DepthPass extends Pass {
    constructor(scene: any, camera: any, ...args: any[]);

    getResolutionScale(): any;
    render(renderer: any, inputBuffer: any, outputBuffer: any, deltaTime: any, stencilTest: any): void;
    setResolutionScale(scale: any): void;
    setSize(width: any, height: any): void;
  }

  export class Disposable {
    constructor();

    dispose(): void;
  }

  export class DotScreenEffect extends Effect {
    constructor(...args: any[]);

    setAngle(angle: any): void;
  }

  export class EdgeDetectionMaterial {
    constructor(...args: any[]);

    setEdgeDetectionMode(mode: any): void;
    setEdgeDetectionThreshold(threshold: any): void;
    setLocalContrastAdaptationFactor(factor: any): void;
  }

  export class Effect {
    constructor(name: any, fragmentShader: any, ...args: any[]);

    dispose(): void;
    getAttributes(): any;
    getFragmentShader(): any;
    getVertexShader(): any;
    initialize(renderer: any, alpha: any, frameBufferType: any): void;
    setAttributes(attributes: any): void;
    setChanged(): void;
    setDepthTexture(depthTexture: any): void;
    setFragmentShader(fragmentShader: any): void;
    setSize(width: any, height: any): void;
    setVertexShader(vertexShader: any): void;
    update(renderer: any, inputBuffer: any, deltaTime: any): void;
  }

  export class EffectComposer {
    constructor(...args: any[]);

    addPass(pass: Pass, index?: number): void;
    createBuffer(depthBuffer: any, stencilBuffer: any, type: any, multisampling: any): any;
    createDepthTexture(): any;
    dispose(): void;
    enableExtensions(): void;
    getRenderer(): any;
    removePass(pass: any): any;
    render(deltaTime: any): void;
    replaceRenderer(renderer: any, ...args: any[]): any;
    reset(): void;
    setSize(width: number, height: number, updateStyle?: boolean): void;
  }

  export class EffectMaterial {
    constructor(...args: any[]);

    adoptCameraSettings(...args: any[]): void;
    setDefines(defines: any): any;
    setShaderParts(shaderParts: any): any;
    setSize(width: any, height: any): void;
    setUniforms(uniforms: any): any;
  }

  export class EffectPass extends Pass {
    constructor(camera: any, ...args: any[]);

    dispose(): void;
    getDepthTexture(): any;
    handleEvent(event: any): void;
    initialize(renderer: any, alpha: any, frameBufferType: any): any;
    recompile(renderer: any): void;
    render(renderer: any, inputBuffer: any, outputBuffer: any, deltaTime: any, stencilTest: any): void;
    setDepthTexture(depthTexture: any, ...args: any[]): void;
    setSize(width: any, height: any): void;
    updateMaterial(): any;
    verifyResources(renderer: any): void;
  }

  export class GlitchEffect extends Effect {
    constructor(...args: any[]);

    generatePerturbationMap(...args: any[]): any;
    getPerturbationMap(): any;
    setPerturbationMap(map: any): void;
    update(renderer: any, inputBuffer: any, deltaTime: any): void;
  }

  export class GodRaysEffect extends Effect {
    constructor(camera: any, lightSource: any, ...args: any[]);

    getResolutionScale(): any;
    initialize(renderer: any, alpha: any, frameBufferType: any): void;
    setDepthTexture(depthTexture: any, ...args: any[]): void;
    setResolutionScale(scale: any): void;
    setSize(width: any, height: any): void;
    update(renderer: any, inputBuffer: any, deltaTime: any): void;
  }

  export class GodRaysMaterial {
    constructor(lightPosition: any);
  }

  export class GridEffect extends Effect {
    constructor(...args: any[]);

    getLineWidth(): any;
    getScale(): any;
    setLineWidth(lineWidth: any): void;
    setScale(scale: any): void;
    setSize(width: any, height: any): void;
  }

  export class HueSaturationEffect extends Effect {
    constructor(...args: any[]);

    setHue(hue: any): void;
  }

  export class Initializable {
    constructor();

    initialize(renderer: any, alpha: any, frameBufferType: any): void;
  }

  export class LuminanceMaterial {
    constructor(...args: any[]);

    setColorOutputEnabled(enabled: any): void;
    setLuminanceRangeEnabled(enabled: any): void;
  }

  export class MaskMaterial {
    constructor(...args: any[]);
  }

  export class MaskPass extends Pass {
    constructor(scene: any, camera: any);

    render(renderer: any, inputBuffer: any, outputBuffer: any, deltaTime: any, stencilTest: any): void;
  }

  export class NoiseEffect extends Effect {
    constructor(...args: any[]);
  }

  export class NormalPass extends Pass {
    constructor(scene: any, camera: any, ...args: any[]);

    getResolutionScale(): any;
    render(renderer: any, inputBuffer: any, outputBuffer: any, deltaTime: any, stencilTest: any): void;
    setResolutionScale(scale: any): void;
    setSize(width: any, height: any): void;
  }

  export class OutlineEdgesMaterial {
    constructor(...args: any[]);

    setTexelSize(x: any, y: any): void;
  }

  export class OutlineEffect extends Effect {
    constructor(scene: any, camera: any, ...args: any[]);

    clearSelection(): any;
    deselectObject(object: any): any;
    getResolutionScale(): any;
    initialize(renderer: any, alpha: any, frameBufferType: any): void;
    selectObject(object: any): any;
    setPatternTexture(texture: any): void;
    setResolutionScale(scale: any): void;
    setSelection(objects: any): any;
    setSize(width: any, height: any): void;
    update(renderer: any, inputBuffer: any, deltaTime: any): void;
  }

  export class OutlineMaterial {
    constructor(...args: any[]);

    setTexelSize(x: any, y: any): void;
  }

  export class OverrideMaterialManager {
    constructor(...args: any[]);

    dispose(): void;
    disposeMaterials(): void;
    render(renderer: any, scene: any, camera: any): void;
    setMaterial(material: any): void;

    static workaroundEnabled: boolean;
  }

  export class Pass {
    constructor(...args: any[]);

    dispose(): void;
    getDepthTexture(): any;
    getFullscreenMaterial(): any;
    initialize(renderer: any, alpha: any, frameBufferType: any): void;
    render(renderer: any, inputBuffer: any, outputBuffer: any, deltaTime: any, stencilTest: any): void;
    setDepthTexture(depthTexture: any): void;
    setFullscreenMaterial(material: any): void;
    setSize(width: any, height: any): void;
  }

  export class PixelationEffect extends Effect {
    constructor(...args: any[]);

    getGranularity(): any;
    setGranularity(granularity: any): void;
    setSize(width: any, height: any): void;
  }

  export class RawImageData {
    constructor(...args: any[]);

    toCanvas(): any;
    static from(data: any): any;
  }

  export class RealisticBokehEffect extends Effect {
    constructor(...args: any[]);
  }

  export class RenderPass extends Pass {
    constructor(scene: any, camera: any, ...args: any[]);

    getClearPass(): any;
    getDepthTexture(): any;
    render(renderer: any, inputBuffer: any, outputBuffer: any, deltaTime: any, stencilTest: any): void;
    setDepthTexture(depthTexture: any): void;
  }

  export class Resizable {
    constructor();

    setSize(width: any, height: any): void;
  }

  export class Resizer {
    constructor(resizable: any, ...args: any[]);

    static AUTO_SIZE: number;
  }

  export class SMAAEffect extends Effect {
    constructor(searchImage: any, areaImage: any, ...args: any[]);

    applyPreset(preset: any): void;
    dispose(): void;
    setDepthTexture(depthTexture: any, ...args: any[]): void;
    setEdgeDetectionThreshold(threshold: any): void;
    setOrthogonalSearchSteps(steps: any): void;
    setSize(width: any, height: any): void;
    update(renderer: any, inputBuffer: any, deltaTime: any): void;

    static areaImageDataURL: string;
    static searchImageDataURL: string;
  }

  export class SMAAImageLoader {
    constructor(manager: any);

    load(...args: any[]): any;
  }

  export class SMAAWeightsMaterial {
    constructor(...args: any[]);

    setCornerRounding(rounding: any): void;
    setDiagonalSearchSteps(steps: any): void;
    setOrthogonalSearchSteps(steps: any): void;
  }

  export class SSAOEffect extends Effect {
    constructor(camera: any, normalBuffer: any, ...args: any[]);

    setDepthTexture(depthTexture: any, ...args: any[]): void;
    setDistanceCutoff(threshold: any, falloff: any): void;
    setProximityCutoff(threshold: any, falloff: any): void;
    setSize(width: any, height: any): void;
    update(renderer: any, inputBuffer: any, deltaTime: any): void;
  }

  export class SSAOMaterial {
    constructor(camera: any);

    adoptCameraSettings(...args: any[]): void;
    setTexelSize(x: any, y: any): void;
  }

  export class SavePass extends Pass {
    constructor(renderTarget: any, ...args: any[]);

    initialize(renderer: any, alpha: any, frameBufferType: any): void;
    render(renderer: any, inputBuffer: any, outputBuffer: any, deltaTime: any, stencilTest: any): void;
    setSize(width: any, height: any): void;
  }

  export class ScanlineEffect extends Effect {
    constructor(...args: any[]);

    getDensity(): any;
    setDensity(density: any): void;
    setSize(width: any, height: any): void;
  }

  export class Selection {
    constructor(iterable: any, ...args: any[]);

    add(object: any): any;
    clear(): any;
    delete(object: any): any;
    indexOf(object: any): any;
    set(objects: any): any;
    setVisible(visible: any): any;
  }

  export class SelectiveBloomEffect extends Effect {
    constructor(scene: any, camera: any, options: any);

    initialize(renderer: any, alpha: any, frameBufferType: any): void;
    setSize(width: any, height: any): void;
    update(renderer: any, inputBuffer: any, deltaTime: any): void;
  }

  export class ShaderPass extends Pass {
    constructor(material: any, ...args: any[]);

    render(renderer: any, inputBuffer: any, outputBuffer: any, deltaTime: any, stencilTest: any): void;
    setInput(input: any): void;
  }

  export class ShockWaveEffect extends Effect {
    constructor(camera: any, ...args: any[]);

    explode(): void;
    update(renderer: any, inputBuffer: any, delta: any): void;
  }

  export class TextureEffect extends Effect {
    constructor(...args: any[]);

    setTextureSwizzleRGBA(r: any, ...args: any[]): void;
    update(renderer: any, inputBuffer: any, deltaTime: any): void;
  }

  export class ToneMappingEffect extends Effect {
    constructor(...args: any[]);

    initialize(renderer: any, alpha: any, frameBufferType: any): void;
    setSize(width: any, height: any): void;
    update(renderer: any, inputBuffer: any, deltaTime: any): void;
  }

  export class VignetteEffect extends Effect {
    constructor(...args: any[]);
  }

  export const BlendFunction: {
    ADD: number;
    ALPHA: number;
    AVERAGE: number;
    COLOR_BURN: number;
    COLOR_DODGE: number;
    DARKEN: number;
    DIFFERENCE: number;
    DIVIDE: number;
    EXCLUSION: number;
    LIGHTEN: number;
    MULTIPLY: number;
    NEGATION: number;
    NORMAL: number;
    OVERLAY: number;
    REFLECT: number;
    SCREEN: number;
    SKIP: number;
    SOFT_LIGHT: number;
    SUBTRACT: number;
  };

  export const ColorChannel: {
    ALPHA: number;
    BLUE: number;
    GREEN: number;
    RED: number;
  };

  export const EdgeDetectionMode: {
    COLOR: number;
    DEPTH: number;
    LUMA: number;
  };

  export const EffectAttribute: {
    CONVOLUTION: number;
    DEPTH: number;
    NONE: number;
  };

  export const GlitchMode: {
    CONSTANT_MILD: number;
    CONSTANT_WILD: number;
    DISABLED: number;
    SPORADIC: number;
  };

  export const KernelSize: {
    HUGE: number;
    LARGE: number;
    MEDIUM: number;
    SMALL: number;
    VERY_LARGE: number;
    VERY_SMALL: number;
  };

  export const MaskFunction: {
    DISCARD: number;
    MULTIPLY: number;
    MULTIPLY_RGB_SET_ALPHA: number;
  };

  export const SMAAPreset: {
    HIGH: number;
    LOW: number;
    MEDIUM: number;
    ULTRA: number;
  };

  export const Section: {
    FRAGMENT_HEAD: string;
    FRAGMENT_MAIN_IMAGE: string;
    FRAGMENT_MAIN_UV: string;
    VERTEX_HEAD: string;
    VERTEX_MAIN_SUPPORT: string;
  };

  export const WebGLExtension: {
    DERIVATIVES: string;
    DRAW_BUFFERS: string;
    FRAG_DEPTH: string;
    SHADER_TEXTURE_LOD: string;
  };

  export function AdaptiveLuminanceMaterial(): any;
  export function BokehEffect(...args: any[]): any;
  export function BrightnessContrastEffect(...args: any[]): any;
  export function ColorAverageEffect(...args: any[]): any;
  export function CopyMaterial(): any;
  export function DepthMaskMaterial(): any;
  export function GammaCorrectionEffect(...args: any[]): any;
  export function NoiseTexture(width: any, height: any, ...args: any[]): any;
  export function SMAAAreaImageData(): void;
  export function SMAASearchImageData(): void;
  export function SepiaEffect(...args: any[]): any;

  export namespace SMAAAreaImageData {
    function generate(): any;
  }

  export namespace SMAAImageLoader {
    namespace Handlers {
      function add(): void;
      function get(): void;
    }
  }

  export namespace SMAASearchImageData {
    function generate(): any;
  }
}
