import * as color_reduce from "./wasm/color_reduce_wasm.js";
import type {processInterface} from "./model";

let process: processInterface;
process = function (img_buffer: Uint8Array, palette: (Uint8Array)[], method: number, use_dither: boolean, dither_threshold: number): Uint8Array {
   return color_reduce.process(img_buffer, palette, method, use_dither, dither_threshold)
}

let QuantizeMethod = color_reduce.QuantizeMethodWrapper;

export {process};
export {QuantizeMethod};