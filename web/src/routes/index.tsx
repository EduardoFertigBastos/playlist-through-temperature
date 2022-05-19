import React from 'react';

// import { Navigate, Routes as SwitchRoutes } from 'react-router-dom';
import { Routes as SwitchRoutes, Route, Navigate } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <SwitchRoutes>
    <Route path="/" element={<Dashboard />} />
  </SwitchRoutes>
);

export default Routes;
