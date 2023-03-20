"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_1 = require("../Controllers/projects");
const adminVerification_1 = __importDefault(require("../middlewares/adminVerification"));
const index_1 = require("../middlewares/validator/index");
const index_2 = require("../schemas/index");
const projectRouter = (0, express_1.Router)();
projectRouter.get("/", adminVerification_1.default, projects_1.getAllProjects);
projectRouter.get("/:id", adminVerification_1.default, projects_1.getOneProject);
projectRouter.post("/", adminVerification_1.default, (0, index_1.validator)(index_2.projectSchema), projects_1.addProject);
projectRouter.put("/:id", adminVerification_1.default, (0, index_1.validator)(index_2.projectSchema), projects_1.updateProject);
projectRouter.delete("/:id", adminVerification_1.default, projects_1.removeProject);
exports.default = projectRouter;
