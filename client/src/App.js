import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/PrivateRoute';

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
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
