import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { user } = useUser();
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchIncomes();
      fetchExpenses();
      fetchCategories();
    }
  }, [user]);

  const fetchIncomes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/income/${user.id}`);
      const data = await response.json();
      setIncomes(data);
    } catch (error) {
      toast.error('Failed to fetch income data');
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/expenses/${user.id}`);
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      toast.error('Failed to fetch expense data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${user.id}`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const addIncome = async (amount, month, year) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/income`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          amount,
          month,
          year
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add income');
      }
      setIncomes([...incomes, data]);
      toast.success('Income added successfully');
      return data;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const lockIncome = async (incomeId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/income/${incomeId}/lock`, {
        method: 'PATCH',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to lock income');
      }
      setIncomes(incomes.map(income => 
        income._id === incomeId ? { ...income, isLocked: true } : income
      ));
      toast.success('Income locked successfully');
      return data;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          ...expenseData
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add expense');
      }
      setExpenses([...expenses, data]);
      toast.success('Expense added successfully');
      return data;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const editExpense = async (expenseId, expenseData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/expenses/${expenseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update expense');
      }
      setExpenses(expenses.map(expense => 
        expense._id === expenseId ? data : expense
      ));
      toast.success('Expense updated successfully');
      return data;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const deleteExpense = async (expenseId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/expenses/${expenseId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete expense');
      }
      setExpenses(expenses.filter(expense => expense._id !== expenseId));
      toast.success('Expense deleted successfully');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const addCategory = async (name) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          name
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add category');
      }
      setCategories([...categories, data]);
      toast.success('Category added successfully');
      return data;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete category');
      }
      setCategories(categories.filter(category => category._id !== categoryId));
      toast.success('Category deleted successfully');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const calculateTotalIncome = (month, year) => {
    const monthlyIncome = incomes.find(income => 
      income.month === month && income.year === year
    );
    return monthlyIncome ? monthlyIncome.amount : 0;
  };

  const calculateTotalExpenses = (month, year) => {
    return expenses
      .filter(expense => expense.month === month && expense.year === year)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const value = {
    incomes,
    expenses,
    categories,
    loading,
    addIncome,
    lockIncome,
    addExpense,
    editExpense,
    deleteExpense,
    addCategory,
    deleteCategory,
    calculateTotalIncome,
    calculateTotalExpenses,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};


export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};

export default ExpenseContext;