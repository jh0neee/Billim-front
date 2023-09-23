import React from 'react';
import { Reset } from 'styled-reset';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Header from './components/Navigation/Header.jsx';
import SignIn from './pages/Auth/SignIn.jsx';
import FindUser from './pages/Auth/FindUser.jsx';
import SignUp from './pages/Auth/SignUp.jsx';
import EmailVerification from './pages/Auth/EmailVerification.jsx';
import ProductList from './pages/Product/ProductList.jsx';
import ProductDetail from './pages/Product/ProductDetail.jsx';
import ProductPayment from './pages/Product/ProductPayment.jsx';
import ScrollToTop from './util/ScrollToTop.js';
import MyPage from './pages/MyPage.jsx';
import PurchaseManagement from './components/MyPage/PurchaseManagement.jsx';
import SalesManagement from './components/MyPage/SalesManagement.jsx';
import WishList from './components/MyPage/WishList.jsx';
import SalesDetailManagement from './components/MyPage/SalesDetailManagement.jsx';
import Review from './components/MyPage/Review.jsx';
import EditMember from './components/MyPage/EditMember.jsx';
import NewProduct from './pages/NewProduct.jsx';
import MyPageCoupon from './components/MyPage/MyPageCoupon.jsx';
import UpdateProduct from './pages/Product/UpdateProduct.jsx';
import Chat from './pages/Chat.jsx';
import MessageChat from './components/Chat/MessageChat.jsx';
import BlockChat from './components/Chat/BlockChat.jsx';
import EmailConfirm from './pages/Auth/EmailConfirm.jsx';
import BackLocation from './util/BackLocation.js';

function App() {
  const token = useSelector(state => state.auth.token);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />}>
          <Route path="/chat" element={<BlockChat />} />
          <Route path="/chat/messages/:chatRoomId" element={<MessageChat />} />
        </Route>
        <Route path="/product" element={<ProductList />}>
          <Route path="living" element={<ProductList />} />
          <Route path="apparel" element={<ProductList />} />
          <Route path="sporting" element={<ProductList />} />
          <Route path="electronic" element={<ProductList />} />
        </Route>
        <Route path="/:productId/detail" element={<ProductDetail />} />
        <Route path="/:productId/payment" element={<ProductPayment />} />
        <Route path="/product/new" element={<NewProduct />} />
        <Route path="/product/:productId" element={<UpdateProduct />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route path="/mypage/purchase" element={<PurchaseManagement />} />
          <Route path="/mypage/sales" element={<SalesManagement />} />
          <Route
            path="/mypage/sales/:productId"
            element={<SalesDetailManagement />}
          />
          <Route path="/mypage/favorite" element={<WishList />} />
          <Route path="/mypage/review" element={<Review />} />
          <Route path="/mypage/member" element={<EditMember />} />
          <Route path="/mypage/coupon" element={<MyPageCoupon />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductList />}>
          <Route path="living" element={<ProductList />} />
          <Route path="apparel" element={<ProductList />} />
          <Route path="sporting" element={<ProductList />} />
          <Route path="electronic" element={<ProductList />} />
        </Route>
        <Route path="/:productId/detail" element={<ProductDetail />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/finduser/password" element={<FindUser />}></Route>
        <Route path="/emailverify" element={<EmailVerification />} />
        <Route path="/emailverify/confirm" element={<EmailConfirm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <React.Fragment>
      <Reset />
      <BrowserRouter>
        <ScrollToTop />
        <BackLocation />
        <Header />
        <main>{routes}</main>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
