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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset = exports.forgot = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dbConnect_1 = require("../helpers/dbConnect");
const uuid_1 = require("uuid");
const generateToken_1 = require("../helpers/generateToken");
const verifyToken_1 = require("../helpers/verifyToken");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { fullname, email, password, isAdmin = false } = req.body;
    try {
        let exists = (yield dbConnect_1.db.execute("getUSer", { email })).length === 0 ? false : true;
        if (exists)
            return res.status(400).json({ error: "Wrong registration details" });
        let hashedPassword = yield bcrypt_1.default.hash(password, 8);
        let id = (0, uuid_1.v4)();
        yield dbConnect_1.db.execute("registerOrUpdateUser", {
            id,
            fullname,
            email,
            password: hashedPassword,
            isAdmin: isAdmin,
        });
        res.status(200).json({ message: "user added succesfully" });
    }
    catch (error) {
        let message = error || "Try again later can't process the request now";
        res.status(500).json({ error: message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    try {
        let user = yield dbConnect_1.db.execute("getUSer", { email });
        if (user.length === 0)
            return res.status(400).json({ error: "Wrong login details" });
        let isCorrect = yield bcrypt_1.default.compare(password, user[0].password);
        if (!isCorrect)
            return res.status(400).json({ error: "invalid login creditials" });
        const token = (0, generateToken_1.generateToken)({
            email: user[0].email,
            id: user[0].id,
            isAdmin: user[0].isAdmin,
        });
        return res.status(200).json({ status: "succesful login", token });
    }
    catch (error) {
        let message = error || "Try again later can't process the request now";
        res.status(500).json({ error: message });
    }
});
exports.login = login;
const forgot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        let user = yield dbConnect_1.db.execute("getUSer", { email });
        if (user.length === 0)
            return res.status(400).json({ error: "Wrong login details" });
        const token = (0, generateToken_1.generateToken)({ email });
        yield dbConnect_1.db.execute("insertResetQUeue", { email, token });
        res
            .status(200)
            .json({ message: "Please check your email for a reset link" });
    }
    catch (error) {
        let message = error || "Try again later can't process the request now";
        res.status(500).json({ error: message });
    }
});
exports.forgot = forgot;
const reset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield dbConnect_1.db.execute("getUSer", { email });
        if (user.length === 0)
            return res.status(400).json({ error: "Wrong login details" });
        let inReset = yield dbConnect_1.db.execute("getFromResetQueue", { email });
        if (inReset.length === 0)
            return res.status(400).json({ error: "An error Occured" });
        let token = inReset[0].token;
        const decodedData = yield (0, verifyToken_1.verifyToken)(token);
        if (!decodedData)
            return res.status(400).json({ error: "An error Occured" });
        let hashedPassword = yield bcrypt_1.default.hash(password, 8);
        yield dbConnect_1.db.execute("resetPassword", { email, password: hashedPassword });
        yield dbConnect_1.db.execute("removeFromResetQueue", { email });
        res.status(200).json({ message: "Login details updated successfully" });
    }
    catch (error) {
        let message = error || "Try again later can't process the request now";
        res.status(500).json({ error: message });
    }
});
exports.reset = reset;
