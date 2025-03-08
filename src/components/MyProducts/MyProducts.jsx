import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
// import "./MyProducts.css"; // Optional: Add custom styles

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email"); // Retrieve the user's email from localStorage

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        console.error("No JWT token found. Redirecting to login...");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/home/myproducts?email=${userEmail}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("jwtToken");
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate, userEmail]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">My Products</h2>
        {products.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            No products found.
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map((product) => (
              <div key={product.productId} className="col">
                <div className="card h-100">
                  <img
                    src={product.imageUrl} // Ensure your backend provides the image URL
                    className="card-img-top"
                    alt={product.productName}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      <strong>Price:</strong> ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProducts;