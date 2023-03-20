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
exports.updateProjectExpenses = exports.insertProjectExpenses = exports.getAllProjectExpenses = void 0;
const dbConnect_1 = require("../helpers/dbConnect");
const uuid_1 = require("uuid");
const getAllProjectExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield dbConnect_1.db.execute("getAllProjectsExpenses");
        if (expenses.length === 0)
            return res.status(404).json({ error: "No project expenses found" });
        return res.status(200).json({ data: expenses });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getAllProjectExpenses = getAllProjectExpenses;
const insertProjectExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const { projectId, expenditure, budget } = req.body;
    try {
        yield dbConnect_1.db.execute("insertOrUpdateProjectExpenses", {
            id,
            projectId,
            expenditure,
            budget,
        });
        res
            .status(201)
            .json({ message: "You have succesfully added the new expense" });
    }
    catch (error) {
        let message = error || "An error occured. Try again later";
        res.status(500).json({ error: message });
    }
});
exports.insertProjectExpenses = insertProjectExpenses;
const updateProjectExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const projectExists = (yield dbConnect_1.db.execute("getOneProjectExpense", { id })).length === 0
        ? false
        : true;
    if (!projectExists)
        return res.status(504).json({ error: "Incorrect project expense id" });
    const { projectId, expenditure, budget } = req.body;
    try {
        yield dbConnect_1.db.execute("insertOrUpdateProjectExpenses", {
            id,
            projectId,
            expenditure,
            budget,
        });
        res
            .status(200)
            .json({ message: "You have succesfully updated the expense" });
    }
    catch (error) {
        let message = error || "An error occured. Try again later";
        res.status(500).json({ error: message });
    }
});
exports.updateProjectExpenses = updateProjectExpenses;
