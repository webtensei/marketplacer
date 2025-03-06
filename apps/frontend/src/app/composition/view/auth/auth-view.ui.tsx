import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthView: React.FC = () => {
  return <div>AuthView

    <Outlet />
  </div>;
};

export default AuthView;
