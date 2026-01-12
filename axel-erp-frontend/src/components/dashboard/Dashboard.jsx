import React, { useState, useEffect } from 'react';
import inventoryService from '../../services/inventoryService';
import employeeService from '../../services/employeeService';
import crmService from '../../services/crmService';
import accountsService from '../../services/accountsService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    employees: 0,
    customers: 0,
    tickets: 0,
    lowStockProducts: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [products, employees, customers, tickets] = await Promise.all([
        inventoryService.getAllProducts(),
        employeeService.getAllEmployees(),
        crmService.getAllCustomers(),
        crmService.getAllTickets()
      ]);

      const lowStock = await inventoryService.getLowStockProducts();

      setStats({
        products: products.data.length,
        employees: employees.data.length,
        customers: customers.data.length,
        tickets: tickets.data.length,
        lowStockProducts: lowStock.data.length
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">{stats.products}</p>
        </div>
        <div className="stat-card">
          <h3>Total Employees</h3>
          <p className="stat-number">{stats.employees}</p>
        </div>
        <div className="stat-card">
          <h3>Total Customers</h3>
          <p className="stat-number">{stats.customers}</p>
        </div>
        <div className="stat-card">
          <h3>Open Tickets</h3>
          <p className="stat-number">{stats.tickets}</p>
        </div>
        <div className="stat-card alert">
          <h3>Low Stock Products</h3>
          <p className="stat-number">{stats.lowStockProducts}</p>
        </div>
      </div>

      <div className="dashboard-info">
        <h2>Welcome to Axel ERP</h2>
        <p>Your complete Enterprise Resource Planning solution</p>
        <ul>
          <li>Manage inventory, products, and suppliers</li>
          <li>Track employee attendance and leave requests</li>
          <li>Handle customer relationships and support tickets</li>
          <li>Monitor financial transactions and invoices</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
