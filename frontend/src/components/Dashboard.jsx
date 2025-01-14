// import { useEffect, useState } from 'react';
// import { useExpense } from '../context/ExpenseContext';
// import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';

// const Dashboard = () => {
//   const { incomes, expenses, calculateTotalIncome, calculateTotalExpenses, loading } = useExpense();
//   const [currentMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
//   const [currentYear] = useState(new Date().getFullYear());
//   const [pieChartData, setPieChartData] = useState([]);
//   const [barChartData, setBarChartData] = useState([]);

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

//   useEffect(() => {
//     if (!loading) {
//       // Prepare pie chart data
//       const monthlyIncome = calculateTotalIncome(currentMonth, currentYear);
//       const monthlyExpenses = calculateTotalExpenses(currentMonth, currentYear);
//       const monthlySavings = monthlyIncome - monthlyExpenses;

//       setPieChartData([
//         { name: 'Income', value: monthlyIncome },
//         { name: 'Expenses', value: monthlyExpenses },
//         { name: 'Savings', value: monthlySavings > 0 ? monthlySavings : 0 }
//       ]);

//       // Prepare bar chart data
//       const expensesByCategory = expenses
//         .filter(expense => expense.month === currentMonth && expense.year === currentYear)
//         .reduce((acc, expense) => {
//           acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
//           return acc;
//         }, {});

//       setBarChartData(
//         Object.entries(expensesByCategory).map(([category, amount]) => ({
//           category,
//           amount
//         }))
//       );
//     }
//   }, [incomes, expenses, currentMonth, currentYear, loading]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-gray-500">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-6">Financial Overview</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Pie Chart */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-lg font-medium mb-4">Monthly Overview</h3>
//           <div className="flex justify-center">
//             <PieChart width={300} height={300}>
//               <Pie
//                 data={pieChartData}
//                 cx={150}
//                 cy={150}
//                 labelLine={false}
//                 label={({ name, value }) => `${name}: $${value}`}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {pieChartData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </div>
//         </div>

//         {/* Bar Chart */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-lg font-medium mb-4">Expenses by Category</h3>
//           <BarChart width={400} height={300} data={barChartData}>
//             <XAxis dataKey="category" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="amount" fill="#8884d8">
//               {barChartData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Bar>
//           </BarChart>
//         </div>

//         {/* Summary Statistics */}
//         <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-blue-100 p-4 rounded-lg">
//             <h4 className="text-blue-800 font-medium">Total Income</h4>
//             <p className="text-2xl font-bold text-blue-900">
//               ${calculateTotalIncome(currentMonth, currentYear)}
//             </p>
//           </div>
//           <div className="bg-red-100 p-4 rounded-lg">
//             <h4 className="text-red-800 font-medium">Total Expenses</h4>
//             <p className="text-2xl font-bold text-red-900">
//               ${calculateTotalExpenses(currentMonth, currentYear)}
//             </p>
//           </div>
//           <div className="bg-green-100 p-4 rounded-lg">
//             <h4 className="text-green-800 font-medium">Total Savings</h4>
//             <p className="text-2xl font-bold text-green-900">
//               ${Math.max(0, calculateTotalIncome(currentMonth, currentYear) - calculateTotalExpenses(currentMonth, currentYear))}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useEffect, useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

const Dashboard = () => {
  const { incomes, expenses, calculateTotalIncome, calculateTotalExpenses, loading } = useExpense();
  const [currentMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
  const [currentYear] = useState(new Date().getFullYear());
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    if (!loading) {
      // Prepare pie chart data
      const monthlyIncome = calculateTotalIncome(currentMonth, currentYear);
      const monthlyExpenses = calculateTotalExpenses(currentMonth, currentYear);
      const monthlySavings = monthlyIncome - monthlyExpenses;

      setPieChartData([
        { name: 'Income', value: monthlyIncome },
        { name: 'Expenses', value: monthlyExpenses },
        { name: 'Savings', value: monthlySavings > 0 ? monthlySavings : 0 }
      ]);

      // Prepare bar chart data
      const expensesByCategory = expenses
        .filter(expense => expense.month === currentMonth && expense.year === currentYear)
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

      // Get recent transactions
      setRecentTransactions(
        expenses
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 10)
      );
    }
  }, [incomes, expenses, currentMonth, currentYear, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const currentBalance = calculateTotalIncome(currentMonth, currentYear) - 
                        calculateTotalExpenses(currentMonth, currentYear);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
          <div className="text-gray-500 mb-2">Current Balance</div>
          <div className="text-xl md:text-2xl font-bold">${currentBalance}</div>
          <div className="text-green-500 text-sm mt-2 flex items-center">
            <ArrowUp size={16} className="mr-1" /> Available to spend
          </div>
        </div>
        
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
          <div className="text-gray-500 mb-2">Total Income</div>
          <div className="text-xl md:text-2xl font-bold">
            ${calculateTotalIncome(currentMonth, currentYear)}
          </div>
          <div className="text-green-500 text-sm mt-2 flex items-center">
            <ArrowUp size={16} className="mr-1" /> This month
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
          <div className="text-gray-500 mb-2">Total Expenses</div>
          <div className="text-xl md:text-2xl font-bold">
            ${calculateTotalExpenses(currentMonth, currentYear)}
          </div>
          <div className="text-red-500 text-sm mt-2 flex items-center">
            <ArrowDown size={16} className="mr-1" /> This month
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Charts Column */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Pie Chart */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Monthly Overview</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={barChartData}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8">
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
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm h-fit">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction._id} 
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div>
                  <div className="font-medium">{transaction.title}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-gray-900 font-medium">
                  ${transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;