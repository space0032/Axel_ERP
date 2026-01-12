import React, { useState, useEffect } from 'react';
import employeeService from '../../services/employeeService';

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    leaveType: 'SICK',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const loadLeaves = async () => {
    // This would need to be enhanced to load all leaves or filter by employee
    console.log('Load all leaves');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await employeeService.applyLeave(formData);
      alert('Leave applied successfully');
      setShowForm(false);
      setFormData({ employeeId: '', leaveType: 'SICK', startDate: '', endDate: '', reason: '' });
    } catch (error) {
      console.error('Error applying leave:', error);
    }
  };

  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Leave Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : 'Apply Leave'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Employee ID</label>
            <input type="number" value={formData.employeeId} onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Leave Type</label>
            <select value={formData.leaveType} onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}>
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Casual Leave</option>
              <option value="ANNUAL">Annual Leave</option>
            </select>
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Reason</label>
            <textarea value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} required />
          </div>
          <button type="submit" className="btn-primary">Submit Leave Application</button>
        </form>
      )}

      <div className="info-message">
        <p>Leave records will be displayed here once implemented with proper filtering.</p>
      </div>
    </div>
  );
};

export default LeaveManagement;
