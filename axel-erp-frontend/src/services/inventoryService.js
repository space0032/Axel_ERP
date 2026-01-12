import api from './api';

const inventoryService = {
  // Products
  getAllProducts: () => api.get('/inventory/products'),
  getProductById: (id) => api.get(`/inventory/products/${id}`),
  createProduct: (product) => api.post('/inventory/products', product),
  updateProduct: (id, product) => api.put(`/inventory/products/${id}`, product),
  deleteProduct: (id) => api.delete(`/inventory/products/${id}`),
  getLowStockProducts: () => api.get('/inventory/products/low-stock'),

  // Suppliers
  getAllSuppliers: () => api.get('/inventory/suppliers'),
  createSupplier: (supplier) => api.post('/inventory/suppliers', supplier),

  // Purchase Orders
  getAllPurchaseOrders: () => api.get('/inventory/purchase-orders'),
  createPurchaseOrder: (order) => api.post('/inventory/purchase-orders', order),
};

export default inventoryService;
