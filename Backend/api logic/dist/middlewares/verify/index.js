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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../../.env") });
function verify(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bearer = req.headers["authorization"];
            if (!bearer || !bearer.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Log in first" });
            }
            const token = bearer.split(" ")[1];
            const decodedData = yield jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            req.info = decodedData;
            next();
        }
        catch (error) {
            let message = error || "An error occured try again later";
            return res.status(401).json({ message });
        }
    });
}
exports.default = verify;
