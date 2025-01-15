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
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const defaultCategories = [
    'Food',
  ];

  const allCategories = [
    ...defaultCategories,
    ...categories.map(cat => cat.name)
  ].sort();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addExpense({
        title,
        amount: Number(amount),
        category: category || allCategories[0], // Use first category as default
        date
      });
      
      // Reset form
      setTitle('');
      setAmount('');
      setCategory(allCategories[0]);
      setDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-6">Add New Expense</h2>

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