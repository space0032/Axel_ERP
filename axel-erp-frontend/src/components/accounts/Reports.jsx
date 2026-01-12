import React, { useState, useEffect } from 'react';
import accountsService from '../../services/accountsService';

const Reports = () => {
  const [financialSummary, setFinancialSummary] = useState(null);
  const [revenueReport, setRevenueReport] = useState(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const [summary, revenue] = await Promise.all([
        accountsService.getFinancialSummary(),
        accountsService.getRevenueReport()
      ]);
      setFinancialSummary(summary.data);
      setRevenueReport(revenue.data);
    } catch (error) {
      console.error('Error loading reports:', error);
    }
  };

  return (
    <div className="content-page">
      <h1>Financial Reports</h1>
      
      <div className="report-section">
        <h2>Financial Summary</h2>
        {financialSummary && (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Credit</h3>
              <p className="stat-number">${financialSummary.totalCredit}</p>
            </div>
            <div className="stat-card">
              <h3>Total Debit</h3>
              <p className="stat-number">${financialSummary.totalDebit}</p>
            </div>
            <div className="stat-card">
              <h3>Balance</h3>
              <p className="stat-number">${financialSummary.balance}</p>
            </div>
            <div className="stat-card">
              <h3>Transactions</h3>
              <p className="stat-number">{financialSummary.transactionCount}</p>
            </div>
          </div>
        )}
      </div>

      <div className="report-section">
        <h2>Revenue Report</h2>
        {revenueReport && (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Revenue</h3>
              <p className="stat-number">${revenueReport.totalRevenue}</p>
            </div>
            <div className="stat-card">
              <h3>Pending Revenue</h3>
              <p className="stat-number">${revenueReport.pendingRevenue}</p>
            </div>
            <div className="stat-card">
              <h3>Total Invoices</h3>
              <p className="stat-number">{revenueReport.invoiceCount}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
