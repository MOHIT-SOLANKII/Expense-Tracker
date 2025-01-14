import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

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
      const response = await fetch(`${import.meta.env.BACKEND_URL}/api/income/${user.id}`);
      const data = await response.json();
      setIncomes(data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${import.meta.env.BACKEND_URL}/api/expenses/${user.id}`);
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.BACKEND_URL}/api/categories/${user.id}`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addIncome = async (amount, month, year) => {
    try {
      const response = await fetch(`${import.meta.env.BACKEND_URL}/api/income`, {
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
      setIncomes([...incomes, data]);
      return data;
    } catch (error) {
      console.error('Error adding income:', error);
      throw error;
    }
  };

  const lockIncome = async (incomeId) => {
    try {
      const response = await fetch(`${import.meta.env.BACKEND_URL}/api/income/${incomeId}/lock`, {
        method: 'PATCH',
      });
      const data = await response.json();
      setIncomes(incomes.map(income => 
        income._id === incomeId ? { ...income, isLocked: true } : income
      ));
      return data;
    } catch (error) {
      console.error('Error locking income:', error);
      throw error;
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const response = await fetch(`${import.meta.env.BACKEND_URL}/api/expenses`, {
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
      setExpenses([...expenses, data]);
      return data;
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  };

  const editExpense = async (expenseId, expenseData) => {
    try {
      const response = await fetch(`${import.meta.env.BACKEND_URL}/api/expenses/${expenseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
      });
      const data = await response.json();
      setExpenses(expenses.map(expense => 
        expense._id === expenseId ? data : expense
      ));
      return data;
    } catch (error) {
      console.error('Error editing expense:', error);
      throw error;
    }
  };

  const deleteExpense = async (expenseId) => {
    try {
      await fetch(`${import.meta.env.BACKEND_URL}/api/expenses/${expenseId}`, {
        method: 'DELETE',
      });
      setExpenses(expenses.filter(expense => expense._id !== expenseId));
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  };

  const addCategory = async (name) => {
    try {
      const response = await fetch(`${import.meta.env.BACKEND_URL}/api/categories`, {
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
      setCategories([...categories, data]);
      return data;
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await fetch(`${import.meta.env.BACKEND_URL}/api/categories/${categoryId}`, {
        method: 'DELETE',
      });
      setCategories(categories.filter(category => category._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
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