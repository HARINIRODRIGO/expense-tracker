import React from 'react';

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalExpenses: number;
}

const SummaryModal: React.FC<SummaryModalProps> = ({ isOpen, onClose, totalExpenses }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-2xl font-semibold mb-4">Expense Summary</h2>
        <p className="text-lg mb-4">Total Expenses for All Categories:</p>
        <p className="text-3xl font-bold mb-6">${totalExpenses.toFixed(2)}</p>
        <button onClick={onClose} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default SummaryModal;
