import { RequestHandler } from 'express';
import { db } from '../helpers/dbConnect';
export const generateAllInvoices: RequestHandler = async (req, res) => {
    try {
      const allInvoices = await db.execute("generateAllInvoices");
      if (allInvoices.length === 0)
        return res.status(404).json({ message: "No invoices found" });
      return res.status(200).json({ data: allInvoices });
    } catch (error) {
      let message = error || "An error occured try late";
      res.status(500).json({ error: message });
    }
  };