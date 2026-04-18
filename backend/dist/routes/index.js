"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lead_routes_1 = __importDefault(require("./lead.routes"));
const property_controller_1 = require("../controllers/property.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use('/leads', lead_routes_1.default);
// Properties
router.post('/properties', auth_1.authenticate, property_controller_1.PropertyController.createProperty);
router.get('/properties', auth_1.authenticate, property_controller_1.PropertyController.getProperties);
// Clients and Deals would follow a similar pattern
// router.use('/clients', clientRoutes);
// router.use('/deals', dealRoutes);
exports.default = router;
