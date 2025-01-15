
import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const AddIncome = () => {
  const { addIncome, incomes, lockIncome } = useExpense();
  const [amount, setAmount] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('default', { month: 'long' })
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const existingIncome = incomes.find(
      income => income.month === selectedMonth && income.year === selectedYear
    );

    if (existingIncome && existingIncome.isLocked) {
      // setError('Income for this month is locked and cannot be modified');
      toast.error('Income for this month is locked and cannot be modified');
      return;
    }

    if (existingIncome) {
      // setError('Income already exists for this month. Lock or modify the existing income.');
      toast.error('Income already exists for this month. Lock or modify the existing income.');
      return;
    }

    try {
      await addIncome(Number(amount), selectedMonth, selectedYear);
      setSuccess('Income added successfully!');
      setAmount('');
    } catch (error) {
      setError('Failed to add income. Please try again.');
    }
  };

  const handleLockIncome = async (incomeId) => {
    try {
      await lockIncome(incomeId);
      setSuccess('Income locked successfully!');
    } catch (error) {
      setError('Failed to lock income. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-6">Add Monthly Income</h2>

        

        <form onSubmit={handleSubmit} className="space-y-4">
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
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
          >
            Add Income
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Current Month's Income</h3>
          <div className="space-y-4">
            {incomes
              .filter(
                income =>
                  income.month === selectedMonth && income.year === selectedYear
              )
              .map((income) => (
                <div
                  key={income._id}
                  className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <p className="text-lg font-medium">${income.amount}</p>
                    <p className="text-sm text-gray-500">
                      {income.month} {income.year}
                    </p>
                  </div>
                  {!income.isLocked ? (
                    <button
                      onClick={() => handleLockIncome(income._id)}
                      className="flex items-center gap-2 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      <Lock size={16} />
                      Lock Income
                    </button>
                  ) : (
                    <span className="flex items-center gap-2 text-gray-500">
                      <Lock size={16} />
                      Locked
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIncome;