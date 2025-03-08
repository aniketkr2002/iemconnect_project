import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Navbar from "../Navbar/navbar";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const email = localStorage.getItem('email');
  const [product, setProduct] = useState({
    userName: "",
    contactNo: "",
    productName: "",
    description: "",
    price: "",
    email: email,
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  
  // Retrieve the username from localStorage
  const username = localStorage.getItem("username");

  // Set the initial value of userName in the product state
  useEffect(() => {
    if (username) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        userName: username,
      }));
    }
  }, [username]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken"); // Ensure token is present
    if (!token) {
      alert("You need to log in first.");
      return;
    }

    const formData = new FormData();
    formData.append("productData", new Blob([JSON.stringify(product)], { type: "application/json" })); // Convert JSON to Blob
    formData.append("file", file);
    console.log(formData);
    try {
      const response = await fetch("http://localhost:8080/home/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Add JWT Token if needed
        },
        body: formData, // Send multipart data
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const result = await response.text();
      alert(result);
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding product.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="userName"
              className="form-control"
              placeholder="User Name"
              value={product.userName}
              onChange={handleChange}
              required
              readOnly // Make the field read-only
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="contactNo"
              className="form-control"
              placeholder="Contact No"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="productName"
              className="form-control"
              placeholder="Product Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              name="description"
              className="form-control"
              placeholder="Description"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Price"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;