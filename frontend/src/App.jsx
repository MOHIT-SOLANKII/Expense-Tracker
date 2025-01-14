import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { ExpenseProvider } from './context/ExpenseContext';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import AddIncome from './components/AddIncome';
import ExpenseList from './components/ExpenseList';
import LandingPage from './components/LandingPage';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Receipt, Plus, PiggyBank, Menu,X } from 'lucide-react';

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
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>

      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
          {/* Mobile Menu Button */}
          <div className="md:hidden fixed top-4 left-4 z-30">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg bg-white shadow-sm text-purple-600"
            >
              {isSidebarOpen ? <X size={24}/> : <Menu size={24} className="" />}
            </button>
          </div>

          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div 
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Mobile Sidebar */}
          <aside 
            className={`md:hidden bg-gradient-to-b from-purple-600 to-purple-700 text-white fixed h-full z-20 transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              w-64 shadow-xl`}
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-12">
                {/* <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-purple-600" />
                </div> */}
                <div className="text-2xl font-bold pl-10">ExTrack</div>
              </div>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleMenuClick(item.value)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${activeTab === item.value 
                        ? 'bg-white text-purple-600 shadow-sm' 
                        : 'hover:bg-white hover:bg-opacity-10'}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Desktop Header with Navigation */}
          <header className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">ExTrack</span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-2">
                {menuItems.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleMenuClick(item.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                      ${activeTab === item.value 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-600 hover:bg-purple-50'}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* User Button */}
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </div>
          </header>

          {/* Main Content */}
          <main className="transition-all duration-300 ease-in-out">
            <ExpenseProvider>
              <div className="p-4 md:p-6 max-w-7xl mx-auto">
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'add-income' && <AddIncome />}
                {activeTab === 'add-expense' && <AddExpense />}
                {activeTab === 'expenses' && <ExpenseList />}
              </div>
            </ExpenseProvider>
          </main>
        </div>
      </SignedIn>
    </>
  );
}

export default App;