import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

import apiRoutes from './routes';

app.use(cors());
app.use(express.json());

// Main API Routes
app.use('/api', apiRoutes);

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Real Estate CRM API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app, prisma };
