import React, { useState } from 'react';
import employeeService from '../../services/employeeService';

const Attendance = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    checkIn: '',
    checkOut: '',
    status: 'PRESENT'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await employeeService.markAttendance(formData);
      alert('Attendance marked successfully');
      setFormData({
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        checkIn: '',
        checkOut: '',
        status: 'PRESENT'
      });
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <div className="content-page">
      <h1>Mark Attendance</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Employee ID</label>
          <input type="number" value={formData.employeeId} onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Check In</label>
          <input type="time" value={formData.checkIn} onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Check Out</label>
          <input type="time" value={formData.checkOut} onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
            <option value="HALF_DAY">Half Day</option>
          </select>
        </div>
        <button type="submit" className="btn-primary">Mark Attendance</button>
      </form>
    </div>
  );
};

export default Attendance;
