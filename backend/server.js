const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Models
const User = require('./models/User');
const Income = require('./models/Income');
const Expense = require('./models/Expense');
const Category = require('./models/Category');

// User Routes
app.post('/api/users', async (req, res) => {
  try {
    const { clerkId, email } = req.body;
    let user = await User.findOne({ clerkId });
    
    if (!user) {
      user = new User({ clerkId, email });
      await user.save();
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Income Routes
app.post('/api/income', async (req, res) => {
  try {
    const { userId, amount, month, year } = req.body;
    
    const income = new Income({
      userId,
      amount,
      month,
      year
    });
    
    await income.save();
    res.json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/income/:userId', async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.params.userId });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/income/:id/lock', async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    income.isLocked = true;
    await income.save();
    res.json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Expense Routes
app.post('/api/expenses', async (req, res) => {
  try {
    const { userId, title, amount, category, date } = req.body;
    const expenseDate = new Date(date);
    
    const expense = new Expense({
      userId,
      title,
      amount,
      category,
      date: expenseDate,
      month: expenseDate.toLocaleString('default', { month: 'long' }),
      year: expenseDate.getFullYear()
    });
    
    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/expenses/:userId', async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.params.userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/expenses/:id', async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const expenseDate = new Date(date);
    
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        title,
        amount,
        category,
        date: expenseDate,
        month: expenseDate.toLocaleString('default', { month: 'long' }),
        year: expenseDate.getFullYear()
      },
      { new: true }
    );
    
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/expenses/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Category Routes
app.get('/api/categories/:userId', async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.params.userId });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { userId, name } = req.body;
    const category = new Category({ userId, name });
    await category.save();
    res.json(category);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Category already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});