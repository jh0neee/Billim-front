import format from 'date-fns/format';
import exampleImage from './asset/image/exampleImage.jpg';

export const CategoryList = [
  { id: 1, name: 'living' },
  { id: 2, name: 'apparel' },
  { id: 3, name: 'sporting' },
  { id: 4, name: 'electronic' },
];

export const TradeMethod = [
  { id: 1, name: 'DIRECT' },
  { id: 2, name: 'DELIVERY' },
  { id: 3, name: 'ALL' },
];

export const Domain = [
  { id: 1, name: 'naver.com' },
  { id: 2, name: 'gmail.com' },
  { id: 3, name: 'daum.net' },
  { id: 4, name: 'nate.com' },
  { id: 5, name: 'hanmail.net' },
];

export const productItems = [
  {
    productId: 10,
    imageUrls: [`${exampleImage}`],
    productName: '상품 A',
    categoryName: 'living',
    starRating: 5.0,
    price: 15000,
    likeCount: 0,
    trade: '직거래',
    description: '상품 A에 관한 설명입니다.',
  },
  {
    productId: 11,
    imageUrls: [`${exampleImage}`],
    productName: '상품 B',
    categoryName: 'sporting',
    starRating: 4.5,
    price: 10000,
    likeCount: 0,
    trade: '택배',
    description: '상품 B에 관한 설명입니다.',
  },
  {
    productId: 12,
    imageUrls: [`${exampleImage}`],
    productName: '상품 C',
    categoryName: 'living',
    starRating: 4.5,
    price: 56000,
    likeCount: 0,
    trade: '둘 다 가능',
    description: '상품 C에 관한 설명입니다.',
  },
  {
    productId: 13,
    imageUrls: [`${exampleImage}`],
    productName: '상품 D',
    categoryName: 'apparel',
    starRating: 5.0,
    price: 43000,
    likeCount: 0,
    description: '상품 D에 관한 설명입니다.',
  },
  {
    productId: 14,
    imageUrls: [`${exampleImage}`],
    productName: '상품 E',
    categoryName: 'sporting',
    starRating: 4.3,
    price: 11000,
    likeCount: 0,
    description: '상품 E에 관한 설명입니다.',
  },
  {
    productId: 15,
    imageUrls: [`${exampleImage}`],
    productName: '상품 F',
    categoryName: 'living',
    starRating: 5.0,
    price: 5000,
    likeCount: 0,
    description: '상품 F에 관한 설명입니다.',
  },
  {
    productId: 16,
    imageUrls: [`${exampleImage}`],
    productName: '상품 G',
    categoryName: 'apparel',
    starRating: 4.3,
    price: 10000,
    likeCount: 0,
    description: '상품 G에 관한 설명입니다.',
  },
  {
    productId: 17,
    imageUrls: [`${exampleImage}`],
    productName: '상품 H',
    categoryName: 'sporting',
    starRating: 3.8,
    price: 32000,
    likeCount: 0,
    description: '상품 H에 관한 설명입니다.',
  },
  {
    productId: 18,
    imageUrls: [`${exampleImage}`],
    productName: '상품 I',
    categoryName: 'electronic',
    starRating: 4.5,
    price: 78000,
    likeCount: 0,
    description: '상품 I에 관한 설명입니다.',
  },
  {
    productId: 19,
    imageUrls: [`${exampleImage}`],
    productName: '상품 J',
    categoryName: 'living',
    starRating: 5.0,
    price: 15000,
    likeCount: 0,
    description: '상품 J에 관한 설명입니다.',
  },
  {
    productId: 20,
    imageUrls: [`${exampleImage}`],
    productName: '상품 K',
    categoryName: 'electronic',
    starRating: 3.5,
    price: 112000,
    likeCount: 0,
    description: '상품 K에 관한 설명입니다.',
  },
  {
    productId: 21,
    imageUrls: [`${exampleImage}`],
    productName: '상품 AB',
    categoryName: 'living',
    starRating: 5.0,
    price: 15000,
    likeCount: 0,
    trade: '직거래',
    description: '상품 A에 관한 설명입니다.',
  },
  {
    productId: 22,
    imageUrls: [`${exampleImage}`],
    productName: '상품 BC',
    categoryName: 'sporting',
    starRating: 4.5,
    price: 10000,
    likeCount: 0,
    trade: '택배',
    description: '상품 B에 관한 설명입니다.',
  },
  {
    productId: 23,
    imageUrls: [`${exampleImage}`],
    productName: '상품 CD',
    categoryName: 'living',
    starRating: 4.5,
    price: 56000,
    likeCount: 0,
    trade: '둘 다 가능',
    description: '상품 C에 관한 설명입니다.',
  },
  {
    productId: 24,
    imageUrls: [`${exampleImage}`],
    productName: '상품 DE',
    categoryName: 'apparel',
    starRating: 5.0,
    price: 43000,
    likeCount: 0,
    description: '상품 D에 관한 설명입니다.',
  },
  {
    productId: 25,
    imageUrls: [`${exampleImage}`],
    productName: '상품 EF',
    categoryName: 'sporting',
    starRating: 4.3,
    price: 11000,
    likeCount: 0,
    description: '상품 E에 관한 설명입니다.',
  },
  {
    productId: 26,
    imageUrls: [`${exampleImage}`],
    productName: '상품 FG',
    categoryName: 'living',
    starRating: 5.0,
    price: 5000,
    likeCount: 0,
    description: '상품 F에 관한 설명입니다.',
  },
  {
    productId: 27,
    imageUrls: [`${exampleImage}`],
    productName: '상품 GH',
    categoryName: 'apparel',
    starRating: 4.3,
    price: 10000,
    likeCount: 0,
    description: '상품 G에 관한 설명입니다.',
  },
  {
    productId: 28,
    imageUrls: [`${exampleImage}`],
    productName: '상품 HI',
    categoryName: 'sporting',
    starRating: 3.8,
    price: 32000,
    likeCount: 0,
    description: '상품 H에 관한 설명입니다.',
  },
  {
    productId: 29,
    imageUrls: [`${exampleImage}`],
    productName: '상품 IJ',
    categoryName: 'electronic',
    starRating: 4.5,
    price: 78000,
    likeCount: 0,
    description: '상품 I에 관한 설명입니다.',
  },
  {
    productId: 30,
    imageUrls: [`${exampleImage}`],
    productName: '상품 JK',
    categoryName: 'living',
    starRating: 5.0,
    price: 15000,
    likeCount: 0,
    description: '상품 J에 관한 설명입니다.',
  },
  {
    productId: 31,
    imageUrls: [`${exampleImage}`],
    productName: '상품 KL',
    categoryName: 'electronic',
    starRating: 3.5,
    price: 112000,
    likeCount: 0,
    description: '상품 K에 관한 설명입니다.',
  },
];

