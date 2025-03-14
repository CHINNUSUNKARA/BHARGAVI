import React, { useState } from "react";
import NavBar from "./NavBar"

const Reports = () => {
  const [salesData, setSalesData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [profitLossData, setProfitLossData] = useState([]);
  const [outstandingPayments, setOutstandingPayments] = useState([]);

  // Dummy Data
  const dummySalesData = {
    daily: [
      { date: "2023-09-01", totalSales: 5000, orders: 100 },
      { date: "2023-09-02", totalSales: 7000, orders: 150 },
    ],
    monthly: [
      { month: "September", totalSales: 20000, orders: 450 },
      { month: "October", totalSales: 25000, orders: 550 },
    ],
    yearly: [
      { year: "2023", totalSales: 240000, orders: 5000 },
      { year: "2024", totalSales: 270000, orders: 6000 },
    ],
  };

  const dummyStockData = [
    { item: "Iron Rods", movement: "Sold", quantity: 100 },
    { item: "Cement Bags", movement: "Added", quantity: 200 },
    { item: "Steel Bars", movement: "Sold", quantity: 50 },
  ];

  const dummyProfitLossData = [
    { period: "Q1 2023", revenue: 50000, cost: 30000, expenses: 5000, profit: 15000 },
    { period: "Q2 2023", revenue: 60000, cost: 35000, expenses: 6000, profit: 19000 },
  ];

  const dummyOutstandingPayments = [
    { customerName: "John Doe", amountDue: 1500, dueDate: "2023-09-15" },
    { customerName: "Jane Smith", amountDue: 2200, dueDate: "2023-09-20" },
  ];

  // Handlers to display different report data
  const handleShowSalesReport = (period) => {
    switch (period) {
      case "daily":
        setSalesData(dummySalesData.daily);
        break;
      case "monthly":
        setSalesData(dummySalesData.monthly);
        break;
      case "yearly":
        setSalesData(dummySalesData.yearly);
        break;
      default:
        setSalesData([]);
    }
  };

  const handleShowStockMovementReport = () => {
    setStockData(dummyStockData);
  };

  const handleShowProfitLossReport = () => {
    setProfitLossData(dummyProfitLossData);
  };

  const handleShowOutstandingPayments = () => {
    setOutstandingPayments(dummyOutstandingPayments);
  };

  return (
    <>
    {<NavBar />}
    <div className="container custom-margins " style={{marginTop:"150px"}}>
      <h2 className="text-center">Business Reports</h2>

      {/* Buttons to Show Different Reports */}
      <div className="my-4 text-center">
        <button className="btn btn-info mx-2" onClick={() => handleShowSalesReport("daily")}>
          Daily Sales Report
        </button>
        <button className="btn btn-info mx-2" onClick={() => handleShowSalesReport("monthly")}>
          Monthly Sales Report
        </button>
        <button className="btn btn-info mx-2" onClick={() => handleShowSalesReport("yearly")}>
          Yearly Sales Report
        </button>
        <button className="btn btn-info mx-2" onClick={handleShowStockMovementReport}>
          Stock Movement Report
        </button>
        <button className="btn btn-info mx-2" onClick={handleShowProfitLossReport}>
          Profit and Loss Statement
        </button>
        <button className="btn btn-info mx-2" onClick={handleShowOutstandingPayments}>
          Outstanding Payments
        </button>
      </div>

      {/* Sales Report */}
      {salesData.length > 0 && (
        <div className="my-4">
          <h4>Sales Report</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Period</th>
                <th>Total Sales</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date || item.month || item.year}</td>
                  <td>{item.totalSales}</td>
                  <td>{item.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stock Movement Report */}
      {stockData.length > 0 && (
        <div className="my-4">
          <h4>Stock Movement Report</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item</th>
                <th>Movement</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((item, index) => (
                <tr key={index}>
                  <td>{item.item}</td>
                  <td>{item.movement}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Profit and Loss Report */}
      {profitLossData.length > 0 && (
        <div className="my-4">
          <h4>Profit and Loss Statement</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Period</th>
                <th>Revenue</th>
                <th>Cost</th>
                <th>Expenses</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              {profitLossData.map((item, index) => (
                <tr key={index}>
                  <td>{item.period}</td>
                  <td>{item.revenue}</td>
                  <td>{item.cost}</td>
                  <td>{item.expenses}</td>
                  <td>{item.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Outstanding Payments Report */}
      {outstandingPayments.length > 0 && (
        <div className="my-4">
          <h4>Outstanding Payments</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Amount Due</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {outstandingPayments.map((item, index) => (
                <tr key={index}>
                  <td>{item.customerName}</td>
                  <td>{item.amountDue}</td>
                  <td>{item.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default Reports;
