use color_reduce::{quantize, BasePalette, QuantizeMethod};
use image::png::PngEncoder;
use image::ColorType;
use napi::bindgen_prelude::*;
use napi::{JsNumber, JsTypedArray};
use napi_derive::napi;

#[napi]
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

pub fn to_palette(palette: JsTypedArray) -> Result<BasePalette> {
    let mut palette_colors: Vec<[u8; 3]> = Vec::new();
    let length = palette.get_array_length()?;
    for i in 0..length {
        let pixel = palette.get_element::<JsTypedArray>(i)?;
        palette_colors.push([
            pixel.get_element::<JsNumber>(0)?.get_uint32()? as u8,
            pixel.get_element::<JsNumber>(1)?.get_uint32()? as u8,
            pixel.get_element::<JsNumber>(2)?.get_uint32()? as u8,
        ])
    }
    Ok(BasePalette::new(palette_colors))
}

#[napi]
pub fn process(
    img_buffer: Uint8Array,
    palette: JsTypedArray,
    method: QuantizeMethodWrapper,
    use_dither: bool,
    dither_threshold: JsNumber,
) -> Result<Uint8Array> {
    // Convert to reasonable format
    let img_buffer = img_buffer.to_vec();
    let palette = to_palette(palette)?;
    let method = method.map_to_color_reduce();
    // Logic here

    let mut img = image::load_from_memory(&img_buffer).unwrap().to_rgb8();
    let dither = match use_dither {
        false => None,
        true => Some((dither_threshold.get_double()? * 255.).round() as u8),
    };

    quantize(&mut img, &palette, method, dither);

    let mut png_buffer: Vec<u8> = vec![];
    let encoder = PngEncoder::new(&mut png_buffer);
    let (width, height) = img.dimensions();
    encoder
        .encode(&img.into_raw(), width, height, ColorType::Rgb8)
        .unwrap();
    Ok(Uint8Array::new(png_buffer))
}
