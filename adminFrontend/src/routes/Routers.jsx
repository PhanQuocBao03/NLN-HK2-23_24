import Home from "../pages/Home";
import Services from "../pages/Services";
// import Login from "../pages/Login";
import Singup from "../pages/Signup";
import Doctor from "../pages/Doctor/Doctor";
import User from "../pages/user/user";
import Booking from "../pages/Bookings/Booking";

import ProtectedRoute from "./ProtectedRoute";
// import DashBoardAdmin from "../../admin/DashBoardAdmin";

import {Routes, Route}  from 'react-router-dom'
const Routers = () =>{
    return <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/doctor" element={<Doctor/>} />
        <Route path="/user" element={<User/>} />
        <Route path="booking" element={<Booking/>} />

       
        {/* <Route path="/login" element={<Login/>} /> */}
        <Route path="/register" element={<Singup/>} />
        <Route path="/services" element={<Services/>} />
       
        
    </Routes>
}

export default Routers