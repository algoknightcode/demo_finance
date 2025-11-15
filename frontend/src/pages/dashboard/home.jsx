import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/dashboardlayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../util/apipath";
import axiosInstance from "../../util/axiosInstance";
import InfoCard from "../../components/cards/infocard";
import { addThousandsSeparator } from "../../util/helper";
import { IoMdCard } from "react-icons/io";
import FinanceOverview from "../../components/dashboard/financeOverview";
import RecentIncome from "../../components/dashboard/RecentIncome";
import RecentTransactions from "../../components/dashboard/recentTranscations";
import ExpenseTransactions from "../../components/dashboard/ExpenseTranscation";
import Last30DaysExpenses from "../../components/dashboard/last30DaysExpense";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance)}
            color="bg-primary"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Total Expenses"
            value={addThousandsSeparator(dashboardData?.totalExpense)}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions}
          />
          
          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
