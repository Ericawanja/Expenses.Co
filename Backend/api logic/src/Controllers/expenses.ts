import { RequestHandler } from "express";
import { db } from "../helpers/dbConnect";
import { v4 as uuidv4 } from "uuid";
import projectRouter from "../Routers/projects";
import expensesRouter from "../Routers/expenses";

export const getAllProjectExpenses: RequestHandler = async (req, res) => {
  try {
    const expenses = await db.execute("getAllProjectsExpenses");
    if (expenses.length === 0)
      return res.status(404).json({ error: "No project expenses found" });

    return res.status(200).json({ data: expenses });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getParticularProjectExpenses: RequestHandler = async (
  req,
  res
) => {
  const { projectId } = req.params;
  try {
    const expenses = await db.execute("getParticularProjectExpenses", {
      id: projectId,
    });

    if (expenses.length === 0)
      return res.status(500).json({ error: "No projects found" });
    return res.status(200).json({ data: expenses });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const insertProjectExpenses: RequestHandler = async (req, res) => {
  const id = uuidv4();
  const { projectId, expenseTitle, expenseDescription } = req.body;
  try {
    //check if the project exists

    const project = await db.query(
      `select * from projects where id = '${projectId}'`
    );
    if (project.length === 0)
      return res.status(504).json({ error: "This project does not exist" });

    await db.execute("insertOrUpdateProjectExpenses", {
      id,
      projectId,
      expenseTitle,
      expenseDescription,
    });
    res
      .status(201)
      .json({ message: "You have succesfully added the new expense" });
  } catch (error) {
    let message = error || "An error occured. Try again later";
    res.status(500).json({ error: message });
  }
};

export const updateProjectExpenses: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const projectExists =
    (await db.execute("getOneProjectExpense", { id })).length === 0
      ? false
      : true;
  if (!projectExists)
    return res.status(504).json({ error: "Incorrect project expense id" });
  const { projectId, expenseTitle, expenseDescription } = req.body;
  try {
    await db.execute("insertOrUpdateProjectExpenses", {
      id,
      projectId,
      expenseTitle,
      expenseDescription,
    });
    res
      .status(200)
      .json({ message: "You have succesfully updated the expense" });
  } catch (error) {
    let message = error || "An error occured. Try again later";
    res.status(500).json({ error: message });
  }
};

export const removeProjectExpenses: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const projectExists =
      (await db.execute("getOneProjectExpense", { id })).length === 0
        ? false
        : true;
    if (!projectExists)
      return res.status(504).json({ error: "Incorrect project expense id" });
    await db.execute("removeProjectExpense", { id });
    return res
      .status(200)
      .json({ message: "You have succesfully deleted the details" });
  } catch (error) {
    let message = error || "An error occured. Try again later";
    res.status(500).json({ error: message });
  }
};

