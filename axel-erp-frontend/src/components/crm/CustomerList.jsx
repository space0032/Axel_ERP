import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import crmService from '../../services/crmService';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await crmService.getAllCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error('Error loading customers:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await crmService.deleteCustomer(id);
        loadCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Customers</h1>
        <Link to="/crm/customers/new" className="btn-primary">Add Customer</Link>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.company}</td>
              <td>
                <Link to={`/crm/customers/edit/${customer.id}`} className="btn-small">Edit</Link>
                <button onClick={() => handleDelete(customer.id)} className="btn-small btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
