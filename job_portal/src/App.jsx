import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'; 
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Jobs from './components/Jobs';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;