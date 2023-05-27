import format from "date-fns/format";

export const CategoryList = [
  { id: 1, value: "living" },
  { id: 2, value: "apparel" },
  { id: 3, value: "sporting" },
  { id: 4, value: "electronic" },
];

export const TradeMethod = [
  { id: 1, value: "직거래" },
  { id: 2, value: "택배" },
];

export const productItems = [
  {
    id: '1',
    name: "상품 A",
    category: "living",
    scope: "5.0",
    amount: 15000,
    likeCount: 0,
    trade: '직거래',
    description: '상품 A에 관한 설명입니다.'
  },
  {
    id: '2',
    name: "상품 B",
    category: "sporting",
    scope: "4.5",
    amount: 10000,
    likeCount: 0,
    trade:'택배',
    description: '상품 B에 관한 설명입니다.'
  },
  {
    id: '3',
    name: "상품 C",
    category: "living",
    scope: "4.5",
    amount: 56000,
    likeCount: 0,
    description: '상품 C에 관한 설명입니다.'
  },
  {
    id: '4',
    name: "상품 D",
    category: "apparel",
    scope: "5.0",
    amount: 43000,
    likeCount: 0,
    description: '상품 D에 관한 설명입니다.'
  },
  {
    id: '5',
    name: "상품 E",
    category: "sporting",
    scope: "4.3",
    amount: 11000,
    likeCount: 0,
    description: '상품 E에 관한 설명입니다.'
  },
  {
    id: '6',
    name: "상품 F",
    category: "living",
    scope: "5.0",
    amount: 5000,
    likeCount: 0,
    description: '상품 F에 관한 설명입니다.'
  },
  {
    id: '7',
    name: "상품 G",
    category: "apparel",
    scope: "4.3",
    amount: 10000,
    likeCount: 0,
    description: '상품 G에 관한 설명입니다.'
  },
  {
    id: '8',
    name: "상품 H",
    category: "sporting",
    scope: "3.8",
    amount: 32000,
    likeCount: 0,
    description: '상품 H에 관한 설명입니다.'
  },
  {
    id: '9',
    name: "상품 I",
    category: "electronic",
    scope: "4.5",
    amount: 78000,
    likeCount: 0,
    description: '상품 I에 관한 설명입니다.'
  },
  {
    id: '10',
    name: "상품 J",
    category: "living",
    scope: "5.0",
    amount: 15000,
    likeCount: 0,
    description: '상품 J에 관한 설명입니다.'
  },
  {
    id: '11',
    name: "상품 K",
    category: "electronic",
    scope: "3.5",
    amount: 112000,
    likeCount: 0,
    description: '상품 K에 관한 설명입니다.'
  },
];

export const review = [
  {
    id: '감자',
    name: '상품A',
    amount: 10000,
    username: "사과",
    date: format(new Date(), "yyyy-MM-dd"),
    isReview: true,
    review: "아주 만족합니다.",
  },
  {
    id: 2,
    username: "감자",
    name: '상품B',
    amount: 12000,
    date: format(new Date(), "yyyy-MM-dd"),
    isReview: false,
    review: "별로였어요.",
  },
  {
    id: 3,
    username: "고구마",
    name: '상품C',
    amount: 10000,
    date: format(new Date(), "yyyy-MM-dd"),
    isReview: true,
    review:
      "좋아요~",
  },
  {
    id: 4,
    username: "감자씨",
    name: '상품D',
    amount: 8000,
    date: format(new Date(), "yyyy-MM-dd"),
    isReview: false,
    review: "나쁘지 않습니다.",
  },
  {
    id: 5,
    username: "DDAbc",
    name: '상품E',
    amount: 50000,
    date: format(new Date(), "yyyy-MM-dd"),
    isReview: false,
    review: "만족입니다!!",
  },
  {
    id: 6,
    username: "apple",
    name: '상품F',
    amount: 2000,
    date: format(new Date(), "yyyy-MM-dd"),
    isReview: true,
    review: "최고!",
  },
  {
    id: 7,
    username: "사과는 맛있어",
    name: '상품G',
    amount: 34000,
    date: format(new Date(), "yyyy-MM-dd"),
    isReview: true,
    review: "다음에 또 이용하고 싶어요~",
  },
];


export const purchasedProduct = [
  {
    id: 1,
    status: '사용중',
    name: '상품A',
    amount: 10000,
    date: format(new Date(), "yyyy-MM-dd HH:ss"),
    seller: '감자',
  },
  {
    id: 2,
    status: '예약완료',
    name: '상품B',
    amount: 5000,
    date: format(new Date(), "yyyy-MM-dd HH:ss"),
    seller: '고구마',
  },
  {
    id: 3,
    status: '취소',
    name: '상품C',
    amount: 18000,
    date: format(new Date(), "yyyy-MM-dd HH:ss"),
    seller: '케일',
  },
  {
    id: 4,
    status: '사용완료',
    name: '상품D',
    amount: 30000,
    date: format(new Date(), "yyyy-MM-dd HH:ss"),
    seller: '사과',
  },
];

export const salesProduct = [
  {
    id: 1,
    status: '대여중',
    trade: '택배',
    date: format(new Date(), "yyyy-MM-dd") + ' ~ ' + format(new Date(), "yyyy-MM-dd"),
    customer: '감자',
  },
  {
    id: 2,
    status: '대기중',
    trade: '직거래',
    date: format(new Date(), "yyyy-MM-dd") + ' ~ ' + format(new Date(), "yyyy-MM-dd"),
    customer: '고구마',
  },
  {
    id: 3,
    status: '취소',
    trade: '직거래',
    date: format(new Date(), "yyyy-MM-dd") + ' ~ ' + format(new Date(), "yyyy-MM-dd"),
    customer: '케일',
  },
  {
    id: 4,
    status: '완료',
    trade: '택배',
    date: format(new Date(), "yyyy-MM-dd") + ' ~ ' + format(new Date(), "yyyy-MM-dd"),
    customer: '사과',
  },
  {
    id: 5,
    status: '대기중',
    trade: '택배',
    date: format(new Date(), "yyyy-MM-dd") + ' ~ ' + format(new Date(), "yyyy-MM-dd"),
    customer: '미나리',
  },
  {
    id: 6,
    status: '대기중',
    trade: '직거래',
    date: format(new Date(), "yyyy-MM-dd") + ' ~ ' + format(new Date(), "yyyy-MM-dd"),
    customer: '시금치',
  },
];

export const coupons = [
  {
    id: 1,
    item: '9% 할인 쿠폰',
    discount: 9,
    date: format(new Date(new Date().setDate(new Date().getDate() + 1)), "yyyy-MM-dd"),
  },
  {
    id: 2,
    item: '19% 할인 쿠폰',
    discount: 19,
    date: format(new Date(), "yyyy-MM-dd"),
  },
  {
    id: 3,
    item: '5% 할인 쿠폰',
    discount: 5,
    date: format(new Date(new Date().setDate(new Date().getDate() - 1)), "yyyy-MM-dd"),
  },
];