/**
* @param {Uint8Array} img_buffer A buffer containing the raw image file data
* @param {(Uint8Array)[]} palette An array of [r,g,b] triplets representing the color palette
* @param {number} method The method to use to compute color similarity
* @param {boolean} use_dither Whether to apply dithering
* @param {number} dither_threshold A number between 0 and 1 specifying the dithering threshold. The higher the threshold, the more dithering you'll see.
* @returns {Uint8Array} A buffer containing the data for a png of the encoded file
*/
export interface processInterface {(img_buffer: Uint8Array,palette: (Uint8Array)[], method: number, use_dither: boolean, dither_threshold: number): Uint8Array};