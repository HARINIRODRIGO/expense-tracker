import React, { useState } from "react";
import { Expenses } from "@/types/Expense";
import { Category } from "@/types/Category";

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: Expenses) => void;
  categories: Category[];
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ isOpen, onClose, onSave, categories }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>();
  const [category, setCategory] = useState<Category | null>(null);

  const handleSave = () => {
    const newExpense: Expenses = {
      id: crypto.randomUUID(),
      description,
      amount: amount!,
      category: category!,
    };
    onSave(newExpense);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">

            <div className="flex items-center justify-between p-4 md:p-5 ">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Create New Expense
                </h3>
                <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
        <div className="col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <input type="text" name="name" id="name"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={description} onChange={(e) => setDescription(e.target.value)}placeholder="Description"/>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
          <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value ={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="250" ></input>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  value={category?.id}
              onChange={(e) =>
                setCategory(categories.find((cat) => cat.id === e.target.value) || null)
              }>
                   <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
        </div>          
        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button type="submit" onClick={handleSave} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Add new product
                </button>
         
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
