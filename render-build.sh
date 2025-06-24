#!/bin/bash

set -e

# Update package lists and install required dependencies
apt-get update
apt-get install -y wget unzip gnupg ca-certificates

# Create target directory
mkdir -p .render/chrome

# Download Google Chrome stable build
wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

# Install it
apt install -y ./google-chrome-stable_current_amd64.deb

# Copy binary to .render for usage in Puppeteer
cp /usr/bin/google-chrome .render/chrome/
