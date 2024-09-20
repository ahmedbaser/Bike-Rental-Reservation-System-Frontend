import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your AdminDashboard!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Link to="/profile" className="bg-blue-500 text-white p-4 rounded-lg text-center">
          Profile Management
        </Link>
        <Link to="/admin/user-management" className="bg-blue-500 text-white p-4 rounded-lg text-center">
          User Management
        </Link>
        <Link to="/admin/bike-management" className="bg-blue-500 text-white p-4 rounded-lg text-center">
          Bike Management
        </Link>
        <Link to="/admin/rental-management" className="bg-blue-500 text-white p-4 rounded-lg text-center">
          Rental Management
        </Link>
        <Link to="/admin/coupon-management" className="bg-blue-500 text-white p-4 rounded-lg text-center">
          Coupon Management
        </Link>
      </div>
    </div>
  )
};

export default AdminDashboard;


