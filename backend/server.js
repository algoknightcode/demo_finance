import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import incomeRoute from './routes/incomeRoute.js';
import expenseRoute from "./routes/expenseRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// Essential middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

// Let cors middleware handle OPTIONS requests

connectDB();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Fix static file serving - place this before routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Lightweight health check endpoint for connectivity tests
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use("/api/auth", authRoute)
app.use("/api/income", incomeRoute)
app.use("/api/expense", expenseRoute);
app.use("/api/dashboard",dashboardRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
