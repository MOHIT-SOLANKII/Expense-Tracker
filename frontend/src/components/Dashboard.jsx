import { useEffect, useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, CalendarRange } from 'lucide-react';

const Dashboard = () => {
  const { incomes, expenses, calculateTotalIncome, calculateTotalExpenses, loading } = useExpense();
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('default', { month: 'long' })
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - 2 + i
  );

  const COLORS = ['#7C3AED', '#3ad8ed', '#3a7eed', '#C084FC', '#DDD6FE'];

  useEffect(() => {
    if (!loading) {
      // Prepare pie chart data
      const monthlyIncome = calculateTotalIncome(selectedMonth, selectedYear);
      const monthlyExpenses = calculateTotalExpenses(selectedMonth, selectedYear);
      const monthlySavings = monthlyIncome - monthlyExpenses;

      setPieChartData([
        { name: 'Income', value: monthlyIncome },
        { name: 'Expenses', value: monthlyExpenses },
        { name: 'Savings', value: monthlySavings > 0 ? monthlySavings : 0 }
      ]);

      // Prepare bar chart data
      const expensesByCategory = expenses
        .filter(expense => expense.month === selectedMonth && expense.year === selectedYear)
        .reduce((acc, expense) => {
          acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
          return acc;
        }, {});

      setBarChartData(
        Object.entries(expensesByCategory).map(([category, amount]) => ({
          category,
          amount
        }))
      );

      // Get recent transactions for the selected month/year
      setRecentTransactions(
        expenses
          .filter(expense => expense.month === selectedMonth && expense.year === selectedYear)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5)
      );
    }
  }, [incomes, expenses, selectedMonth, selectedYear, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-purple-600">Loading...</div>
      </div>
    );
  }

  const currentBalance = calculateTotalIncome(selectedMonth, selectedYear) - 
                        calculateTotalExpenses(selectedMonth, selectedYear);

  return (
    <div className="space-y-6">
      {/* Period Selection */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarRange size={20} />
            <span>Select Period:</span>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            >
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
          <div className="text-gray-500 mb-2">Current Balance</div>
          <div className="text-2xl font-bold text-purple-600">${currentBalance.toFixed(2)}</div>
          <div className={`text-sm mt-2 flex items-center ${currentBalance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {currentBalance >= 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
            {selectedMonth} {selectedYear}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
          <div className="text-gray-500 mb-2">Total Income</div>
          <div className="text-2xl font-bold text-purple-600">
            ${calculateTotalIncome(selectedMonth, selectedYear).toFixed(2)}
          </div>
          <div className="text-green-500 text-sm mt-2 flex items-center">
            <ArrowUp size={16} className="mr-1" /> {selectedMonth} {selectedYear}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
          <div className="text-gray-500 mb-2">Total Expenses</div>
          <div className="text-2xl font-bold text-purple-600">
            ${calculateTotalExpenses(selectedMonth, selectedYear).toFixed(2)}
          </div>
          <div className="text-red-500 text-sm mt-2 flex items-center">
            <ArrowDown size={16} className="mr-1" /> {selectedMonth} {selectedYear}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Monthly Overview</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={barChartData}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Legend />
                  <Bar dataKey="amount" fill="#7C3AED">
                    {barChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Expenses</h3>
          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No expenses found for this period.</p>
            ) : (
              recentTransactions.map((transaction) => (
                <div key={transaction._id} 
                  className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  <div>
                    <div className="font-medium text-gray-900">{transaction.title}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-purple-600 font-medium">
                    ${transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;