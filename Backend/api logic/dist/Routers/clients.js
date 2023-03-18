"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clients_1 = require("../Controllers/clients");
const index_1 = __importDefault(require("../middlewares/verify/index"));
const clientsRoutes = (0, express_1.Router)();
clientsRoutes.get("/", index_1.default, clients_1.getAllClients);
clientsRoutes.get("/:id", index_1.default, clients_1.getOneClient);
clientsRoutes.post("/add", index_1.default, clients_1.addClient);
clientsRoutes.put("/:id", index_1.default, clients_1.updateClientDetails);
clientsRoutes.delete("/:id", index_1.default, clients_1.removeClient);
exports.default = clientsRoutes;
