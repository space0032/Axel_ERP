import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import crmService from '../../services/crmService';

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: ''
  });

  useEffect(() => {
    if (id) {
      loadCustomer();
    }
  }, [id]);

  const loadCustomer = async () => {
    try {
      const response = await crmService.getCustomerById(id);
      setFormData(response.data);
    } catch (error) {
      console.error('Error loading customer:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await crmService.updateCustomer(id, formData);
      } else {
        await crmService.createCustomer(formData);
      }
      navigate('/crm/customers');
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  return (
    <div className="content-page">
      <h1>{id ? 'Edit Customer' : 'Add Customer'}</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
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
          <label>Address</label>
          <textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Company</label>
          <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">Save</button>
          <button type="button" onClick={() => navigate('/crm/customers')} className="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
