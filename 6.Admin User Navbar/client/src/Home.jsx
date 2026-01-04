import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div>

      {/* Hero Section */}
      <div className="bg-dark text-light text-center py-5">
        <h1 className="display-4">📚 Welcome to Bookstore</h1>
        <p className="lead">
          Discover, read, and explore your favorite books
        </p>
        <div className="mt-4">
          <a href="/books" className="btn btn-primary me-3">
            Browse Books
          </a>
          <a href="/login" className="btn btn-outline-light">
            Login
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <div className="row text-center">

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">📖 Huge Collection</h5>
                <p className="card-text">
                  Explore a wide range of books from different genres.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">🚚 Fast Delivery</h5>
                <p className="card-text">
                  Get your books delivered quickly and safely.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">💳 Secure Payment</h5>
                <p className="card-text">
                  Safe and secure payment methods for all users.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light text-center py-3">
        <p className="mb-0">© 2025 Bookstore. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Home;