export const review = [
  {
    id: '감자',
    name: '상품A',
    amount: 10000,
    username: '사과',
    date: format(new Date(), 'yyyy-MM-dd'),
    isReview: true,
    review: '아주 만족합니다.',
  },
  {
    id: 2,
    username: '감자',
    name: '상품B',
    amount: 12000,
    date: format(new Date(), 'yyyy-MM-dd'),
    isReview: false,
    review: '별로였어요.',
  },
  {
    id: 3,
    username: '고구마',
    name: '상품C',
    amount: 10000,
    date: format(new Date(), 'yyyy-MM-dd'),
    isReview: true,
    review: '좋아요~',
  },
  {
    id: 4,
    username: '감자씨',
    name: '상품D',
    amount: 8000,
    date: format(new Date(), 'yyyy-MM-dd'),
    isReview: false,
    review: '나쁘지 않습니다.',
  },
  {
    id: 5,
    username: 'DDAbc',
    name: '상품E',
    amount: 50000,
    date: format(new Date(), 'yyyy-MM-dd'),
    isReview: false,
    review: '만족입니다!!',
  },
  {
    id: 6,
    username: 'apple',
    name: '상품F',
    amount: 2000,
    date: format(new Date(), 'yyyy-MM-dd'),
    isReview: true,
    review: '최고!',
  },
  {
    id: 7,
    username: '사과는 맛있어',
    name: '상품G',
    amount: 34000,
    date: format(new Date(), 'yyyy-MM-dd'),
    isReview: true,
    review: '다음에 또 이용하고 싶어요~',
  },
];

