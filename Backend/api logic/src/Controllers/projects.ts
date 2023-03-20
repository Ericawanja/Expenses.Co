import { Request, RequestHandler, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../helpers/dbConnect";


export const getAllProjects: RequestHandler = async (req, res) => {
    try {
      let projects = await db.execute("getAllProjects");
      return res.status(200).json({ data:projects });
    } catch (error) {
      return res.status(500).json({ error });
    }
};
  
export const getOneProject: RequestHandler = async (req, res) => {
      const { id } = req.params; 
    try {
      let project =
      (await db.execute("getOneproject", { id }))
    if (project.length === 0)
      return res.status(404).json({ error: "Project not found" });
   return res.status(200).json({data: project });  
    } catch (error) {
      return res.status(500).json({ error });
    }
};

export const addProject: RequestHandler = async (req, res) => {
  const { clientId, projectTitle, projectType, assigned_on, due_on } = req.body;

  console.log({ clientId, projectTitle, projectType, assigned_on, due_on })
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


