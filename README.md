# ExTrack - Personal Expense Tracker

ExTrack is a modern, full-stack expense tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js). It helps users manage their personal finances by tracking income, expenses, and providing insightful visualizations.

![Landing Page](/docs/screenshots/Landing.png "Landing Page")

## Features

- 📊 Interactive dashboard with expense analytics
- 💰 Monthly income tracking with locking mechanism
- 💸 Expense management with categorization
- 📂 Custom category management
- 📅 Month and year filtering
- 📈 Visual representation of expenses using charts
- 🔐 Secure authentication using Clerk
- 🎨 Modern and responsive UI using Tailwind CSS

## Tech Stack

- **Frontend:**
  - React.js
  - Tailwind CSS
  - Recharts for data visualization
  - React Hot Toast for notifications
  - Lucide React for icons
  - Clerk for authentication

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - Various security middlewares

## Screenshots

### Dashboard
![Dashboard](/docs/screenshots/Dashboard.png "Dashboard Overview")

### Add Expense
![Add Expense](/docs/screenshots/Expense.png "Add Expense Form")

### Expense List
![Expense List](/docs/screenshots/ExpenseList.png "Expense List View")

### Income Management
![Income Management](/docs/screenshots/Income.png "Income Management")

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Git

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env)
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:5000
```

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/MOHIT-SOLANKII/Expense-Tracker.git
cd expense-tracker
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Install frontend dependencies
```bash
cd client
npm install
```

4. Start the backend server
```bash
cd server
node server.js
```

5. Start the frontend application
```bash
cd client
npm run dev
```

The application should now be running on:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Usage

1. Register/Login using your email
2. Add your monthly income
3. Create custom expense categories (optional)
4. Start adding your expenses
5. View your spending patterns in the dashboard
6. Filter expenses by month and year
7. Lock your monthly income once verified

## Security Features

- CORS protection
- XSS prevention
- Rate limiting
- Helmet security headers
- MongoDB injection protection
- Input sanitization

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Clerk for authentication
- Recharts for charts
- Tailwind CSS for styling
- Lucide for icons