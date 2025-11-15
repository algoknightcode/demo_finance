import moment from "moment";

export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (
    words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase()
  );
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  // Sort the data by date (oldest to newest)
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Map the sorted data to chart format
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};


export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
};