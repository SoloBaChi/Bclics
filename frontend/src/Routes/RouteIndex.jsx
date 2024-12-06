
import { BrowserRouter as Router, Routes , Route } from "react-router-dom"
// import Auth from "../Auth/Auth";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Home from "../portal/pages/Dashboard/Home";
import ProtectedRoute from "../Auth/ProtectedRoute";
import ForgotPassword from "../Auth/ForgotPassword";
import VerifyForgotPassword from "../Auth/VerifyForgotPassword";
import ResetPassword from "../Auth/ResetPassword";
// import Home from "../portal/pages/Home";

const RouteIndex  =  () => {
return (
 <Router>
    <Routes>
        {/* AUTH ROUTES */}
        {/* <Route path="/" element ={<} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-forgot-password" element={<VerifyForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />


        {/* DASHBOARD ROUTES */}
        <Route path="/dashboard" 
        element={
        <ProtectedRoute>
        <Home/>
        </ProtectedRoute>
        }/>
    </Routes>
 </Router>
)
}

export default RouteIndex;