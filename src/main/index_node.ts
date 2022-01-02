import type {processInterface} from "./model";
const {process : wasm_process, QuantizeMethodWrapper : QuantizeMethod} = require( "../color_reduce_native");

let process: processInterface;
process = function (img_buffer: Uint8Array, palette: (Uint8Array)[], method: number, use_dither: boolean, dither_threshold: number): Uint8Array {
   return wasm_process(img_buffer, palette, method, use_dither, dither_threshold)
}

export {process};
export {QuantizeMethod};