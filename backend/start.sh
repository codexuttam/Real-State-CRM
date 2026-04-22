#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Applying database migrations..."
npx prisma migrate deploy

# Optional: Automatic seeding for first-time cloud setup
echo "Checking if database needs seeding..."
# This runs the seed script to ensure the dashboard looks great immediately
npx prisma db seed || echo "Seeding skipped or already completed."

echo "Starting application..."
npm start
