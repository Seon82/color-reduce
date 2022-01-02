# color-reduce
color-reduce provides wasm bindings to the rust implementation of [color-reduce](https://github.com/Seon82/color-reduce-rs), which is used to map image colors to a given palette as fast as possible.

# Installation
`npm i @seon82/color-reduce`

# Quickstart
```javascript
const {process, QuantizeMethod} = require("seon82@color-reduce");
const fs = require('fs')

// B&W palette
const palette = [[2555,255,255], [0,0,0]]

fs.readFile("cat.jpg", (err, data) => {
  if (err) throw err;
  // No dithering, redmean color distance
  processed_data = process(data, palette, QuantizeMethod.Redmean, false)
  // Dither
  // processed_data = process(data, palette, QuantizeMethod.Redmean, true, 0.2)

  fs.writeFile("cat_processed.jpg", processed_data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })
});
``` 