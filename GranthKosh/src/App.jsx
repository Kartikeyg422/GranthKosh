import './App.css'
import GranthKosh from './components/GranthKosh'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Checkout from './components/checkout/Checkout'
import BookProductPage from './components/product/BookProductPage'
import Search from './components/search/Search'
import ShoppingCart from './components/cart/ShoppingCart'
import Profile from './components/profile/Profile'
import LoginPage from './components/LoginPage'
import Dashboard from './components/admin/Dashboard'
import AddBook from './components/admin/AddBook'
import Orders from './components/admin/Orders'
import Users from './components/admin/Users'
import Settings from './components/admin/Settings'
import ProtectedRoute from './components/ProtectedRoute'
import { useState, useEffect } from 'react'

// Component to conditionally render Header
function AppContent() {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    // Check if current route is an admin route
    const isAdminRoute = location.pathname.startsWith('/admin');
    
    if (isAdminRoute) {
      // Check if user is logged in and is admin
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const userData = JSON.parse(user);
          if (userData.role === 'admin') {
            setShowHeader(false);
            return;
          }
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
    }
    
    // Show header for all other routes
    setShowHeader(true);
  }, [location.pathname]);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path='/' element={<GranthKosh/>}/>
        <Route path='/cart' element={<ShoppingCart/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/product' element={<BookProductPage/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }/>
        <Route path='/login' element={<LoginPage/>}/>
        {/* admin routes - protected and require admin role */}
        <Route path='/admin/dashboard' element={
          <ProtectedRoute requireAdmin={true}>
            <Dashboard/>
          </ProtectedRoute>
        }/>
        <Route path='/admin/add-book' element={
          <ProtectedRoute requireAdmin={true}>
            <AddBook/>
          </ProtectedRoute>
        }/>
        <Route path='/admin/orders' element={
          <ProtectedRoute requireAdmin={true}>
            <Orders/>
          </ProtectedRoute>
        }/>
        <Route path='/admin/users' element={
          <ProtectedRoute requireAdmin={true}>
            <Users/>
          </ProtectedRoute>
        }/>
        <Route path='/admin/settings' element={
          <ProtectedRoute requireAdmin={true}>
            <Settings/>
          </ProtectedRoute>
        }/>

      </Routes>
    </>
  );
}

function App() {
  return (
    <>
     {/* <GranthKosh/> */}
     <Router>
      <AppContent />
     </Router>
    </>
  )
}

export default App
