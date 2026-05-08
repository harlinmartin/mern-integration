import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Userdata from './pages/Userdata';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar user={user} logout={logout} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/login" 
              element={!user ? <Login setUser={setUser} /> : <Navigate to="/userdata" />} 
            />
            <Route 
              path="/register" 
              element={!user ? <Register setUser={setUser} /> : <Navigate to="/userdata" />} 
            />
            <Route 
              path="/userdata" 
              element={user ? <Userdata user={user} /> : <Navigate to="/login" />} 
            />
            <Route path="/" element={<Navigate to="/userdata" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
