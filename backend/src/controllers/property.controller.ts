import { Request, Response } from 'express';
import { PropertyService } from '../services/property.service';

const propertyService = new PropertyService();

export class PropertyController {
  static async createProperty(req: Request, res: Response) {
    try {
      const property = await propertyService.createProperty(req.body);
      res.status(201).json(property);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getProperties(req: Request, res: Response) {
    try {
      const { location, minPrice, maxPrice, type } = req.query;
      const properties = await propertyService.getProperties({
        location: location as string,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        type: type as any,
      });
      res.json(properties);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
