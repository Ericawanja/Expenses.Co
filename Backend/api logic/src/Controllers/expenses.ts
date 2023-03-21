import { RequestHandler } from "express";
import { db } from "../helpers/dbConnect";
import { v4 as uuidv4 } from "uuid";

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

export const insertProjectExpenses: RequestHandler = async (req, res) => {
  const id = uuidv4();
  const { projectId, expenditure, budget } = req.body;
  try {
    //check if the project with the same projectId exists
  
    const expenseExists = (await db.query(`Select * from expenses where projectId = '${projectId}'`))
        
     
    if(expenseExists) return res.status(504).json({error:"This project exists"})  
    await db.execute("insertOrUpdateProjectExpenses", {
      id,
      projectId,
      expenditure,
      budget,
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
  const { projectId, expenditure, budget } = req.body;
  try {
    await db.execute("insertOrUpdateProjectExpenses", {
      id,
      projectId,
      expenditure,
      budget,
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
