import api from './api';

const crmService = {
  // Customers
  getAllCustomers: () => api.get('/crm/customers'),
  getCustomerById: (id) => api.get(`/crm/customers/${id}`),
  createCustomer: (customer) => api.post('/crm/customers', customer),
  updateCustomer: (id, customer) => api.put(`/crm/customers/${id}`, customer),
  deleteCustomer: (id) => api.delete(`/crm/customers/${id}`),

  // Tickets
  getAllTickets: () => api.get('/crm/tickets'),
  getTicketById: (id) => api.get(`/crm/tickets/${id}`),
  createTicket: (ticket) => api.post('/crm/tickets', ticket),
  updateTicketStatus: (id, status) => api.put(`/crm/tickets/${id}`, { status }),
};

export default crmService;
