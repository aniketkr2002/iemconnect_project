import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import Product from '../Product/Product';
import './MyCart.css'

function MyCart() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('email'); // Retrieve the user's email from localStorage

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.error('No JWT token found. Redirecting to login...');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/home/mycart?email=${userEmail}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem('jwtToken');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate, userEmail]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="home">
      <Navbar />
      <div className="home-container container-fluid">
        <h1 className="text-center my-1">My Cart</h1>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            No products in your cart
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map((product) => (
              <div key={product.productId} className="col">
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCart;