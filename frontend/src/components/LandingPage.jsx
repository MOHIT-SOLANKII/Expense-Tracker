import React from 'react';
import { LineChart, ChevronRight, Github, CircleDollarSign } from 'lucide-react';
import { SignInButton } from "@clerk/clerk-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Navigation */}
      <nav className="w-full px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <LineChart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold">ExTrack</span>
          </div>
          
          
            <button className="p-2 rounded-lg">
              <CircleDollarSign size={24} />
            </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-4 md:px-6 py-12 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Take Control of Your 
              <span className="text-purple-600"> Finances</span>
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Track your expenses, manage your budget, and achieve your financial goals 
              with our intuitive expense tracking platform.
            </p>
            <SignInButton mode="modal">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors">
                Get Started
              </button>
            </SignInButton>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <LineChart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
              <p className="text-gray-600">
                Easily log and categorize your expenses to understand your spending patterns.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <ChevronRight className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Budget Management</h3>
              <p className="text-gray-600">
                Set budgets for different categories and track your progress throughout the month.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <LineChart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Insightful Analytics</h3>
              <p className="text-gray-600">
                Visualize your spending habits with detailed charts and reports.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;