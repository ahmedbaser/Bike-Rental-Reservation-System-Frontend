import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../redux/store/index";
import { logout } from "../redux/store/reducers/authReducer"
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      {user?.role === 'admin' && (
        <Menu.Item key="2">
          <Link to="/admin/dashboard">Admin Dashboard</Link>
        </Menu.Item>
      )}
      <Menu.Item key="3" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        
    <Link to="/" className=" text-lg font-semibold">
      <div className=" p-2 rounded">
       <img 
             src="https://img.freepik.com/free-vector/gradient-biker-logo-design_23-2149909199.jpg?ga=GA1.1.417103105.1726235524&semt=ais_hybrid" 
             alt="Bike Rental Logo" 
             className="h-10 w-auto"
          />
      </div>
    </Link>

        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300">
            About
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-gray-300">
                Dashboard
              </Link>
             
              
              <Dropdown overlay={menu} trigger={['click']}>
                <Button type="link" className="text-white hover:text-gray-300">
                  {user.name} <DownOutlined />
                </Button>
              </Dropdown>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-gray-300">
                Sign Up
              </Link>
            </>
          )}
        </div>
        {/* Mobile Menu */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-blue-700 p-2">
          <Link to="/" className="block text-white hover:text-gray-300 p-2">
            Home
          </Link>
          <Link to="/about" className="block text-white hover:text-gray-300 p-2">
            About
          </Link>
         
           
         
          {user ? (
            <>
              <Link to="/dashboard" className="block text-white hover:text-gray-300 p-2">
                Dashboard
              </Link>
              <Link to="/profile" className="block text-white hover:text-gray-300 p-2">
                Profile
              </Link>
              {user.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  className="block text-white hover:text-gray-300 p-2"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="block text-white hover:text-gray-300 p-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-white hover:text-gray-300 p-2">
                Login
              </Link>
              <Link to="/signup" className="block text-white hover:text-gray-300 p-2">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

