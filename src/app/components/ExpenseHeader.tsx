import React from "react";

const ExpenseHeader: React.FC<{ onAddExpense: () => void }> = ({ onAddExpense }) => {
  return (
    <div className="flex items-center justify-between py-4">
      <h2 className="text-2xl font-bold flex items-center">
        Expense List
        <button
          onClick={onAddExpense}
          className="text-blue-600 hover:text-blue-800 p-2 ml-2"
          aria-label="Add Expense"
          title="New Expense"
        >
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z" />
          </svg>
        </button>
      </h2>
    </div>
  );
};

export default ExpenseHeader;
