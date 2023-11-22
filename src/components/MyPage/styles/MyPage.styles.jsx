import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';

import Button from '../../UI/Button';

export const ContentBox = styled.div`
  background-color: #ededed;
  margin: 1rem 0;

  > * {
    &:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
    }
  }
`;

export const ProductBox = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 530px) {
    align-self: flex-start;
  }
`;

export const ParagraphBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 1.5rem;
  font-size: 0.9rem;

  > a:hover {
    text-decoration: underline;
  }

  > * {
    &:first-child {
      cursor: pointer;
    }

    &:first-child:hover {
      text-decoration: underline;
    }

    &:nth-child(2) {
      padding: 0.5rem 0 1rem;
    }
  }

  @media ${theme.mobile} {
    font-size: 0.8rem;
    margin-top: 0.2rem;

    > * {
      &:nth-child(2) {
        padding: 0.5rem 0 0.7rem;
      }

      &:last-child {
        font-size: 0.8rem;
        margin-top: 0.7rem;
      }
    }
  }
`;

export const DateBox = styled.div`
  > * {
    line-height: 1.3;
    font-size: 0.8rem;
  }

  > p > span {
    font-weight: 600;
  }

  @media ${theme.mobile} {
    > * {
      font-size: 0.7rem;
    }
  }
`;

export const InformBox = styled.div`
  column-count: 2;
  padding: 0 1rem 1rem;
  display: flex;
  flex-direction: ${props => (props.informResize ? 'column' : 'row')};
  align-items: flex-end;
  justify-content: space-between;

  > * {
    &:last-child {
      margin-top: ${props => (props.informResize ? '0.5rem' : '0')};
    }
  }
`;

export const SellerBox = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;

  > * {
    margin-left: 1rem;
  }
`;

export const PurchaseState = styled.p`
  padding-left: 0.3rem;
  font-family: TRoundWind;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const PurchaseDate = styled.p`
  font-size: 0.8rem;

  @media ${theme.mobile} {
    font-size: 0.5rem;
  }
`;

export const PurchaseImage = styled.img`
  width: ${props => (props.dateResize ? '150px' : '120px')};
  height: ${props => (props.dateResize ? '170px' : '140px')};

  @media ${theme.mobile} {
    width: 115px;
    height: 135px;
  }
`;

export const ExtraButton = styled(Button)`
  margin: ${props =>
    props.informResize
      ? css`
          ${props.cancel ? '0 0 0 0.3rem' : '0 0 0 1rem'};
        `
      : css`
          ${props.cancel ? '0 0 0.5rem 0' : '0 0 0 1rem'};
        `};
  width: 60px;
  height: 27px;
  font-size: 10px;
  font-weight: 400;
`;
