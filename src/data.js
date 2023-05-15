import format from "date-fns/format";

export const productItems = [
  {
    id: 1,
    name: "상품 A",
    category: "living",
    scope: "5.0",
    amount: 15000,
    likeCount: 0,
  },
  {
    id: 2,
    name: "상품 B",
    category: "sporting",
    scope: "4.5",
    amount: 10000,
    likeCount: 0,
  },
  {
    id: 3,
    name: "상품 C",
    category: "living",
    scope: "4.5",
    amount: 56000,
    likeCount: 0,
  },
  {
    id: 4,
    name: "상품 D",
    category: "apparel",
    scope: "5.0",
    amount: 43000,
    likeCount: 0,
  },
  {
    id: 5,
    name: "상품 E",
    category: "sporting",
    scope: "4.3",
    amount: 11000,
    likeCount: 0,
  },
  {
    id: 6,
    name: "상품 F",
    category: "living",
    scope: "5.0",
    amount: 5000,
    likeCount: 0,
  },
  {
    id: 7,
    name: "상품 G",
    category: "apparel",
    scope: "4.3",
    amount: 10000,
    likeCount: 0,
  },
  {
    id: 8,
    name: "상품 H",
    category: "sporting",
    scope: "3.8",
    amount: 32000,
    likeCount: 0,
  },
  {
    id: 9,
    name: "상품 I",
    category: "electronic",
    scope: "4.5",
    amount: 78000,
    likeCount: 0,
  },
  {
    id: 10,
    name: "상품 J",
    category: "living",
    scope: "5.0",
    amount: 15000,
    likeCount: 0,
  },
  {
    id: 11,
    name: "상품 K",
    category: "electronic",
    scope: "3.5",
    amount: 112000,
    likeCount: 0,
  },
];

export const review = [
  {
    id: 1,
    username: "A",
    date: format(new Date(), "yyyy-MM-dd"),
    review: "아주 만족합니다.",
  },
  {
    id: 2,
    username: "B",
    date: format(new Date(), "yyyy-MM-dd"),
    review: "별로였어요.",
  },
  {
    id: 3,
    username: "말랭이",
    date: format(new Date(), "yyyy-MM-dd"),
    review:
      "좋아요~",
  },
  {
    id: 4,
    username: "감자씨",
    date: format(new Date(), "yyyy-MM-dd"),
    review: "나쁘지 않습니다.",
  },
  {
    id: 5,
    username: "DDAbc",
    date: format(new Date(), "yyyy-MM-dd"),
    review: "만족입니다!!",
  },
  {
    id: 6,
    username: "apple",
    date: format(new Date(), "yyyy-MM-dd"),
    review: "최고!",
  },
  {
    id: 7,
    username: "사과는 맛있어",
    date: format(new Date(), "yyyy-MM-dd"),
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