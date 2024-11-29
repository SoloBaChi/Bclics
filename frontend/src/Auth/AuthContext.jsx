import { createContext, useState } from 'react';

export const AuthContext = createContext();  // Create the context

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);  // Store auth data

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};


