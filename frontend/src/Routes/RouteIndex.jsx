
import { BrowserRouter as Router, Routes , Route } from "react-router-dom"
// import Auth from "../Auth/Auth";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Home from "../portal/pages/Dashboard/Home";
import ProtectedRoute from "../Auth/ProtectedRoute";
// import Home from "../portal/pages/Home";

const RouteIndex  =  () => {
return (
 <Router>
    <Routes>
        {/* AUTH ROUTES */}
        {/* <Route path="/" element ={<} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


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