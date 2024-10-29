"use client";
import React, { useState } from "react";
import ExpenseHeader from "../components/ExpenseHeader";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseModal from "../components/ExpenseModal";
import { Expenses } from "@/types/Expense";
import { Category } from "@/types/Category";

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const categories: Category[] = [
    { id: crypto.randomUUID(), name: "Food", icon: "🍔" },
    { id: crypto.randomUUID(), name: "Transport", icon: "🚗" },
    { id: crypto.randomUUID(), name: "Entertainment", icon: "🎉" },
    { id: crypto.randomUUID(), name: "Cloths", icon: "👚" },
  ];

  const handleAddExpense = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSaveExpense = (expense: Expenses) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
    handleCloseModal();
  };

  const handleUpdateExpense = (updatedExpense: Expenses) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <ExpenseHeader onAddExpense={handleAddExpense} />
      <ExpenseTable
        expenses={expenses}
        categories={categories}
        onDelete={handleDeleteExpense}
        onUpdate={handleUpdateExpense}
      />
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveExpense}
        categories={categories}
      />
    </div>
  );
};

export default ExpenseTracker;
