import React from 'react';
import { Outlet } from 'react-router-dom';
import { DefaultLayout } from '../default-layout';

const GuestLayout: React.FC = () => {
  return (
    <DefaultLayout>
        <h1 className="text-2xl font-bold">Guest Layout</h1>
        <Outlet />
    </DefaultLayout>


  );
};

export default GuestLayout;

