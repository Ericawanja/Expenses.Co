"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeClient = exports.updateClientDetails = exports.addClient = void 0;
const addClient = (req, res) => {
    const { name, email, location } = req.body;
    res.send('jjj jjj');
};
exports.addClient = addClient;
const updateClientDetails = (req, res) => {
    res.send('the app');
};
exports.updateClientDetails = updateClientDetails;
const removeClient = (req, res) => {
    res.send('the app');
};
exports.removeClient = removeClient;
