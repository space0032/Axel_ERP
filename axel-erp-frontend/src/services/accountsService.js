import api from './api';

const accountsService = {
  // Transactions
  getAllTransactions: () => api.get('/accounts/transactions'),
  createTransaction: (transaction) => api.post('/accounts/transactions', transaction),
  getFinancialSummary: () => api.get('/accounts/transactions/summary'),

  // Invoices
  getAllInvoices: () => api.get('/accounts/invoices'),
  getInvoiceById: (id) => api.get(`/accounts/invoices/${id}`),
  createInvoice: (invoice) => api.post('/accounts/invoices', invoice),
  updateInvoice: (id, invoice) => api.put(`/accounts/invoices/${id}`, invoice),

  // Reports
  getRevenueReport: () => api.get('/accounts/revenue'),
};

export default accountsService;
