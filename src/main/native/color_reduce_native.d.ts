export function process(img_buffer: Uint8Array, palette: (Uint8Array)[], method: number, use_dither: boolean, dither_threshold: number): Uint8Array;

export enum QuantizeMethodWrapper {
  CIE2000,
  Luma,
  Redmean,
}