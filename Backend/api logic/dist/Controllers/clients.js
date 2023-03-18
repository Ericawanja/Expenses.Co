"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeClient = exports.updateClientDetails = exports.addClient = exports.getOneClient = exports.getAllClients = void 0;
const dbConnect_1 = require("../helpers/dbConnect");
const uuid_1 = require("uuid");
const getAllClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let clients = yield dbConnect_1.db.execute("getAllClients");
        return res.status(200).json({ data: clients });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getAllClients = getAllClients;
const getOneClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let client = yield dbConnect_1.db.execute("getOneClient", { id });
        if (client.length === 0)
            return res.status(404).json({ error: "Client not found" });
        return res.status(200).json({ data: client });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getOneClient = getOneClient;
const addClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let loggedUser = req.info;
        if (!loggedUser.isAdmin)
            return res.status(401).json({ message: "You cannot add a client" });
        const { name, email, location } = req.body;
        const user = yield dbConnect_1.db.execute("getclients", { email });
        if (user.length > 0)
            return res.status(400).json({ error: "Wrong details entered" });
        let id = (0, uuid_1.v4)();
        yield dbConnect_1.db.execute("insertOrUpdateClient", { id, name, email, location });
        res.status(201).json({ message: "client details added successfully" });
    }
    catch (error) {
        let message = error || "An error occured. Please try later";
        res.status(500).json({ error: message });
    }
});
exports.addClient = addClient;
const updateClientDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let loggedUser = req.info;
        console.log(loggedUser);
        if (!loggedUser.isAdmin)
            return res.status(401).json({ message: "You cannot add a client" });
        const { id } = req.params;
        const { name, email, location } = req.body;
        const user = yield dbConnect_1.db.execute("getclients", { id });
        if (user.length === 0)
            return res.status(400).json({ error: "Wrong details entered" });
        yield dbConnect_1.db.execute("insertOrUpdateClient", { id, name, email, location });
        res.status(201).json({ message: "client updated successfully" });
    }
    catch (error) {
        console.log(error);
        let message = error || "An error occured. Please try later";
        res.status(500).json({ error: message });
    }
});
exports.updateClientDetails = updateClientDetails;
const removeClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let loggedUser = req.info;
        if (!loggedUser.isAdmin)
            return res.status(401).json({ message: "You cannot add a client" });
        const { id } = req.params;
        const user = yield dbConnect_1.db.execute("getclients", { id });
        if (user.length === 0)
            return res.status(400).json({ error: "Wrong details entered" });
        yield dbConnect_1.db.execute("removeClient", { id });
        return res
            .status(200)
            .json({ message: "You have successfully removed the client" });
    }
    catch (error) {
        console.log(error);
        let message = error || "An error occured. Please try later";
        res.status(500).json({ error: message });
    }
});
exports.removeClient = removeClient;
