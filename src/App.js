import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Adminchartlist from './Adminchartlist';
import Viewuserproduct from './Viewuserproduct';

function App() {
  
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
        <Route path="/admindashboard/chartlist" element={<Adminchartlist />} />

        </Route>
        
        <Route path="/admindashboard/productlist/:editproductparams" element={<Admineditproduct />} />
        <Route path="/userdashboard/productlist/:getproduct" element={<Viewuserproduct/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
