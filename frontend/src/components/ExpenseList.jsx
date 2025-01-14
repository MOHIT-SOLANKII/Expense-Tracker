// import { useState } from 'react';
// import { useExpense } from '../context/ExpenseContext';
// import { Pencil, Trash2 } from 'lucide-react';

// const ExpenseList = () => {
//   const { expenses, editExpense, deleteExpense } = useExpense();
//   const [selectedMonth, setSelectedMonth] = useState(
//     new Date().toLocaleString('default', { month: 'long' })
//   );
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [editingExpense, setEditingExpense] = useState(null);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   const years = Array.from(
//     { length: 5 },
//     (_, i) => new Date().getFullYear() - 2 + i
//   );

//   const categories = [
//     'Food',
//     'Transportation',
//     'Entertainment',
//     'Shopping',
//     'Bills',
//     'Healthcare',
//     'Education',
//     'Other'
//   ];

//   const filteredExpenses = expenses.filter(
//     expense =>
//       expense.month === selectedMonth &&
//       expense.year === selectedYear
//   );

//   const handleEdit = (expense) => {
//     setEditingExpense({
//       ...expense,
//       date: new Date(expense.date).toISOString().split('T')[0]
//     });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       await editExpense(editingExpense._id, {
//         title: editingExpense.title,
//         amount: Number(editingExpense.amount),
//         category: editingExpense.category,
//         date: editingExpense.date
//       });
//       setSuccess('Expense updated successfully!');
//       setEditingExpense(null);
//     } catch (error) {
//       setError('Failed to update expense. Please try again.');
//     }
//   };

//   const handleDelete = async (expenseId) => {
//     if (!window.confirm('Are you sure you want to delete this expense?')) {
//       return;
//     }

//     try {
//       await deleteExpense(expenseId);
//       setSuccess('Expense deleted successfully!');
//     } catch (error) {
//       setError('Failed to delete expense. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-6">Expense List</h2>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       {success && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//           {success}
//         </div>
//       )}

//       <div className="flex gap-4 mb-6">
//         <select
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//           className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//         >
//           {months.map((month) => (
//             <option key={month} value={month}>
//               {month}
//             </option>
//           ))}
//         </select>

//         <select
//           value={selectedYear}
//           onChange={(e) => setSelectedYear(Number(e.target.value))}
//           className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//         >
//           {years.map((year) => (
//             <option key={year} value={year}>
//               {year}
//             </option>
//           ))}
//         </select>
//       </div>

//       {editingExpense ? (
//         <form onSubmit={handleUpdate} className="mb-8 p-4 bg-gray-50 rounded-lg">
//           <h3 className="text-lg font-medium mb-4">Edit Expense</h3>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Title</label>
//               <input
//                 type="text"
//                 value={editingExpense.title}
//                 onChange={(e) => setEditingExpense({ ...editingExpense, title: e.target.value })}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Amount</label>
//               <input
//                 type="number"
//                 value={editingExpense.amount}
//                 onChange={(e) => setEditingExpense({ ...editingExpense, amount: e.target.value })}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 required
//                 min="0"
//                 step="0.01"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Category</label>
//               <select
//                 value={editingExpense.category}
//                 onChange={(e) => setEditingExpense({ ...editingExpense, category: e.target.value })}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               >
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Date</label>
//               <input
//                 type="date"
//                 value={editingExpense.date}
//                 onChange={(e) => setEditingExpense({ ...editingExpense, date: e.target.value })}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div className="flex gap-4">
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//               >
//                 Update Expense
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setEditingExpense(null)}
//                 className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </form>
//       ) : null}

//       <div className="space-y-4">
//         {filteredExpenses.length === 0 ? (
//           <p className="text-gray-500 text-center py-4">No expenses found for this month.</p>
//         ) : (
//           filteredExpenses.map((expense) => (
//             <div
//               key={expense._id}
//               className="bg-white p-4 rounded-lg shadow flex justify-between items-center hover:shadow-md transition-shadow duration-200"
//             >
//               <div>
//                 <h3 className="font-medium">{expense.title}</h3>
//                 <p className="text-sm text-gray-500">
//                   {new Date(expense.date).toLocaleDateString()} - {expense.category}
//                 </p>
//               </div>
//               <div className="flex items-center gap-6">
//                 <span className="text-lg font-medium">${expense.amount}</span>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleEdit(expense)}
//                     className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors duration-200"
//                     title="Edit expense"
//                   >
//                     <Pencil size={20} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(expense._id)}
//                     className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
//                     title="Delete expense"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExpenseList;

import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { Pencil, Trash2, Calendar, Tag } from 'lucide-react';

const ExpenseList = () => {
  const { expenses, editExpense, deleteExpense } = useExpense();
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('default', { month: 'long' })
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [editingExpense, setEditingExpense] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - 2 + i
  );

  const categories = [
    'Food',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Bills',
    'Healthcare',
    'Education',
    'Other'
  ];

  const filteredExpenses = expenses.filter(
    expense => 
      expense.month === selectedMonth && 
      expense.year === selectedYear
  );

  const handleEdit = (expense) => {
    setEditingExpense({
      ...expense,
      date: new Date(expense.date).toISOString().split('T')[0]
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await editExpense(editingExpense._id, {
        title: editingExpense.title,
        amount: Number(editingExpense.amount),
        category: editingExpense.category,
        date: editingExpense.date
      });
      setSuccess('Expense updated successfully!');
      setEditingExpense(null);
    } catch (error) {
      setError('Failed to update expense. Please try again.');
    }
  };

  const handleDelete = async (expenseId) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      await deleteExpense(expenseId);
      setSuccess('Expense deleted successfully!');
    } catch (error) {
      setError('Failed to delete expense. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-6">Expense List</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="flex-1 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="flex-1 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {editingExpense ? (
          <form onSubmit={handleUpdate} className="mb-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Edit Expense</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingExpense.title}
                  onChange={(e) => setEditingExpense({ ...editingExpense, title: e.target.value })}
                  className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={editingExpense.amount}
                  onChange={(e) => setEditingExpense({ ...editingExpense, amount: e.target.value })}
                  className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={editingExpense.category}
                  onChange={(e) => setEditingExpense({ ...editingExpense, category: e.target.value })}
                  className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={editingExpense.date}
                  onChange={(e) => setEditingExpense({ ...editingExpense, date: e.target.value })}
                  className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Update Expense
                </button>
                <button
                  type="button"
                  onClick={() => setEditingExpense(null)}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : null}

        <div className="space-y-4">
          {filteredExpenses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No expenses found for this month.</p>
          ) : (
            <div className="grid gap-4">
              {filteredExpenses.map((expense) => (
                <div
                  key={expense._id}
                  className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium">{expense.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          {new Date(expense.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag size={16} />
                          {expense.category}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-medium">${expense.amount}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit expense"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(expense._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete expense"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;