"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const property_service_1 = require("../services/property.service");
const propertyService = new property_service_1.PropertyService();
class PropertyController {
    static async createProperty(req, res) {
        try {
            const property = await propertyService.createProperty(req.body);
            res.status(201).json(property);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async getProperties(req, res) {
        try {
            const { location, minPrice, maxPrice, type } = req.query;
            const properties = await propertyService.getProperties({
                location: location,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
                type: type,
            });
            res.json(properties);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.PropertyController = PropertyController;