export const purchasedProduct = [
  {
    id: 1,
    status: '사용중',
    name: '상품A',
    amount: 10000,
    date: format(new Date(), 'yyyy-MM-dd HH:ss'),
    seller: '감자',
  },
  {
    id: 2,
    status: '예약완료',
    name: '상품B',
    amount: 5000,
    date: format(new Date(), 'yyyy-MM-dd HH:ss'),
    seller: '고구마',
  },
  {
    id: 3,
    status: '취소',
    name: '상품C',
    amount: 18000,
    date: format(new Date(), 'yyyy-MM-dd HH:ss'),
    seller: '케일',
  },
  {
    id: 4,
    status: '사용완료',
    name: '상품D',
    amount: 30000,
    date: format(new Date(), 'yyyy-MM-dd HH:ss'),
    seller: '사과',
  },
];

export const salesProduct = [
  {
    id: 1,
    status: '대여중',
    trade: '택배',
    date:
      format(new Date(), 'yyyy-MM-dd') +
      ' ~ ' +
      format(new Date(), 'yyyy-MM-dd'),
    customer: '감자',
  },
  {
    id: 2,
    status: '대기중',
    trade: '직거래',
    date:
      format(new Date(), 'yyyy-MM-dd') +
      ' ~ ' +
      format(new Date(), 'yyyy-MM-dd'),
    customer: '고구마',
  },
  {
    id: 3,
    status: '취소',
    trade: '직거래',
    date:
      format(new Date(), 'yyyy-MM-dd') +
      ' ~ ' +
      format(new Date(), 'yyyy-MM-dd'),
    customer: '케일',
  },
  {
    id: 4,
    status: '완료',
    trade: '택배',
    date:
      format(new Date(), 'yyyy-MM-dd') +
      ' ~ ' +
      format(new Date(), 'yyyy-MM-dd'),
    customer: '사과',
  },
  {
    id: 5,
    status: '대기중',
    trade: '택배',
    date:
      format(new Date(), 'yyyy-MM-dd') +
      ' ~ ' +
      format(new Date(), 'yyyy-MM-dd'),
    customer: '미나리',
  },
  {
    id: 6,
    status: '대기중',
    trade: '직거래',
    date:
      format(new Date(), 'yyyy-MM-dd') +
      ' ~ ' +
      format(new Date(), 'yyyy-MM-dd'),
    customer: '시금치',
  },
];

export const coupons = [
  {
    id: 1,
    value: '9% 할인 쿠폰',
    discount: 9,
    date: format(
      new Date(new Date().setDate(new Date().getDate() + 1)),
      'yyyy-MM-dd',
    ),
  },
  {
    id: 2,
    value: '19% 할인 쿠폰',
    discount: 19,
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: 3,
    value: '5% 할인 쿠폰',
    discount: 5,
    date: format(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      'yyyy-MM-dd',
    ),
  },
];

export const user = [
  {
    id: 'u1',
    name: '고구마',
    nickname: '고구마맛탕',
    point: 5000,
    level: 'BRONZE',
    postcode: '12345',
    address: '서울 강남구 선릉로 12길 34',
    address_detail: 'OO아파트 123동',
    address_legal: 'OO동',
    date: format(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      'yyyy-MM-dd',
    ),
  },
];
