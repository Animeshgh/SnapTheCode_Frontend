import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ setSearchTerm }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">

        <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
          🧠 Snap the Code
        </a>

        <form className="d-flex ms-auto me-3" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search snippets..."
            aria-label="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">🏠 Home</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/add">➕ Add Snippet</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/profile">👤 Profile</Link>
                </li>

                <li className="nav-item">
                  <button className="btn btn-danger ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">🔐 Login</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">📝 Register</Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
