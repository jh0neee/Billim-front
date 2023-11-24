import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import theme from '../styles/theme';
import Carousel from '../components/UI/Carousel';
import ErrorModal from '../util/ErrorModal';
import { useResize } from '../hooks/useResize';
import { useLoadingError } from '../hooks/useLoadingError';
import { SectionsContainer, Section } from 'react-fullpage';

const ContentBox = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;

  @media ${theme.desktop} {
    max-width: 1440px;
  }
  @media ${theme.laptop} {
    max-width: 768px;
  }
  @media ${theme.tablet} {
    max-width: 480px;
  }
  @media ${theme.mobile} {
    max-width: 375px;
    margin: 0 auto;
  }
`;

const CarouselTitle = styled.p`
  text-align: center;
  font-family: 'TRoundWind';
  font-size: 2.3rem;
  font-weight: 600;
`;

const CarouselText = styled.p`
  color: #868e96;
  text-align: center;
  font-family: 'SCDream';
  font-size: 1.4rem;
  padding: 2rem;
`;

const SectionBox = styled(Section)`
  display: flex !important;
  align-items: center;
`;

const SectionImage = styled.img`
  max-width: 100%;
  max-height: 99%;
  object-fit: contain;
`;

const ProductSection = styled(Section)`
  display: flex !important;
  flex-direction: column;
  justify-content: center;
`;

const Home = () => {
  const url = process.env.REACT_APP_URL;
  const mainUrl = process.env.PUBLIC_URL + '/image';
  const [recentItems, setResentItems] = useState([]);
  const { error, clearError, errorHandler } = useLoadingError();

  useEffect(() => {
    axios
      .get(`${url}/product/list/most/popular`)
      .then(response => setResentItems(response.data))
      .catch(err => errorHandler(err));
  }, []);

  const widthByMobile = useResize(768, '<', true);
  const widthByLaptop = useResize(768, '<=', 1440);
  const widthByDesktop = useResize(1440, '>', true);

  let imagePath = [];
  if (widthByMobile) {
    imagePath = [
      `${mainUrl}/MoTa1.png`,
      `${mainUrl}/MoTa2.png`,
      `${mainUrl}/MoTa3.png`,
      `${mainUrl}/MoTa4.png`,
    ];
  } else if (widthByLaptop) {
    imagePath = [
      `${mainUrl}/Laptop1.png`,
      `${mainUrl}/Laptop2.png`,
      `${mainUrl}/Laptop3.png`,
      `${mainUrl}/Laptop4.png`,
    ];
  } else if (widthByDesktop) {
    imagePath = [
      `${mainUrl}/Desktop1.png`,
      `${mainUrl}/Desktop2.png`,
      `${mainUrl}/Desktop3.png`,
      `${mainUrl}/Desktop4.png`,
    ];
  }

  const altText = [
    'Billim 물건의 가치를 나누며, 더 많은 것을 경험하세요!',
    '빌림, 공유경험의 시작. 새로운 세계로 여러분들을 초대합니다! 물건을 빌려주고 대여하는 새로운 소비문화를 제공합니다.',
    '더 가까운 공유, 더 편리한 대여! 채팅을 통해 공유/대여자와 실시간 대화를 나눠보세요!',
    '직관적인 대여생활. 대여기간 한 눈에 확인하고, 카카오페이 간편결제까지!',
  ];

  const settings = {
    anchors: [
      'sectionOne',
      'sectionTwo',
      'sectionThree',
      'sectionFour',
      'sectionFive',
    ],
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <SectionsContainer {...settings}>
        <ContentBox>
          {imagePath.map((path, index) => {
            return (
              <SectionBox key={index}>
                <SectionImage
                  src={path}
                  alt={`[메인${index}] ${altText[index]}`}
                  width="100%"
                />
              </SectionBox>
            );
          })}
          <ProductSection>
            <div>
              <CarouselTitle>인기 상품</CarouselTitle>
              {recentItems.length === 0 ? (
                <CarouselText>최근 내역이 없습니다.</CarouselText>
              ) : (
                <Carousel items={recentItems} />
              )}
            </div>
          </ProductSection>
        </ContentBox>
      </SectionsContainer>
    </React.Fragment>
  );
};

export default Home;
