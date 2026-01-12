import React, { useState, useEffect } from 'react';
import inventoryService from '../../services/inventoryService';

const PurchaseOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    productId: '',
    supplierId: '',
    quantity: '',
    totalAmount: '',
    status: 'PENDING',
    orderDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ordersRes, productsRes, suppliersRes] = await Promise.all([
        inventoryService.getAllPurchaseOrders(),
        inventoryService.getAllProducts(),
        inventoryService.getAllSuppliers()
      ]);
      setOrders(ordersRes.data);
      setProducts(productsRes.data);
      setSuppliers(suppliersRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await inventoryService.createPurchaseOrder(formData);
      setFormData({
        productId: '',
        supplierId: '',
        quantity: '',
        totalAmount: '',
        status: 'PENDING',
        orderDate: new Date().toISOString().split('T')[0]
      });
      setShowForm(false);
      loadData();
    } catch (error) {
      console.error('Error creating purchase order:', error);
    }
  };

  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Purchase Orders</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : 'New Purchase Order'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Product</label>
            <select
              value={formData.productId}
              onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
              required
            >
              <option value="">Select Product</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Supplier</label>
            <select
              value={formData.supplierId}
              onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
              required
            >
              <option value="">Select Supplier</option>
              {suppliers.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Total Amount</label>
            <input
              type="number"
              step="0.01"
              value={formData.totalAmount}
              onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Create Order</button>
        </form>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Supplier ID</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.productId}</td>
              <td>{order.supplierId}</td>
              <td>{order.quantity}</td>
              <td>${order.totalAmount}</td>
              <td><span className="badge">{order.status}</span></td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrders;
