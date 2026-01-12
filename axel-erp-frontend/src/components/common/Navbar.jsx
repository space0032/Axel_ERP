import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">Axel ERP</Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-user">
          <span>Welcome, {user?.username || 'User'}</span>
          <span className="user-role">({user?.role || 'EMPLOYEE'})</span>
        </div>
        <button onClick={logout} className="btn-logout">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
