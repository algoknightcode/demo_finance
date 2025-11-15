import React from "react";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  const bars = [
    { month: 'Jan', income: 120, expense: 80 },
    { month: 'Feb', income: 180, expense: 130 },
    { month: 'Mar', income: 250, expense: 170 },
    { month: 'Apr', income: 300, expense: 200 },
    { month: 'May', income: 270, expense: 150 },
    { month: 'Jun', income: 340, expense: 220 },
    { month: 'Jul', income: 380, expense: 250 },
  ];

  // Chart box height in pixels (controls bar scaling)
  const chartHeight = 220; // px
  const maxValue = 400; // used for scaling

  return (
    <div className="flex min-h-screen">
      {/* Left: Auth area */}
      <div className="w-full md:w-[60vw] px-8 md:px-12 py-8 flex flex-col">
        <h2 className="text-lg font-medium text-black mb-6">Expense Tracker</h2>
        <div className="flex-1 flex items-center">{children}</div>
      </div>

      {/* Right: Decorative panel with Stats info */}
      <aside className="hidden md:block w-[40vw] h-screen bg-violet-50 relative overflow-hidden flex flex-col items-center">
        {/* Decorative shapes */}
        <div className="absolute -top-12 -left-8 w-48 h-48 rounded-[40px] bg-purple-600 opacity-90 transform rotate-6"></div>
        <div className="absolute top-40 -right-12 w-48 h-56 rounded-[40px] border-[18px] border-fuchsia-400 opacity-80"></div>
        <div className="absolute -bottom-12 left-6 w-48 h-48 rounded-[40px] bg-violet-400 opacity-80 transform -rotate-3"></div>

        {/* Stats Info Card (kept above) */}
        <div className="relative z-20 bg-white rounded-2xl shadow-lg p-6 w-80 mt-10 ml-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <LuTrendingUpDown size={22} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Track Your Income & Expenses</p>
              <h2 className="text-2xl font-bold text-gray-900">$430,000</h2>
            </div>
          </div>
        </div>

        {/* Enlarged chart positioned at bottom (hardcoded, pixel-based heights) */}
        <div className="absolute bottom-8 left-6 right-6 z-20">
          <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-[680px] mx-auto">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">All Transactions</h3>
                <p className="text-xs text-gray-500">2nd Jan to 21th Dec</p>
              </div>
              <button className="text-xs text-purple-600 font-semibold hover:underline">View More</button>
            </div>

            {/* Larger bar chart area with fixed pixel height */}
            <div className="relative h-[220px] flex items-end gap-4 px-6">
              {bars.map((d, i) => {
                const incomePx = Math.max(14, Math.round((d.income / maxValue) * chartHeight));
                const expensePx = Math.max(10, Math.round((d.expense / maxValue) * chartHeight));
                const diffPx = Math.max(0, incomePx - expensePx);

                return (
                  <div key={i} className="flex flex-col items-center w-12">
                    <div className="relative w-full" style={{ height: `${chartHeight}px` }}>
                      {/* bottom: darker expense */}
                      <div
                        className="absolute bottom-0 left-0 right-0 rounded-b-md"
                        style={{
                          height: `${expensePx}px`,
                          background: 'linear-gradient(180deg, rgba(99,102,241,1) 0%, rgba(79,70,229,1) 100%)',
                          boxShadow: '0 8px 16px rgba(79,70,229,0.12)'
                        }}
                      />

                      {/* above expense: lighter income segment */}
                      <div
                        className="absolute bottom-0 left-0 right-0 rounded-t-md"
                        style={{
                          bottom: `${expensePx}px`,
                          height: `${diffPx}px`,
                          background: 'linear-gradient(180deg, rgba(167,139,250,1) 0%, rgba(139,92,246,1) 100%)',
                          boxShadow: '0 8px 16px rgba(139,92,246,0.08)'
                        }}
                      />

                    </div>
                    <p className="text-[11px] mt-3 text-gray-700">{d.month}</p>
                  </div>
                );
              })}
            </div>

            {/* X-axis labels spacing (optional duplicate for clarity) */}
            <div className="mt-4 flex justify-between px-6 text-xs text-gray-500">
              {bars.map((d, i) => (
                <span key={i}>{d.month}</span>
              ))}
            </div>
          </div>
        </div>

      </aside>
    </div>
  );
};

export default AuthLayout;
