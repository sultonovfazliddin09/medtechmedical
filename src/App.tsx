import {  Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './auth/login';
import Dashboard from './admin/dashboard';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  );
}

export default App;
