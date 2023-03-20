"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clients_1 = require("../Controllers/clients");
const index_1 = require("../middlewares/validator/index");
const index_2 = require("../schemas/index");
const adminVerification_1 = __importDefault(require("../middlewares/adminVerification"));
const clientsRoutes = (0, express_1.Router)();
clientsRoutes.get("/", adminVerification_1.default, clients_1.getAllClients);
clientsRoutes.get("/:id", adminVerification_1.default, clients_1.getOneClient);
clientsRoutes.post("/", adminVerification_1.default, (0, index_1.validator)(index_2.clientRegisterSchema), clients_1.addClient);
clientsRoutes.put("/:id", adminVerification_1.default, (0, index_1.validator)(index_2.clientRegisterSchema), clients_1.updateClientDetails);
clientsRoutes.delete("/:id", adminVerification_1.default, clients_1.removeClient);
exports.default = clientsRoutes;
