#!/bin/bash

# Setup script for local development
# Creates symlink from public/local-photos to local photography repo

PHOTOGRAPHY_DIR="/Users/joshuaheiland/Projects/photography/photos"
SYMLINK_PATH="public/local-photos"

# Check if photography directory exists
if [ ! -d "$PHOTOGRAPHY_DIR" ]; then
  echo "Warning: Photography directory not found at $PHOTOGRAPHY_DIR"
  echo "Local photos will not be available."
  exit 1
fi

# Remove existing symlink if it exists
if [ -L "$SYMLINK_PATH" ]; then
  echo "Removing existing symlink..."
  rm "$SYMLINK_PATH"
fi

# Create the symlink
echo "Creating symlink from $SYMLINK_PATH to $PHOTOGRAPHY_DIR..."
ln -s "$PHOTOGRAPHY_DIR" "$SYMLINK_PATH"

echo "✓ Local development setup complete!"
