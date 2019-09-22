#!/bin/bash

# Prevent packing of resource fork files on macOS (./._xxxxx)
export COPYFILE_DISABLE=true

set -e

pushd "${0%/*}" # Go to script directory
BUILD_DIR="$(pwd)"
OUTPUT_DIR="$BUILD_DIR/Output"

rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

echo "--- Building project..."
cd "../Source"
npm ci
npm run build

echo "--- Creating package..."
cd "dist"
tar czf "$OUTPUT_DIR/Own.BlockchainExplorer.App.tar.gz" *

popd # Go back to caller directory

# Show build output
echo "--- Build output in $OUTPUT_DIR"
ls -lh "$OUTPUT_DIR"
