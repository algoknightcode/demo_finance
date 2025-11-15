import User from "../models/user.js";

import xlsx from "xlsx";
import Income from "../models/income.js";


// ✅ Add Income
export const addIncome = async (req, res) => {
  const userId = req.user?.id;
  try {
    const { icon, source, amount, date } = req.body || {};
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });
    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get All Income
export const getAllIncome = async (req, res) => {
  const userId = req.user?.id;
  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Delete Income
export const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Download Income Excel
export const downloadIncomeExcel = async (req, res) => {
  const userId = req.user?.id;
  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    const data = incomes.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
