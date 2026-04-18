"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
const PORT = process.env.PORT || 5000;
const routes_1 = __importDefault(require("./routes"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Main API Routes
app.use('/api', routes_1.default);
// Basic health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Real Estate CRM API is running' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
