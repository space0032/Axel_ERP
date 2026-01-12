import React, { useState, useEffect } from 'react';
import accountsService from '../../services/accountsService';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'CREDIT',
    amount: '',
    description: '',
    category: '',
    transactionDate: new Date().toISOString()
  });

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const response = await accountsService.getAllTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await accountsService.createTransaction(formData);
      setFormData({ type: 'CREDIT', amount: '', description: '', category: '', transactionDate: new Date().toISOString() });
      setShowForm(false);
      loadTransactions();
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Transactions</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : 'New Transaction'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Type</label>
            <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
              <option value="CREDIT">Credit</option>
              <option value="DEBIT">Debit</option>
            </select>
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input type="number" step="0.01" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
          </div>
          <button type="submit" className="btn-primary">Create Transaction</button>
        </form>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(txn => (
            <tr key={txn.id}>
              <td>{txn.id}</td>
              <td><span className={`badge badge-${txn.type.toLowerCase()}`}>{txn.type}</span></td>
              <td>${txn.amount}</td>
              <td>{txn.category}</td>
              <td>{txn.description}</td>
              <td>{new Date(txn.transactionDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
