"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const property_controller_1 = require("../controllers/property.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/', auth_1.authenticate, property_controller_1.PropertyController.createProperty);
router.get('/', auth_1.authenticate, property_controller_1.PropertyController.getProperties);
exports.default = router;
