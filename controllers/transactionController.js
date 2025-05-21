import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id });
  res.json(transactions);
};

export const addTransaction = async (req, res) => {
  const { type, category, amount, note } = req.body;

  const newTransaction = await Transaction.create({
    userId: req.user._id,
    type,
    category,
    amount,
    note,
  });

  res.status(201).json(newTransaction);
};

export const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) return res.status(404).json({ message: "Not found" });

  if (transaction.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await transaction.remove();
  res.json({ message: "Transaction deleted" });
};
