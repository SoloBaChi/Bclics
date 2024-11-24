// App.jsx
import React from 'react';
import { Route, Routes } from "react-router-dom";

import Auth from './Auth/Auth';

function App() {
  return (
    <>
   <Routes>
      <Route path="/*" element={<Auth />} />
    </Routes>
  </>
  );
}

export default App;





