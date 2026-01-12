import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        
        <li className="menu-section">Inventory</li>
        <li>
          <Link to="/inventory/products">Products</Link>
        </li>
        <li>
          <Link to="/inventory/suppliers">Suppliers</Link>
        </li>
        <li>
          <Link to="/inventory/purchase-orders">Purchase Orders</Link>
        </li>
        
        <li className="menu-section">Employees</li>
        <li>
          <Link to="/employees">Employee List</Link>
        </li>
        <li>
          <Link to="/employees/attendance">Attendance</Link>
        </li>
        <li>
          <Link to="/employees/leaves">Leave Management</Link>
        </li>
        
        <li className="menu-section">CRM</li>
        <li>
          <Link to="/crm/customers">Customers</Link>
        </li>
        <li>
          <Link to="/crm/tickets">Tickets</Link>
        </li>
        
        <li className="menu-section">Accounts</li>
        <li>
          <Link to="/accounts/transactions">Transactions</Link>
        </li>
        <li>
          <Link to="/accounts/invoices">Invoices</Link>
        </li>
        <li>
          <Link to="/accounts/reports">Reports</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
