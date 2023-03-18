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
exports.removeProject = exports.updateProject = exports.addProject = exports.getOneProject = exports.getAllProjects = void 0;
const uuid_1 = require("uuid");
const dbConnect_1 = require("../helpers/dbConnect");
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let projects = yield dbConnect_1.db.execute("getAllProjects");
        return res.status(200).json({ data: projects });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getAllProjects = getAllProjects;
const getOneProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let project = (yield dbConnect_1.db.execute("getOneproject", { id }));
        if (project.length === 0)
            return res.status(404).json({ error: "Project not found" });
        return res.status(200).json({ data: project });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getOneProject = getOneProject;
const addProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId, projectTitle, projectType, assigned_on, due_on } = req.body;
    console.log('run');
    console.log({ clientId, projectTitle, projectType, assigned_on, due_on });
    try {
        let id = (0, uuid_1.v4)();
        yield dbConnect_1.db.execute("insertOrUpdateProject", {
            id,
            clientId,
            projectTitle,
            projectType,
            assigned_on,
            due_on,
        });
        return res
            .status(201)
            .json({ message: "You have successfully created a project" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.addProject = addProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { clientId, projectTitle, projectType, assigned_on, due_on } = req.body;
    try {
        let projectExists = (yield dbConnect_1.db.execute("getOneproject", { id })).length > 0 ? true : false;
        if (!projectExists)
            return res.status(404).json({ error: "Project not found" });
        yield dbConnect_1.db.execute("insertOrUpdateProject", {
            id,
            clientId,
            projectTitle,
            projectType,
            assigned_on,
            due_on,
        });
        return res.status(200).json({
            message: `You have successfully updated the ${projectTitle} project`,
        });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.updateProject = updateProject;
const removeProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let projectExists = (yield dbConnect_1.db.execute("getOneproject", { id })).length > 0 ? true : false;
        if (!projectExists)
            return res.status(404).json({ error: "Project not found" });
        yield dbConnect_1.db.execute("removeProject", { id });
        return res
            .status(200)
            .json({ message: "The project has succefully been deleted" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.removeProject = removeProject;
