declare module '*.frag';
declare module '*.vert';
declare module '*.vue';
declare module '*.jpg';

declare global {
  interface Window {
    mozRequestAnimationFrame: any
  }
}
