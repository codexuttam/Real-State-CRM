"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
class AuthService {
    async register(userData) {
        const hashedPassword = await bcryptjs_1.default.hash(userData.password, 10);
        const user = await index_1.prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword,
            },
        });
        return this.generateToken(user);
    }
    async login(credentials) {
        const user = await index_1.prisma.user.findUnique({
            where: { email: credentials.email },
        });
        if (!user || !(await bcryptjs_1.default.compare(credentials.password, user.password))) {
            throw new Error('Invalid credentials');
        }
        return this.generateToken(user);
    }
    generateToken(user) {
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        return { token, user: { id: user.id, name: user.name, role: user.role } };
    }
}
exports.AuthService = AuthService;
