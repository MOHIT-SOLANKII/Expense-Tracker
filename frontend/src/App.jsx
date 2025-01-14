// import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
// import { ExpenseProvider } from './context/ExpenseContext';
// import Dashboard from './components/Dashboard';
// import AddExpense from './components/AddExpense';
// import AddIncome from './components/AddIncome';
// import ExpenseList from './components/ExpenseList';
// import { useState, useEffect } from 'react';

// function App() {
//   const { user, isSignedIn } = useUser();
//   const [activeTab, setActiveTab] = useState('dashboard');

//   useEffect(() => {
//     const createUser = async () => {
//       if (isSignedIn && user) {
//         try {
//           const response = await fetch('http://localhost:5000/api/users', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               clerkId: user.id,
//               email: user.primaryEmailAddress.emailAddress
//             }),
//           });
//           if (!response.ok) {
//             throw new Error('Failed to create user');
//           }
//         } catch (error) {
//           console.error('Error creating user:', error);
//         }
//       }
//     };

//     createUser();
//   }, [isSignedIn, user]);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
//           <div className="flex items-center gap-4">
//             <SignedOut>
//               <SignInButton mode="modal">
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
//                   Sign In
//                 </button>
//               </SignInButton>
//             </SignedOut>
//             <SignedIn>
//               <UserButton afterSignOutUrl="/" />
//             </SignedIn>
//           </div>
//         </div>
//       </header>

//       <SignedIn>
//         <ExpenseProvider>
//           <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="flex justify-center mb-8 space-x-4">
//               <button
//                 onClick={() => setActiveTab('dashboard')}
//                 className={`px-4 py-2 rounded-md ${
//                   activeTab === 'dashboard'
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-white text-gray-700'
//                 }`}
//               >
//                 Dashboard
//               </button>
//               <button
//                 onClick={() => setActiveTab('add-income')}
//                 className={`px-4 py-2 rounded-md ${
//                   activeTab === 'add-income'
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-white text-gray-700'
//                 }`}
//               >
//                 Add Income
//               </button>
//               <button
//                 onClick={() => setActiveTab('add-expense')}
//                 className={`px-4 py-2 rounded-md ${
//                   activeTab === 'add-expense'
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-white text-gray-700'
//                 }`}
//               >
//                 Add Expense
//               </button>
//               <button
//                 onClick={() => setActiveTab('expenses')}
//                 className={`px-4 py-2 rounded-md ${
//                   activeTab === 'expenses'
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-white text-gray-700'
//                 }`}
//               >
//                 Expenses
//               </button>
//             </div>

//             <div className="bg-white rounded-lg shadow p-6">
//               {activeTab === 'dashboard' && <Dashboard />}
//               {activeTab === 'add-income' && <AddIncome />}
//               {activeTab === 'add-expense' && <AddExpense />}
//               {activeTab === 'expenses' && <ExpenseList />}
//             </div>
//           </main>
//         </ExpenseProvider>
//       </SignedIn>
//     </div>
//   );
// }

// export default App;

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { ExpenseProvider } from './context/ExpenseContext';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import AddIncome from './components/AddIncome';
import ExpenseList from './components/ExpenseList';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Receipt, Plus, PiggyBank, Settings, Menu, X } from 'lucide-react';

function App() {
  const { user, isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const createUser = async () => {
      if (isSignedIn && user) {
        try {
          const response = await fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              clerkId: user.id,
              email: user.primaryEmailAddress.emailAddress
            }),
          });
          if (!response.ok) {
            throw new Error('Failed to create user');
          }
        } catch (error) {
          console.error('Error creating user:', error);
        }
      }
    };

    createUser();
  }, [isSignedIn, user]);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', value: 'dashboard' },
    { icon: <PiggyBank size={20} />, label: 'Add Income', value: 'add-income' },
    { icon: <Plus size={20} />, label: 'Add Expense', value: 'add-expense' },
    { icon: <Receipt size={20} />, label: 'Expenses', value: 'expenses' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (value) => {
    setActiveTab(value);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SignedIn>
        {/* Mobile Menu Button */}
        <div className="md:hidden fixed top-4 left-4 z-30">
          <button
            onClick={toggleSidebar}
            className="p-2 text-black rounded-lg"
          >
            {isSidebarOpen ? "" : <Menu size={24} />}
          </button>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside 
          className={`bg-purple-700 text-white fixed h-full z-20 transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 w-64`}
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="text-2xl font-bold">ExTrack</div>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleMenuClick(item.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${activeTab === item.value 
                      ? 'bg-white bg-opacity-10' 
                      : 'hover:bg-white hover:bg-opacity-5'}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>
      </SignedIn>

      {/* Main Content */}
      <main className={`transition-all duration-300 ease-in-out
        ${isSignedIn ? 'md:ml-64' : ''}`}
      >
        {/* Top Header */}
        <header className="bg-white border-b p-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <h1 className="text-xl font-semibold">
              {isSignedIn ? "" : "Welcome to ExTrack"}
            </h1>
            <div className="flex items-center gap-4">
              <SignedOut>
                {/* <SignInButton mode="modal">
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Sign In
                  </button>
                </SignInButton> */}
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </header>

        <SignedOut>
          <div className="max-w-2xl mx-auto mt-16 p-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Track Your Expenses with Ease
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Manage your income, track expenses, and take control of your finances with our simple and intuitive expense tracker.
            </p>
            <SignInButton mode="modal">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors text-lg">
                Get Started
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <ExpenseProvider>
            <div className="p-4 md:p-6">
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'add-income' && <AddIncome />}
              {activeTab === 'add-expense' && <AddExpense />}
              {activeTab === 'expenses' && <ExpenseList />}
            </div>
          </ExpenseProvider>
        </SignedIn>
      </main>
    </div>
  );
}

export default App;