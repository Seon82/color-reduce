use color_reduce::{quantize, BasePalette, QuantizeMethod};
use image::png::PngEncoder;
use image::ColorType;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub enum QuantizeMethodWrapper {
    CIE2000,
    Luma,
    Redmean,
}

impl QuantizeMethodWrapper {
    pub fn map_to_color_reduce(&self) -> QuantizeMethod {
        match self {
            QuantizeMethodWrapper::CIE2000 => QuantizeMethod::CIE2000,
            QuantizeMethodWrapper::Redmean => QuantizeMethod::Redmean,
            QuantizeMethodWrapper::Luma => QuantizeMethod::Luma,
        }
    }
}

#[wasm_bindgen]
pub fn process(
    img_buffer: Vec<u8>,
    palette: Vec<js_sys::Uint8Array>,
    method: QuantizeMethodWrapper,
    use_dither: bool,
    dither_threshold: f32,
) -> Vec<u8> {
    let mut img = image::load_from_memory(&img_buffer).unwrap().to_rgb8();
    let palette_colors = palette
        .iter()
        .map(|x| [x.get_index(0), x.get_index(1), x.get_index(2)])
        .collect();
    let palette = BasePalette::new(palette_colors);
    let dither = match use_dither {
        false => None,
        true => Some((dither_threshold * 255.).round() as u8),
    };
    let method = method.map_to_color_reduce();

    quantize(&mut img, &palette, method, dither);

    let mut png_buffer: Vec<u8> = vec![];
    let encoder = PngEncoder::new(&mut png_buffer);
    let (width, height) = img.dimensions();
    encoder
        .encode(&img.into_raw(), width, height, ColorType::Rgb8)
        .unwrap();
    png_buffer
}
