import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Navbar from '../Navbar/navbar';

function About() {
  return (
    <div className="container-fluid p-0">
      <Navbar/>
      <header className="bg-primary text-white text-center py-5">
        <h1 className="display-4">About Us</h1>
        <p className="lead">Connecting Seniors and Juniors, Building a Community, and Facilitating Trade</p>
      </header>

      {/* Mission Section */}
      <section className="container my-5">
        <div className="row">
          <div className="col text-center">
            <h2 className="display-5 mb-4">Our Mission</h2>
            <p className="lead">
              Our mission is to create a platform that bridges the gap between seniors and juniors, fostering meaningful connections, knowledge sharing, and a supportive community. We also provide a marketplace where users can buy and sell products, making it easier for everyone to find what they need.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="display-5 text-center mb-5">How It Works</h2>
          <div className="row">
            <div className="col-md-4 text-center">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Build Connections</h3>
                  <p className="card-text">
                    Seniors and juniors can connect through our platform, sharing experiences, advice, and knowledge. Whether you're a senior looking to mentor or a junior seeking guidance, our platform makes it easy to find the right match.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Buy and Sell Products</h3>
                  <p className="card-text">
                    Our marketplace allows users to list products for sale or browse items posted by others. From textbooks and electronics to furniture and more, you can find everything you need right here.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title"> Create a Community</h3>
                  <p className="card-text">
                    We believe in the power of community. Our platform encourages users to engage in discussions, share resources, and support each other, creating a vibrant and inclusive environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container my-5">
        <h2 className="display-5 text-center mb-5">Why Choose Us?</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title">For Seniors</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Share your knowledge and experience with the next generation.</li>
                  <li className="list-group-item">Earn extra income by selling unused items.</li>
                  <li className="list-group-item">Stay connected and engaged with a vibrant community.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title">For Juniors</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Learn from experienced seniors and gain valuable insights.</li>
                  <li className="list-group-item">Find affordable products for your needs.</li>
                  <li className="list-group-item">Build relationships and grow your network.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Creator Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="display-5 mb-4">About the Creator</h2>
          <div className="card mx-auto shadow-sm" style={{ maxWidth: '500px' }}>
            <div className="card-body">
              <h3 className="card-title">Aniket Kumar</h3>
              <p className="card-text">
                First-year student at <strong>CSE (IoT)</strong>, later switched to <strong>CSE</strong>.
              </p>
              <p className="card-text">
                <strong>Contact:</strong> +91 9262919230
              </p>
              <p className="card-text">
                <strong>From:</strong> Hajipur, Bihar, India
              </p>
              <p className="card-text">
                This project was created to bridge the gap between seniors and juniors, fostering a supportive community and providing a platform for buying and selling products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">© 2023 IEMConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;