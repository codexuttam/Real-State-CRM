import { prisma } from '../index';

export class PropertyService {
  async createProperty(data: any) {
    return await prisma.property.create({
      data,
    });
  }

  async getProperties(filters: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    type?: 'RESIDENTIAL' | 'COMMERCIAL';
  }) {
    return await prisma.property.findMany({
      where: {
        location: filters.location ? { contains: filters.location, mode: 'insensitive' } : undefined,
        price: {
          gte: filters.minPrice,
          lte: filters.maxPrice,
        },
        type: filters.type,
      },
      include: { agent: { select: { name: true } } },
    });
  }

  async getPropertyById(id: string) {
    return await prisma.property.findUnique({
      where: { id },
      include: { deals: true },
    });
  }

  async updateProperty(id: string, data: any) {
    return await prisma.property.update({
      where: { id },
      data,
    });
  }

  async deleteProperty(id: string) {
    return await prisma.property.delete({
      where: { id },
    });
  }
}
