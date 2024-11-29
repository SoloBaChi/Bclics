import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";


export const useAuth = () => {
    return useContext(AuthContext);  // Custom hook for easy access
  };