declare module '*.frag';
declare module '*.vert';
declare module '*.vue';
declare module '*.jpg';
declare module 'mathjs';
declare module 'stats.js';

declare global {
  interface Window {
    mozRequestAnimationFrame: any
  }
}
