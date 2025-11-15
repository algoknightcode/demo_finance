import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/dashboardlayout";
import IncomeOverview from "../../components/income/incomeoverview";
import axiosInstance from "../../util/axiosInstance";
import { API_PATHS } from "../../util/apipath";
import Modal from "../../components/modal";
import AddIncomeForm from "../../components/income/AddIncomeForm";
import IncomeList from "../../components/income/IncomeList";
import { toast } from "react-hot-toast";
import DeleteAlert from "../../components/DeleteAlert";
import useUserAuth from "../../hooks/useUserAuth";

const Income = () => {
    useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    // Validation Checks
    if (!source.trim()) {
      toast.error("Source is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error adding income:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to add income. Please try again.");
    }
  };

  // Delete Income
  const deleteIncome = async (id) => {
      try {
    await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

    setOpenDeleteAlert({ show: false, data: null });
    toast.success("Income details deleted successfully");
    fetchIncomeDetails();
  } catch (error) {
    console.error(
      "Error deleting income:",
      error.response?.data?.message || error.message
    );
  }
};

  // Handle download income details
  const handleDownloadIncomeDetails = async () => {};

  useEffect(() => {
    fetchIncomeDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>
      </div>

      <IncomeList
        incomes={incomeData}
        onDelete={(id) => {
          setOpenDeleteAlert({ show: true, data: id });
        }}
        onDownload={handleDownloadIncomeDetails}
      />

      <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income"
      >
        <AddIncomeForm
          onAddIncome={handleAddIncome}
          onClose={() => setOpenAddIncomeModal(false)}
        />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Income"
      >
        <DeleteAlert
          content="Are you sure you want to delete this income detail?"
          onDelete={() => deleteIncome(openDeleteAlert.data)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Income;
