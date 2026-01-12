import React, { useState, useEffect } from 'react';
import crmService from '../../services/crmService';

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerId: '',
    subject: '',
    description: '',
    priority: 'MEDIUM',
    status: 'OPEN'
  });

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const response = await crmService.getAllTickets();
      setTickets(response.data);
    } catch (error) {
      console.error('Error loading tickets:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crmService.createTicket(formData);
      setFormData({ customerId: '', subject: '', description: '', priority: 'MEDIUM', status: 'OPEN' });
      setShowForm(false);
      loadTickets();
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await crmService.updateTicketStatus(id, status);
      loadTickets();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Support Tickets</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : 'Create Ticket'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Customer ID</label>
            <input type="number" value={formData.customerId} onChange={(e) => setFormData({ ...formData, customerId: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">Create Ticket</button>
        </form>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Subject</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.customerId}</td>
              <td>{ticket.subject}</td>
              <td><span className={`badge badge-${ticket.priority.toLowerCase()}`}>{ticket.priority}</span></td>
              <td><span className="badge">{ticket.status}</span></td>
              <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
              <td>
                {ticket.status === 'OPEN' && (
                  <button onClick={() => updateStatus(ticket.id, 'CLOSED')} className="btn-small">Close</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketManagement;
