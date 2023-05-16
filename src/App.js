import React from "react";
import { Reset } from "styled-reset";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Header from "./components/Navigation/Header.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import FindUser from "./pages/Auth/FindUser.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import EmailVerification from "./pages/Auth/EmailVerification.jsx";
import ProductList from "./pages/Product/ProductList.jsx";
import ProductDetail from "./pages/Product/ProductDetail.jsx";
import ProductPayment from "./pages/Product/ProductPayment.jsx";
import ScrollToTop from "./util/ScrollToTop.js";
import MyPage from "./pages/MyPage.jsx";
import PurchaseManagement from "./components/MyPage/PurchaseManagement.jsx";
import SalesManagement from "./components/MyPage/SalesManagement.jsx";
import WishList from "./components/MyPage/WishList.jsx";
import SalesDetailManagement from "./components/MyPage/SalesDetailManagement.jsx";
import Review from "./components/MyPage/Review.jsx";
import BlockManagement from "./components/MyPage/BlockManagement.jsx";
import EditMember from "./components/MyPage/EditMember.jsx";

function App() {
  return (
    <React.Fragment>
      <Reset />
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/finduser' element={<FindUser />} />
          <Route path='/emailverify' element={<EmailVerification />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/product' element={<ProductList />}>
            <Route path='living' element={<ProductList />} />
            <Route path='apparel' element={<ProductList />} />
            <Route path='sporting' element={<ProductList />} />
            <Route path='electronic' element={<ProductList />} />
          </Route>
          <Route path='/:itemName/detail' element={<ProductDetail />} />
          <Route path='/:itemName/payment' element={<ProductPayment />} />
          <Route path='/mypage' element={<MyPage />}>
            <Route path='/mypage/purchase' element={<PurchaseManagement />} />
            <Route path='/mypage/sales' element={<SalesManagement />} />
            <Route path='/mypage/sales/detail' element={<SalesDetailManagement />} />
            <Route path='/mypage/favorite' element={<WishList />} />
            <Route path='/mypage/review' element={<Review />} />
            <Route path='/mypage/block' element={<BlockManagement />} />
            <Route path='/mypage/member' element={<EditMember />} />
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
