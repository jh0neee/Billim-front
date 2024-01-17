# Billim
<img width="600" src="https://github.com/HyunjeongJang/Billim-server/assets/113197284/fd2d90ed-c350-4317-8915-31fe33ae8f61">

- URL : https://billim.store
- Test ID : test@gmail.com
- Test PW : test123!!

# 기획
1:1 물건 대여 및 결제 시스템을 제공하는 웹 사이트

<br>

# 프로젝트 구조

<img width="1426" alt="스크린샷 2023-11-08 오전 10 30 34" src="https://github.com/HyunjeongJang/Billim-server/assets/113197284/2d740b7a-d049-4194-a26f-b4d080fe5bda">

<details>
  <summary><strong>폴더 구조</strong></summary>

  ```
 📦src
  ┣ 📂asset  // 이미지, 폰트 폴더
  ┃ ┣ 📂font
  ┃ ┗ 📂image
  ┣ 📂components  // 페이지 관련 컴포넌트
  ┃ ┣ 📂Auth
  ┃ ┣ 📂Chat
  ┃ ┃ ┣ 📂styles  // Chat 공통 Style
  ┃ ┣ 📂MyPage
  ┃ ┃ ┣ 📂styles  // MyPage 공통 Style
  ┃ ┣ 📂Navigation
  ┃ ┣ 📂Product
  ┃ ┃ ┣ 📂styles  // Product 공통 Style
  ┃ ┗ 📂UI  // 컴포넌트 공통 UI
  ┣ 📂hooks  // customHook
  ┣ 📂pages  // 페이지 컴포넌트
  ┃ ┣ 📂Auth
  ┃ ┣ 📂Product
  ┃ ┣ 📂styles  // 페이지 컴포넌트 공통 Style
  ┃ ┣ 📜Chat.jsx
  ┃ ┣ 📜Home.jsx
  ┃ ┣ 📜MyPage.jsx
  ┃ ┗ 📜NewProduct.jsx
  ┣ 📂store  // redux, reducer
  ┃ ┣ 📂reducer
  ┣ 📂styles  // 공통 style, css
  ┣ 📂util 
  ┣ 📜App.js
  ┣ 📜data.js
 ```
</details>

<br>

