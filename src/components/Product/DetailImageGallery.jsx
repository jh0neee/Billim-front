import React from 'react';
import styled from 'styled-components';

import theme from '../../styles/theme';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useResize } from '../../hooks/useResize';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';

const DetailImage = styled.div`
  max-width: 778px;
  margin: 2rem auto;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;

  > img {
    border: 1px solid rgba(0, 0, 0, 0.06);
  }
`;

const SubImageBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 5px;
`;

const MainImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;

  &.resizeImage {
    border: 1px solid rgba(0, 0, 0, 0.06);
    object-fit: fill;
  }
`;

const SubImage = styled.img`
  display: block;
  margin: auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  max-width: 778px;
  height: 384px;
  margin: 2rem auto;

  .slick-list {
    width: 50%;
    height: 100%;
    margin: 0 auto;
    overflow-x: hidden;
  }

  .slick-slide div {
    height: 384px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }

  .slick-dots {
    bottom: 2px;
  }

  @media (max-width: 1110px) {
    max-width: 100%;
    .slick-list {
      width: 70%;
    }
  }
  @media (max-width: 925px) {
    .slick-list {
      height: 100%;
      margin: 0 auto;
      overflow-x: hidden;
    }
  }
  @media ${theme.mobile} {
    margin: 1rem 0;

    .slick-list {
      width: 80%;
      height: 100%;
      margin: 0 auto;
      overflow-x: hidden;
    }
  }
`;

const SliderButton = styled.div`
  width: 60px;
  height: 60px;
  position: absolute;
  color: #e9ecef;
  z-index: 3;

  &:hover {
    color: #000000;
    opacity: 0.75;
  }

  @media ${theme.mobile} {
    > svg {
      display: none;
    }
  }
`;

const Previous = styled(SliderButton)`
  left: 3%;
`;

const Next = styled(SliderButton)`
  right: 3%;
`;

const DetailImageGallery = ({ images }) => {
  const imageCount = images.length;
  const resize = useResize(925, '>', true);

  const setting = {
    dots: true,
    arrow: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '-5px',
    nextArrow: (
      <Next>
        <HiChevronRight size="60px" />
      </Next>
    ),
    prevArrow: (
      <Previous>
        <HiChevronLeft size="60px" />
      </Previous>
    ),
  };

  return (
    <>
      {resize && imageCount === 5 ? (
        <DetailImage>
          <MainImage src={images[0]} className="resizeImage" alt="상품이미지" />
          <SubImageBox>
            <SubImage src={images[1]} alt="상품예시이미지" />
            <SubImage src={images[3]} alt="상품예시이미지" />
            <SubImage src={images[2]} alt="상품예시이미지" />
            <SubImage src={images[4]} alt="상품예시이미지" />
          </SubImageBox>
        </DetailImage>
      ) : (
        <StyledSlider {...setting}>
          {images.map((img, idx) => (
            <MainImage
              imageCount={imageCount}
              key={idx}
              src={img}
              alt="상품이미지"
            />
          ))}
        </StyledSlider>
      )}
    </>
  );
};

export default DetailImageGallery;
