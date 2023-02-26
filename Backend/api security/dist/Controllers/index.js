"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register = (req, res) => {
    res.status(200).json({ msg: 'setting up the server' });
};
exports.register = register;
