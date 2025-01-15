import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { Plus, X } from 'lucide-react';

const ManageCategories = ({ onClose }) => {
  const { categories, addCategory, deleteCategory } = useExpense();
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newCategory.trim()) {
      setError('Category name cannot be empty');
      return;
    }

    try {
      await addCategory(newCategory.trim());
      setSuccess('Category added successfully!');
      setNewCategory('');
    } catch (error) {
      if (error.message.includes('already exists')) {
        setError('This category already exists');
      } else {
        setError('Failed to add category. Please try again.');
      }
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setSuccess('Category deleted successfully!');
    } catch (error) {
      setError('Failed to delete category. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Manage Categories</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )} */}

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category"
              className="flex-1 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus size={24} />
            </button>
          </div>
        </form>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span>{category.name}</span>
              <button
                onClick={() => handleDelete(category._id)}
                className="text-red-600 p-1 hover:bg-red-50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;