import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ChangePassword from './Changepassword';
import Forgetpassword from './Forgetpassword';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import Adminproductlist from './Adminproductlist';
import Adminuserlist from './Adminuserlist';
import Admineditproduct from './Admineditproduct';
import Adminaddproduct from './Adminaddproduct';
import { UseProvider } from './Usercontext';
import { useEffect } from 'react';
function App() {
  // const navigate = useNavigate()
  // useEffect(()=>{
  //   navigate("/admindashboard/userlist")
  // })
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/userdashboard" element={<UserDashboard />} />

        <Route path="/admindashboard" element={<AdminDashboard />} >

        <Route path="/admindashboard/productlist" element={<Adminproductlist />} />
        <Route path="/admindashboard/userlist" element={<Adminuserlist />} />
        <Route path="/admindashboard/addproduct" element={<Adminaddproduct />} />

        </Route>
        <Route path="/admindashboard/productlist/:editproductparams" element={<Admineditproduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
