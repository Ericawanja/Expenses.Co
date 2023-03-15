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
exports.removeClient = exports.updateClientDetails = exports.addClient = void 0;
const addClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, location } = req.body;
    console.log(name, email);
    res.send("done");
});
exports.addClient = addClient;
const updateClientDetails = (req, res) => {
    res.send('the app');
};
exports.updateClientDetails = updateClientDetails;
const removeClient = (req, res) => {
    res.send('the app');
};
exports.removeClient = removeClient;
