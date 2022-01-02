#!/usr/bin/env bash

mkdir -p src/main/native
cd src/native
${CARGO:-cargo} build --release "$@"
cp target/release/libcolor_reduce_native.so ../main/native/color_reduce_native.node
cp target/release/libcolor_reduce_native.dll ../main/native/color_reduce_native.node
cp target/release/libcolor_reduce_native.dylib   ../main/native/color_reduce_native.node
cd ../..