# 구현 기능
 
 ### `메인페이지`
  | 메인화면 | 인기상품 |
  |:---:|:---:|
  |![main](https://github.com/jh0neee/Billim-front/assets/108544145/ddd56e8f-bee1-4473-b2d7-532ed05252b4)|![popular](https://github.com/jh0neee/Billim-front/assets/108544145/97fbe419-e947-4c48-8175-a055b651599f)|
  | OnePage 슬라이드 스크롤로 페이지 단위로 스크롤 되는 메인화면을 만들고 싶어서 react-fullpage 라이브러리로 스크롤 효과를 적용하였습니다. | 인기상품은 스크롤 제일 마지막에 위치하도록 했으며, 가로로 슬라이딩을 적용하고 싶어 react-slick 라이브러리를 사용해서 Carousel 효과를 적용하였습니다.  |

  <br>

 ### `로그인/회원가입`
  | 로그인 | 이메일 인증 |
  |:---:|:---:|
  |![login](https://github.com/jh0neee/Billim-front/assets/108544145/f55d437f-2859-4d10-966f-eceed74e9be2)|![emailverify](https://github.com/jh0neee/Billim-front/assets/108544145/b2a66eb6-4354-4137-af53-e4e193d7a4ee)|
  | 일반 로그인과 SNS(카카오톡) 로그인 기능을 구현하였습니다. <br> 카카오 로그인 버튼은 디자인 가이드에 따라 적용하였습니다. | 회원가입 전 해당 이메일로 인증메일을 보내 인증 링크를 전송하도록 하였습니다. 이메일 주소의 형식이 유효하지 않거나 가입된 이메일일 경우 하단에 경고 문구가 표시됩니다. |
  | **회원가입** | **로그아웃** |
  |![signup](https://github.com/jh0neee/Billim-front/assets/108544145/a7d2b30e-fbaf-45d5-b2ca-23c8e31e4c50)|![logout](https://github.com/jh0neee/Billim-front/assets/108544145/7755b5b8-534d-4e68-ad2a-e1e5b4c57a1d)|
  | 회원가입 페이지에서 닉네임은 중복 확인 절차를 거치고, 주소는 Daum 우편번호 API로 도로명주소까지 받아오도록 구현했습니다.  | '우측 상단 프로필 - 로그아웃'을 누르면 로그아웃 할 수 있게 하였습니다. <br> 어디서든 접근할 수 있도록 헤더에 위치시켰습니다. |
  - 모든 입력창은 입력 후 바로 유효성 검사가 진행되며 통과하지 못한 경우 입력창 하단에 각 경고문구가 표시됩니다.
  - 모든 유효성 검사가 통과된 후 버튼이 활성화되며, 버튼을 클릭하면 다음 페이지 또는 회원가입이 끝나면 로그인 화면으로 넘어갑니다.
  - 비밀번호는 영문 대소문자, 숫자, 특수문자를 포함하여 8 ~ 16자 이내로 유효성 검사를 진행하도록 하였습니다.
<br>

 <!-- ### `회원탈퇴`
  | 일반 | 카카오 |
  |:---:|:---:|
  |![]|![]|
  | 현재 비밀번호를 확인 후 탈퇴 유의사항 동의를 받고 탈퇴 처리되도록 하였습니다. |  |
  - 일반과 카카오의 회원탈퇴 Type을 나누어 적용하였습니다. (GENERAL/KAKAO) -->

<br>

 ### `상품`
  | 상품 카테고리 & 키워드 검색 | 상품 목록 |
  |:---:|:---:|
  |![category](https://github.com/jh0neee/Billim-front/assets/108544145/cd896c7b-da99-4e1c-86d8-467cfa58d2a3)|![productList](https://github.com/jh0neee/Billim-front/assets/108544145/bcd317c9-4821-4c7f-8d17-460ce8341fb0)|
  | 상품에 등록된 카테고리 별로 상품을 확인할 수 있고, 키워드 검색을 하면 전체 목록에서 키워드 별로 검색된 상품을 반환해줍니다. | 등록 순으로 상품이 나열되고 한페이지에 최대 20개의 상품이 보여집니다. <br> Desktop ~ Mobile에 따라 한 줄의 상품 개수가 4개 ~ 1개로 반응형 작업을 완료하였습니다. |
  | **상품 등록/수정** | **상품 삭제** |
  |![newUpdate](https://github.com/jh0neee/Billim-front/assets/108544145/c0719eb5-23fa-48d2-a0fd-c780f9b2a174)|![delete](https://github.com/jh0neee/Billim-front/assets/108544145/3bb7e989-f43e-47ac-ae1a-c8fe0f6f5c56)|
  | 등록 버튼은 상품 목록 페이지 상단과 판매관리(마이페이지)에서 찾을 수 있고, <br> 수정 버튼은 상세페이지에서 상품등록자에게만 활성화 됩니다. <br> 사진은 최대 5개까지 추가할 수 있습니다. | 삭제버튼은 상세페이지에서 상품 등록자에게만 활성화 됩니다. |

<br>

### `주문/결제`
|![pay](https://github.com/jh0neee/Billim-front/assets/108544145/b1bd3b88-cd4e-45db-a667-e898953cc763)|
|:---:|
- 캘린더에서 대여기간을 선택할 수 있습니다.
- 이미 선택된 날짜 또는 지난 날짜는 비활성화 되도록 설정했습니다.
- 결제 및 취소는 카카오페이(portone API) 테스트 결제로 연동하였습니다.

<br>

### `채팅`
|![chat](https://github.com/jh0neee/Billim-front/assets/108544145/8ab8cc84-6c6c-4197-8fd7-266412162199)|
|:---:|
- 판매/구매자 간 1:1 채팅 시스템으로, 실시간으로 읽음 처리가 가능합니다.
- 채팅 목록에서 아직 읽지 않은 채팅은 개수 뱃지가 달립니다.
- 우측 상단의 나가기 버튼을 클릭해 채팅방을 나갈 수 있습니다.
- 우측 상단의 상품 정보를 클릭하면 상품 상세페이지로 이동할 수 있습니다.

<br>

### `마이페이지`
  | 구매관리 | 판매관리 |
  |:---:|:---:|
  |![purchase](https://github.com/jh0neee/Billim-front/assets/108544145/4a82a700-086d-4bfd-815d-017330e2c28b)|![sales](https://github.com/jh0neee/Billim-front/assets/108544145/39426a19-71f2-4bd1-ae51-4e3b14112456)|
  | 구매한 상품을 보여줍니다. <br> 각 구매 상품에 대해 대여기간을 확인할 수 있습니다. | 등록한 상품을 보여줍니다. <br> 각 상품을 클릭하면 대여한 회원과 예약한 회원, 취소 또는 대여 완료한 회원의 기본정보와 대여기간을 확인할 수 있습니다. |
  | **관심상품** | **후기** |
  |![favorite](https://github.com/jh0neee/Billim-front/assets/108544145/53a10bd4-5f2a-4095-ac68-12232fe9dbf4)|![review](https://github.com/jh0neee/Billim-front/assets/108544145/31a83531-f9b0-4e2f-8df3-78c7defbda2a)|
  |관심으로 등록한 상품을 볼 수 있습니다. <br> 상품 이미지 우측 상단의 아이콘을 누르면 관심상품 목록에서 바로 삭제가 가능합니다. | 리뷰를 등록할 수 있는 상품이 보여집니다. <br> 바로 리뷰를 등록할 수 있으며 작성된 리뷰는 후기 페이지 또는 상품의 상세페이지 하단에서 볼 수 있습니다. |
  | **회원정보수정** |
  |![memberInfo](https://github.com/jh0neee/Billim-front/assets/108544145/81dcd833-a773-424b-9ff2-d74ba80986bd)|
  | 본인의 정보를 수정 가능합니다. <br> 프로필 수정, 닉네임 변경, 비밀번호 재설정, 주소 변경 할 수 있습니다. |
  - 상단에 본인의 정보 및 적립금과 쿠폰을 확인할 수 있습니다.
  - 예약완료된 상품에 한해 구매/판매자에 관계없이 예약취소를 할 수 있습니다.
  - 대여한/대여하는 상품은 채팅 버튼을 통해 구매/판매자와의 채팅을 할 수 있습니다.

<br>

# 문제해결과정
<details>
  <summary><strong>토큰 갱신 처리</strong></summary>
 
<br>

- **재발급 받을 때 무한 로딩 이슈**
  - 토큰 갱신 기능 및 에러 처리를 custom Hook으로 추출하였습니다.
  - 각 컴포넌트에서 axios 요청 실패 시 tokenErrorHandler를 호출하도록 하여 토큰 갱신 또는 로그아웃을 할 수 있게 처리하였습니다.

<br>

- **에러 핸들링 무한 루프 이슈**
  - 업데이트 전 로직에서는 에러가 발생할 때마다 토큰 갱신을 시도하도록 했는데 여러 에러 상황에 대해 매번 토큰을 갱신하려고 동작하여 일관된 처리가 어렵다는 문제와 더불어 에러가 반복해서 발생하는 문제가 있었습니다.
  - 응답 interceptor에서 응답 에러 직전에 token 갱신 로직이 실행되게 설정을 해두었는데, 이쪽의 에러 핸들링 로직이 반복적으로 호출되었습니다.
  - 이를 방지하기 위해서 interceptor 로직을 분리하고 토큰 갱신 요청을 연속으로 호출하지 않기 위해서 debounce를 활용하였습니다.

<br>

- **업데이트된 토큰 갱신 및 에러 핸들링 로직**
  - 현재는 refresh token 관련 로직을 custom hook 형태로 여러 컴포넌트에서 사용가능하도록 재사용성을 높이고, token error 처리 로직을 모듈화하여 가독성과 유지보수성을 높였으며, 토큰 갱신 요청이 발생할 때마다 자동으로 수행하도록 했습니다. 
  - interceptor를 사용하여 토큰 갱신에 대한 요청을 useTokenRefresher hook에서 일관적으로 관리되도록 설정하였습니다.
  - refresh 토큰 만료 중복 요청 이슈 발생하여 디바운싱을 활용해 중복 호출을 방지했습니다.

<br>

  ```
  useTokenRefresher.js

  ...
  
  export const useTokenRefresher = auth => {
    ...
  
    // 토큰 갱신 함수
    const refreshTokenHandler = debounce(() => {
      const refreshTokenData = localStorage.getItem('userData');
  
      if (refreshTokenData) {
        // refresh token 가져오기
        const { refresh } = JSON.parse(refreshTokenData);
  
        if (isRefresh) { 
          return;
        }
  
        setIsRefresh(true); 
  
        // 토큰 재발급 요청
        axios
          .post(
            `${url}/auth/reIssue/token`,
            { refreshToken: refresh },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .then(response => { //  요청 성공 시 토큰 재발급하여 로그인 요청
            const { memberId, accessToken, newRefreshToken } = response.data;
            auth.login(accessToken, newRefreshToken, memberId);
            setIsRefresh(false);
            return response;
          })
          .catch(err => { //  리프레시 관련 에러 시 로그아웃 
            if (
              err.response.data.code === 'MISMATCH_REFRESH_TOKEN' ||
              err.response.data.code === 'EXPIRED_REFRESH_TOKEN' ||
              err.response.data.code === 'INVALID_REFRESH_TOKEN'
            ) {
              auth.logout(true);
            }
            setIsRefresh(false);
          });
      }
    }, 500);
  
    // 토큰 에러 처리 함수
    const tokenErrorHandler = err => {
      if (err.response.data.error === 'EXPIRED_TOKEN') {
        // 토큰 만료 시 refreshTokenHandelr 호출
        refreshTokenHandler();
      } else {
        // 그 외 로그아웃 처리
        auth.logout(true);
      }
    };
  
    // axios 응답 인터셉터 설정
    // axios 응답 받아올 때 실행 
    refreshAPI.interceptors.response.use(
      response => response,
      error => {
        // 에러 발생 시 tokenErrorHandler 호출
        if (error.response && error.response.status === 401) {
          return tokenErrorHandler(error);
        } else {
          return Promise.reject(error);
        }
      },
    );

   ...
  
  };

  ```

</details>

<br>

<details>
  <summary><strong>카테고리-검색어 분리</strong></summary>
 
<br>

- **카테고리와 검색어가 연결되어 검색되는 이슈**
  - 서버에 쿼리스트링으로 카테고리, 검색 키워드, 페이지네이션을 연결하여 전달했습니다.
  - 검색했을 때 카테고리와 키워드가 같이 넘어와 검색되어 카테고리 내에서만 특정 상품이 검색되는 문제가 발생하였습니다.

<br>

  ```
  let requestUrl = `${url}/product/list/search?page=${currentPage}`;

  if (searchValue) {
    requestUrl += `&category&keyword=${searchValue}`;
  } else {
    requestUrl += `&category=${category}&keyword`;
  }
  ```
- 카테고리와 키워드를 별개로 넘겨주도록 설정했습니다.
- 전체 카테고리에서만 검색이 되도록 키워드만 보내고, 카테고리를 선택하면 선택한 카테고리만 보내도록 했습니다.
</details>

<br>

<details>
  <summary><strong>채팅 읽음 처리</strong></summary>

채팅목록을 구독하는 방식이기 때문에 채팅방을 나가야 웹소켓 연결이 해제가 됩니다.


- **채팅리스트 읽지 않은 메시지 뱃지가 갱신되지 않는 문제**
  ```
  // 기존
  
  setChatList(prevChatList => {
    return prevChatList.map(chat => {
      if (chat.chatRoomId === chatRoomId) {
        let updatedUnreadCount = chat.unreadCount;
  
        if (senderId === chat.receiverId) {
          updatedUnreadCount += 1;
        }
  
     // ...
  
  ```    
  - 읽음 처리가 기존의 unreadCount에서 1을 증가시키는 방식으로 업데이트됩니다.
  - 해당 메시지가 이미 읽혀져 있는 상태에서 새로운 메시지가 도착하면 읽음 상태가 초기화되는 문제가 발생합니다.

    <br>
    
  ```
  // 업데이트
  
  setChatList(prevChatList => {
    return prevChatList.map(chat => {
      if (chat.chatRoomId === chatRoomId) {
        let updatedUnreadCount = chat.updatedUnreadCount;
  
        if (senderId === chat.receiverId) {
          if (updatedUnreadCount === undefined) {
              updatedUnreadCount = chat.unreadCount + 1;
            } else if (updatedUnreadCount !== undefined && !read) {
              updatedUnreadCount += 1;
            } else {
              updatedUnreadCount = 0;
            }
          }
  
     // ...
  
  ```
  - 업데이트 후의 로직은 read의 값에 따라 updatedUnreadCount를 다르게 처리하도록 했습니다.
  - 메시지를 읽지 않은 경우에는 기존 unreadCount에 + 1을,
  - 한번 업데이트 이후 read가 false일 때 updatedUnreadCount에 + 1을,
  - 메시지를 다 읽은 상태에는 메시지 count를 0으로 초기화하도록 구성하였습니다.


<br>

- **채팅방 읽음 처리 이슈**
  - 유저 중 한 명이 뒤늦게 들어오거나 유저(본인)와 상대유저가 채팅방에 전부 들어와있을 때의 읽음처리가 매끄럽지 않은 문제가 발생하였습니다.
  - 유저와 상대 유저를 나누어 읽음 처리가 동작되도록 설정하였습니다.
  ```
  const renderMessages = () => {
      return messages.map((msg, index) => {
        let read;
  
        // 본인이 메시지를 보낸 경우
        if (msg.newMessage && !correctSender) {
          const unreadMessagesByRecipient = unreadMessages.filter(
            unread => unread.messageId === msg.messageId,
          );
  
          read = true;
  
          unreadMessagesByRecipient.forEach(() => {
            read = readStatus;
          });
  
        // 상대가 메시지를 보낸 경우
        } else if (msg.newMessage && correctSender) {
          read = readMessage(msg);
        }
  
        // ...
  
      });
    };
  ```
  - 유저(본인)가 메시지를 보낸 경우, 자신의 채팅방에서 모두 읽음 처리되게 합니다.
  - 상대 유저가 메시지를 보낸 경우, readMessage()함수를 호출하여 메시지 읽음 처리합니다.


<br>

- **읽음 처리 무한 요청 이슈**
  - 유저와 상대유저가 모두 채팅방에 들어와있을 때 읽음 처리에 대해 무한 요청이 들어오는 문제가 발생하였습니다. 
  - for ... in을 사용하다보니 계속해서 요청이 들어오는 상황이었고, break를 걸어 read 상태가 true일 때 루프를 빠져나가도록 설정하였습니다.
  ```
  const readMessage = msg => {
      // ...
  
     for (const key in inChatRoom) {
        if (inChatRoom[key] && Number(key) === msg.chatRoomId) {
          // 추가) read 상태가 true면 루프 종료
          if (readStatus) {
            read = true;
            break;
          }
  
          axios.post(
            `${url}/api/chat/message/read`,
            {
              chatRoomId: msg.chatRoomId,
              messageId: msg.messageId,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`,
              },
            },
          );
  
          // read를 true로 설정 후 루프 종료
          // return (read = true);
          read = true;
          break;
        } else {
          read = false;
        }
      }
  
    // ...
  
  ```
</details>

<br>

<!-- # Jenkins CI/CD 파이프라인 구축
<img width="1728" alt="젠킨스" src="https://github.com/HyunjeongJang/Billim-server/assets/113197284/55d05056-284f-4350-bf14-54ba0d18a7ad"> -->

# Swagger API 명세서
<img width="1292" alt="스크린샷 스웨거" src="https://github.com/HyunjeongJang/Billim-server/assets/113197284/62344be5-f669-4563-b1ca-957306ab2379">

<br>


# 참여
|Back-End|Back-End|Front-End|
|:---:|:---:|:---:|
|장현정 | 염서학 | 심지현 |
| <a href="https://github.com/HyunjeongJang">@HyunjeongJang</a> | <a href="https://github.com/YEOMCODING">@YEOMCODING</a> | <a href="https://github.com/jh0neee"> @jh0neee</a> |

<br>
