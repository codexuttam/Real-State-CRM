#!/bin/sh

# Apply database migrations
echo "Applying database migrations..."
npx prisma migrate deploy

# Run seeding (errors here won't stop the app from starting)
echo "Attempting to seed database..."
npx prisma db seed || echo "Seeding skipped or already done."

echo "Starting application..."
npm start
