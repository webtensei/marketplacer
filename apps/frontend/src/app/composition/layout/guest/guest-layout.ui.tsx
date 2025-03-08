import React from 'react';
import { Outlet } from 'react-router-dom';
import { DefaultLayout } from '../default-layout';

const GuestLayout: React.FC = () => {
  return (
    <DefaultLayout>
        <Outlet />
    </DefaultLayout>


  );
};

export default GuestLayout;

