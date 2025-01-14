// import { useState } from 'react';
// import { useExpense } from '../context/ExpenseContext';

// const AddExpense = () => {
//   const { addExpense } = useExpense();
//   const [title, setTitle] = useState('');
//   const [amount, setAmount] = useState('');
//   const [category, setCategory] = useState('Food');
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       await addExpense({
//         title,
//         amount: Number(amount),
//         category,
//         date
//       });
//       setSuccess('Expense added successfully!');
//       // Reset form
//       setTitle('');
//       setAmount('');
//       setCategory('Food');
//       setDate(new Date().toISOString().split('T')[0]);
//     } catch (error) {
//       setError('Failed to add expense. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <h2 className="text-xl font-semibold mb-6">Add New Expense</h2>

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

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Title
//           </label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Amount
//           </label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             required
//             min="0"
//             step="0.01"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Category
//           </label>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Date
//           </label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         >
//           Add Expense
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddExpense;

// import { useState } from 'react';
// import { useExpense } from '../context/ExpenseContext';

// const AddExpense = () => {
//   const { addExpense } = useExpense();
//   const [title, setTitle] = useState('');
//   const [amount, setAmount] = useState('');
//   const [category, setCategory] = useState('Food');
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       await addExpense({
//         title,
//         amount: Number(amount),
//         category,
//         date
//       });
//       setSuccess('Expense added successfully!');
//       // Reset form
//       setTitle('');
//       setAmount('');
//       setCategory('Food');
//       setDate(new Date().toISOString().split('T')[0]);
//     } catch (error) {
//       setError('Failed to add expense. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
//         <h2 className="text-xl font-semibold mb-6">Add New Expense</h2>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//             {success}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Title
//             </label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
//               required
//               placeholder="Enter expense title"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Amount
//             </label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
//               required
//               min="0"
//               step="0.01"
//               placeholder="Enter amount"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Category
//               </label>
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
//               >
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Date
//               </label>
//               <input
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
//                 required
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
//           >
//             Add Expense
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddExpense;

import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { Plus } from 'lucide-react';
import ManageCategories from './ManageCategories';

const AddExpense = () => {
  const { addExpense, categories } = useExpense();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Default categories if no custom categories exist
  const defaultCategories = [
    'Food',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Bills',
    'Healthcare',
    'Education',
    'Other'
  ];

  const allCategories = [
    ...defaultCategories,
    ...categories.map(cat => cat.name)
  ].sort();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await addExpense({
        title,
        amount: Number(amount),
        category: category || allCategories[0], // Use first category as default
        date
      });
      setSuccess('Expense added successfully!');
      // Reset form
      setTitle('');
      setAmount('');
      setCategory(allCategories[0]);
      setDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      setError('Failed to add expense. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-6">Add New Expense</h2>

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              required
              placeholder="Enter expense title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              required
              min="0"
              step="0.01"
              placeholder="Enter amount"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <div className="flex gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex-1 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                >
                  {allCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(true)}
                  className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
                  title="Manage categories"
                >
                  <Plus size={24} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
          >
            Add Expense
          </button>
        </form>
      </div>

      {showCategoryModal && (
        <ManageCategories onClose={() => setShowCategoryModal(false)} />
      )}
    </div>
  );
};

export default AddExpense;