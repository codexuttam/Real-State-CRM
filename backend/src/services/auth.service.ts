import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export class AuthService {
  async register(userData: any) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
    return this.generateToken(user);
  }

  async login(credentials: any) {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    return { token, user: { id: user.id, name: user.name, role: user.role } };
  }
}
