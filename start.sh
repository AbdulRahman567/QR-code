#!/bin/bash
set -e

echo "Installing dependencies..."
npm install --prefix backend
npm install --prefix frontend

echo "Building backend..."
npm run build --prefix backend

echo "Building frontend..."
npm run build --prefix frontend

echo "Starting backend server..."
node backend/dist/main.js
