import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import ProductList from './components/inventory/ProductList';
import ProductForm from './components/inventory/ProductForm';
import SupplierList from './components/inventory/SupplierList';
import PurchaseOrders from './components/inventory/PurchaseOrders';
import EmployeeList from './components/employees/EmployeeList';
import EmployeeForm from './components/employees/EmployeeForm';
import Attendance from './components/employees/Attendance';
import LeaveManagement from './components/employees/LeaveManagement';
import CustomerList from './components/crm/CustomerList';
import CustomerForm from './components/crm/CustomerForm';
import TicketManagement from './components/crm/TicketManagement';
import Transactions from './components/accounts/Transactions';
import Invoices from './components/accounts/Invoices';
import Reports from './components/accounts/Reports';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/*" element={
              <ProtectedRoute>
                <div className="app-layout">
                  <Navbar />
                  <div className="main-content">
                    <Sidebar />
                    <div className="content-area">
                      <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        
                        {/* Inventory Routes */}
                        <Route path="/inventory/products" element={<ProductList />} />
                        <Route path="/inventory/products/new" element={<ProductForm />} />
                        <Route path="/inventory/products/edit/:id" element={<ProductForm />} />
                        <Route path="/inventory/suppliers" element={<SupplierList />} />
                        <Route path="/inventory/purchase-orders" element={<PurchaseOrders />} />
                        
                        {/* Employee Routes */}
                        <Route path="/employees" element={<EmployeeList />} />
                        <Route path="/employees/new" element={<EmployeeForm />} />
                        <Route path="/employees/edit/:id" element={<EmployeeForm />} />
                        <Route path="/employees/attendance" element={<Attendance />} />
                        <Route path="/employees/leaves" element={<LeaveManagement />} />
                        
                        {/* CRM Routes */}
                        <Route path="/crm/customers" element={<CustomerList />} />
                        <Route path="/crm/customers/new" element={<CustomerForm />} />
                        <Route path="/crm/customers/edit/:id" element={<CustomerForm />} />
                        <Route path="/crm/tickets" element={<TicketManagement />} />
                        
                        {/* Accounts Routes */}
                        <Route path="/accounts/transactions" element={<Transactions />} />
                        <Route path="/accounts/invoices" element={<Invoices />} />
                        <Route path="/accounts/reports" element={<Reports />} />
                      </Routes>
                      <Footer />
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
