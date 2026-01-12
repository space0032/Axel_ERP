import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import employeeService from '../../services/employeeService';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    salary: '',
    joiningDate: '',
    status: 'ACTIVE'
  });

  useEffect(() => {
    if (id) {
      loadEmployee();
    }
  }, [id]);

  const loadEmployee = async () => {
    try {
      const response = await employeeService.getEmployeeById(id);
      setFormData(response.data);
    } catch (error) {
      console.error('Error loading employee:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await employeeService.updateEmployee(id, formData);
      } else {
        await employeeService.createEmployee(formData);
      }
      navigate('/employees');
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div className="content-page">
      <h1>{id ? 'Edit Employee' : 'Add Employee'}</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>First Name</label>
          <input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input type="text" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Designation</label>
          <input type="text" value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Salary</label>
          <input type="number" step="0.01" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Joining Date</label>
          <input type="date" value={formData.joiningDate} onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">Save</button>
          <button type="button" onClick={() => navigate('/employees')} className="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
