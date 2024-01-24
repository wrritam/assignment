import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../app/Home';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default AppRoutes
