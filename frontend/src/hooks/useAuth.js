import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";


const useAuth = () => {
    return useContext(AuthContext);  // Custom hook for easy access
  };


  export default useAuth;