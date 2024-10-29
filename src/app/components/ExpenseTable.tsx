import React, { useState } from "react";
import { Expenses } from "@/types/Expense";
import { Category } from "@/types/Category";

interface ExpenseTableProps {
  expenses: Expenses[];
  categories: Category[];
  onDelete: (id: string) => void;
  onUpdate: (updatedExpense: Expenses) => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses, categories, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedExpense, setEditedExpense] = useState<Partial<Expenses> | null>(null); // makes all the properties of the Expenses type optional

  const startEditing = (expense: Expenses) => {
    setEditingId(expense.id);
    setEditedExpense(expense);
  };

  const stopEditing = () => {
    setEditingId(null);
    setEditedExpense(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedExpense((prev) =>
      prev ? { ...prev, [name]: name === "amount" ? parseFloat(value) : value } : null
    );
  };

  const saveChanges = () => {
    if (editedExpense) {
      onUpdate(editedExpense as Expenses); // Call the update function with the edited expense
      stopEditing();
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-4 py-2 border-b-2 border-gray-200 text-left font-semibold">Description</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 text-left font-semibold">Amount</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 text-left font-semibold">Category</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="px-6 py-4">
                {editingId === expense.id ? (
                  <input
                    type="text"
                    name="description"
                    value={editedExpense?.description || ""}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1 rounded"
                  />
                ) : (
                  expense.description
                )}
              </td>
              <td className="px-6 py-4">
                {editingId === expense.id ? (
                  <input
                    type="number"
                    name="amount"
                    value={editedExpense?.amount || ""}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1 rounded"
                  />
                ) : (
                  `Rs. ${expense.amount.toFixed(2)}`
                )}
              </td>
              <td className="px-6 py-4">
                {editingId === expense.id ? (
                  <select
                    name="category"
                    value={editedExpense?.category?.id|| ""}
                    onChange={(e) =>
                      setEditedExpense((prev) =>
                        prev
                          ? { ...prev, category: categories.find((cat) => cat.id === e.target.value) || prev.category }
                          : null
                      )
                    }
                    className="w-full border px-2 py-1 rounded"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  expense.category.name
                )}
              </td>
              <td className="px-6 py-4 flex space-x-4">
                {editingId === expense.id ? (
                  <>
                    <button onClick={saveChanges} className="text-green-600 hover:text-green-800">
                      Save
                    </button>
                    <button onClick={stopEditing} className="text-gray-600 hover:text-gray-800">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(expense)} className="text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                    <button onClick={() => onDelete(expense.id)} className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
