import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Link to="/profile" className="bg-blue-500 text-white p-4 rounded-lg text-center">
          Profile Management
        </Link>
        <Link to="/bike-management" className="bg-blue-500 text-white p-4 rounded-lg text-center">
          Bike Management
        </Link>
        <Link to="/rental-management" className="bg-blue-500 text-white p-4 rounded-lg text-center">
          Rental Management
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
