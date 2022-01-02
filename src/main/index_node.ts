const {process:wasm_process, QuantizeMethodWrapper} = require("./wasm_node/color_reduce_wasm.js");
import type {processInterface} from "./model";

let process: processInterface;
process = function (img_buffer: Uint8Array, palette: (Uint8Array)[], method: number, use_dither: boolean, dither_threshold: number = 0): Uint8Array {
   return wasm_process(img_buffer, palette, method, use_dither, dither_threshold)
}

exports.process = process;
exports.QuantizeMethod =QuantizeMethodWrapper;