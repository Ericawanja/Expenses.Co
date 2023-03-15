"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clients_1 = require("../Controllers/clients");
const clientsRoutes = (0, express_1.Router)();
clientsRoutes.post("/add", clients_1.addClient);
clientsRoutes.put("/:id", clients_1.updateClientDetails);
clientsRoutes.delete("/:id", clients_1.removeClient);
exports.default = clientsRoutes;
