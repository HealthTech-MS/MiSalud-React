import './App.css';
import '../node_modules/react-vis/dist/style.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateLayout from './components/Layout/PrivateLayout';
import Users from './components/pages/Users';
import Dashboard from './components/pages/Dashboard';
import Login from './components/auth/Login'; 
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={
            <PrivateLayout>
              <Dashboard />
            </PrivateLayout>
          }/>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/users" element={
            <PrivateLayout>
              <Users />
            </PrivateLayout>
          }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
