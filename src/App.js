import React from "react";
import { Reset } from "styled-reset";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Header from "./components/Navigation/Header.jsx";

function App() {
  return (
    <React.Fragment>
      <Reset />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
