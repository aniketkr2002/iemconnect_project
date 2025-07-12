import React, { useEffect, useState } from 'react';
import './Product.css'; // Import the CSS file

function Product({ product }) {
  const [isAddedToCart, setIsAddedToCart] = useState(false); // State to track if the product is in the cart
  const userEmail = localStorage.getItem('email'); // Retrieve the logged-in user's email from localStorage
  const token = localStorage.getItem('token');
  // Function to handle "Add to Cart" button click
  const handleAddToCart = async () => {
    try {
      // Disable the button immediately to prevent multiple clicks
      setIsAddedToCart(true);
      const response = await fetch('http://localhost:8080/home/addcart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({
          productId: product.productId,
          email: userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      // If the API call is successful, keep the button disabled
      setIsAddedToCart(true);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Re-enable the button if the API call fails
      setIsAddedToCart(false);
    }
  };

  // Function to handle "Remove from Cart" button click
  const handleRemoveFromCart = async () => {
    try {
      const response = await fetch(`http://localhost:8080/home/removeCart?email=${userEmail}&id=${product.productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove product from cart');
      }

      // If the API call is successful, update the state to reflect that the product is no longer in the cart
      setIsAddedToCart(false);
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  // Fetch the user's cart items and check if the current product is already in the cart
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:8080/home/mycart?email=${userEmail}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const cartItems = await response.json();

        // Check if the current product is in the cart
        const isProductInCart = cartItems.some((item) => item.productId === product.productId);

        // Update the state based on whether the product is in the cart
        setIsAddedToCart(isProductInCart);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userEmail, product.productId]);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={`data:image/jpeg;base64,${product.images}`} alt={product.productName} />
      </div>
      <div className="product-details">
        <h3>{product.productName}</h3>
        <p>{product.description}</p>
        <p className="product-price">${product.price}</p>
        <p><strong>Seller:</strong> {product.userName}</p>
        <p><strong>Contact:</strong> {product.contactNo}</p>
        <button
          className={`cart-button ${isAddedToCart ? 'remove-from-cart' : 'add-to-cart'}`}
          onClick={isAddedToCart ? handleRemoveFromCart : handleAddToCart}
        >
          {isAddedToCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default Product;