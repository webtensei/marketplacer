import React from 'react';
import { Outlet } from 'react-router-dom';

const GuestLayout: React.FC = () => {
  return (
    <div className="w-full h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Guest Layout</h1>
      <Outlet />
    </div>
  );
};

export default GuestLayout;

