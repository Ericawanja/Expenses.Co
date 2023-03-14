"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clients_1 = require("../Controllers/clients");
const clientsRoutes = (0, express_1.Router)();
clientsRoutes.post("/add", clients_1.addClient);
exports.default = clientsRoutes;
