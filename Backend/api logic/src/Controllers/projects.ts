import { Request, RequestHandler, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../helpers/dbConnect";

type project = {
  id: string;
  clientId: string;
  projectTitle: string;
  projectType: string;
  assigned_on: Date;
  due_on: Date;
  delivered: Boolean;
}[];

export const getAllProjects: RequestHandler = async (req, res) => {
  try {
    let projects = await db.execute("getAllProjects");
    return res.status(200).json({ data: projects });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getOneProject: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    let project = await db.execute("getOneproject", { id });
    if (project.length === 0)
      return res.status(404).json({ error: "Project not found" });
    return res.status(200).json({ data: project });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const addProject: RequestHandler = async (req, res) => {
  const { clientId, projectTitle, projectType, assigned_on, due_on } = req.body;

  console.log({ clientId, projectTitle, projectType, assigned_on, due_on });
  try {
    let id = uuidv4();
    await db.execute("insertOrUpdateProject", {
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
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateProject: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { clientId, projectTitle, projectType, assigned_on, due_on } = req.body;
  try {
    let projectExists =
      (await db.execute("getOneproject", { id })).length > 0 ? true : false;
    if (!projectExists)
      return res.status(404).json({ error: "Project not found" });
    await db.execute("insertOrUpdateProject", {
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
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const removeProject: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    let projectExists =
      (await db.execute("getOneproject", { id })).length > 0 ? true : false;
    if (!projectExists)
      return res.status(404).json({ error: "Project not found" });
    await db.execute("removeProject", { id });
    return res
      .status(200)
      .json({ message: "The project has succefully been deleted" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//deliver project

export const deliverProject: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    let project: project = await db.execute("getOneproject", { id });
    let projectValid =
      project.length === 0 ? false : project[0].delivered ? false : true;
    if (!projectValid)
      return res
        .status(404)
        .json({ error: "Project not found or has already been delivered" });
    await db.execute("deliverProject", { id });
    res
      .status(200)
      .json({ message: "The project has been marked as completed" });
  } catch (error) {
    let message = error || "An error occured.Try again later";
    res.status(500).json({ error: message });
  }
};

export const markProjectPaid: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    let projectExists =
      (await db.execute("getOneproject", { id })).length > 0 ? true : false;
    if (!projectExists)
      return res
        .status(404)
        .json({ error: "Project not found. Please add it first" });
    await db.execute("markProjectAsPaid", { projectId: id });
    res.status(200).json({ message: "The payment made" });
  } catch (error) {
    let message = error || "An error occured.Try again later";
    res.status(500).json({ error: message });
  }
};

//generate clients invoices thd client
//should be able to see their invoices only
//generate invoices
//deliver a task
//add payments
