import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/PrivateRoute';
import PageNotFound from './pages/PageNotFound';
import Secret from './pages/user/Secret';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCategory from './pages/admin/AdminCategory';
import AdminProduct from './pages/admin/AdminProduct';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import AdminRoute from './components/routes/AdminRoute';
import AdminProductCreate from './pages/admin/AdminProductCreate';
import AdminProductUpdate from './pages/admin/AdminProductUpdate';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/categories" element={<AdminCategory />} />
          <Route path="admin/products" element={<AdminProduct />} />
          <Route path="admin/products/create" element={<AdminProductCreate />} />
          <Route path="admin/product/update/:slug" element={<AdminProductUpdate />} />
          <Route path="secret" element={<Secret />} />
        </Route>
        <Route path='*' element={<PageNotFound />} replace />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
