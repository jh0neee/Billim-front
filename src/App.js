import React, { Suspense } from 'react';
import { Reset } from 'styled-reset';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Navigation/Header.jsx';
import ScrollToTop from './util/ScrollToTop.js';
import BackLocation from './util/BackLocation.js';
import LoadingSpinner from './components/UI/LoadingSpinner.jsx';
import { useToastAlert } from './hooks/useToastAlert.js';

const Home = React.lazy(() => import('./pages/Home.jsx'));
const Chat = React.lazy(() => import('./pages/Chat.jsx'));
const SignIn = React.lazy(() => import('./pages/Auth/SignIn.jsx'));
const SignUp = React.lazy(() => import('./pages/Auth/SignUp.jsx'));
const MyPage = React.lazy(() => import('./pages/MyPage.jsx'));
const Review = React.lazy(() => import('./components/MyPage/Review.jsx'));
const WishList = React.lazy(() => import('./components/MyPage/WishList.jsx'));
const FindUser = React.lazy(() => import('./pages/Auth/FindUser.jsx'));
const BlockChat = React.lazy(() => import('./components/Chat/BlockChat.jsx'));
const NewProduct = React.lazy(() => import('./pages/NewProduct.jsx'));
const ProductList = React.lazy(() => import('./pages/Product/ProductList.jsx'));
const EmailConfirm = React.lazy(() => import('./pages/Auth/EmailConfirm.jsx'));
const EditMember = React.lazy(() =>
  import('./components/MyPage/EditMember.jsx'),
);
const MessageChat = React.lazy(() =>
  import('./components/Chat/MessageChat.jsx'),
);
const MyPageCoupon = React.lazy(() =>
  import('./components/MyPage/MyPageCoupon.jsx'),
);
const KakaoRedirect = React.lazy(() =>
  import('./pages/Auth/KakaoRedirect.jsx'),
);
const UpdateProduct = React.lazy(() =>
  import('./pages/Product/UpdateProduct.jsx'),
);
const ProductDetail = React.lazy(() =>
  import('./pages/Product/ProductDetail.jsx'),
);
const ProductPayment = React.lazy(() =>
  import('./pages/Product/ProductPayment.jsx'),
);
const SalesManagement = React.lazy(() =>
  import('./components/MyPage/SalesManagement.jsx'),
);
const EmailVerification = React.lazy(() =>
  import('./pages/Auth/EmailVerification.jsx'),
);
const PurchaseManagement = React.lazy(() =>
  import('./components/MyPage/PurchaseManagement.jsx'),
);
const SalesDetailManagement = React.lazy(() =>
  import('./components/MyPage/SalesDetailManagement.jsx'),
);

function App() {
  const token = useSelector(state => state.auth.token);
  const { ToastWrapper } = useToastAlert();

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
        <Route path="/login/callback" element={<KakaoRedirect />} />
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
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            {ToastWrapper('top-center')}
            {routes}
          </Suspense>
        </main>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
