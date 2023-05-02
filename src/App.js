import React from "react";
import { Reset } from "styled-reset";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Header from "./components/Navigation/Header.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import FindUser from "./pages/Auth/FindUser.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";

function App() {
  return (
    <React.Fragment>
      <Reset />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/finduser' element={<FindUser />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
