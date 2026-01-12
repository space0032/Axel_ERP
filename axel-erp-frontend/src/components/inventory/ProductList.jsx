import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import inventoryService from '../../services/inventoryService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await inventoryService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await inventoryService.deleteProduct(id);
        loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Products</h1>
        <Link to="/inventory/products/new" className="btn-primary">Add Product</Link>
      </div>
      
      <table className="data-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <span className={product.quantity <= product.reorderLevel ? 'badge-danger' : 'badge-success'}>
                  {product.quantity <= product.reorderLevel ? 'Low Stock' : 'In Stock'}
                </span>
              </td>
              <td>
                <Link to={`/inventory/products/edit/${product.id}`} className="btn-small">Edit</Link>
                <button onClick={() => handleDelete(product.id)} className="btn-small btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
