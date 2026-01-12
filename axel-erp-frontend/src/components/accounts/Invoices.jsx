import React, { useState, useEffect } from 'react';
import accountsService from '../../services/accountsService';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerId: '',
    items: '',
    totalAmount: '',
    tax: '',
    grandTotal: '',
    status: 'PENDING',
    issuedDate: new Date().toISOString().split('T')[0],
    dueDate: ''
  });

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const response = await accountsService.getAllInvoices();
      setInvoices(response.data);
    } catch (error) {
      console.error('Error loading invoices:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await accountsService.createInvoice(formData);
      setFormData({ customerId: '', items: '', totalAmount: '', tax: '', grandTotal: '', status: 'PENDING', issuedDate: new Date().toISOString().split('T')[0], dueDate: '' });
      setShowForm(false);
      loadInvoices();
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Invoices</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : 'Create Invoice'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Customer ID</label>
            <input type="number" value={formData.customerId} onChange={(e) => setFormData({ ...formData, customerId: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Items</label>
            <textarea value={formData.items} onChange={(e) => setFormData({ ...formData, items: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Total Amount</label>
            <input type="number" step="0.01" value={formData.totalAmount} onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Tax</label>
            <input type="number" step="0.01" value={formData.tax} onChange={(e) => setFormData({ ...formData, tax: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Grand Total</label>
            <input type="number" step="0.01" value={formData.grandTotal} onChange={(e) => setFormData({ ...formData, grandTotal: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
          </div>
          <button type="submit" className="btn-primary">Create Invoice</button>
        </form>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Grand Total</th>
            <th>Status</th>
            <th>Issued Date</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.customerId}</td>
              <td>${invoice.grandTotal}</td>
              <td><span className="badge">{invoice.status}</span></td>
              <td>{new Date(invoice.issuedDate).toLocaleDateString()}</td>
              <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
