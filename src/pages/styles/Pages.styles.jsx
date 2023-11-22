import styled from 'styled-components';
import theme from '../../styles/theme';

import Input from '../../components/UI/Input';
import { HiChevronLeft } from 'react-icons/hi';

export const FormLayout = styled.form`
  max-width: fit-content;
  width: 60%;
  margin: 85px auto 0px;
  padding: 1.5rem 0 0;
  font-family: SCDream;

  > p {
    font-family: TRoundWind;
    font-weight: 700;
    font-size: 1.7rem;
    text-align: center;
  }

  @media ${theme.mobile} {
    width: 70%;
    margin: 150px auto 0;
    padding: 0;
  }
  @media ${theme.tablet} {
    margin: 150px auto 0;
    padding: 0;
  }
`;

export const FormBox = styled.div`
  margin: 3rem 0px 0px;
`;

export const FormItem = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 5fr;
  margin: 20px 5rem 20px 2rem;
  align-items: center;
  justify-items: start;
  margin-left: 6rem;
  font-size: 0.9rem;

  > p {
    font-weight: 600;
    font-size: 1.1rem;
  }

  @media ${theme.mobile}, ${theme.tablet} {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 0;
  }
  @media (min-width: 769px) and (max-width: 1140px) {
    grid-template-columns: 2fr 5fr;
    margin: 20px 4rem 20px 5rem;
  }
`;

export const ItemBox = styled.div`
  display: flex;
  align-items: center;

  > p {
    margin-left: 0.5rem;
  }

  @media ${theme.mobile}, ${theme.tablet} {
    width: 90%;
    margin-top: 0.5rem;
    align-self: center;
  }
`;

export const FormInput = styled(Input)`
  margin-left: 1rem;

  @media ${theme.mobile}, ${theme.tablet} {
    width: 95%;
    margin-left: 0;
    align-self: center;
    margin-top: ${props => (props.id === 'rentalFee' ? '0.5rem' : '1rem')};

    > * {
      &:nth-child(2) {
        width: 100%;
      }
    }
  }

  @media (min-width: 769px) and (max-width: 1140px) {
    width: 95%;

    > * {
      &:nth-child(2) {
        width: 100%;
      }
    }
  }
`;

export const CategoryBox = styled.div`
  @media ${theme.mobile} {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    width: 7rem;
  }

  @media (min-width: 481px) and (max-width: 630px) {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    width: 18rem;
  }
  @media (min-width: 631px) and (max-width: 768px) {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  @media (min-width: 769px) and (max-width: 850px) {
    width: 7rem;
  }
  @media (min-width: 942px) and (max-width: 1100px) {
    width: 18rem;
  }
`;

export const TradeBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${theme.mobile}, ${theme.tablet} {
    margin-top: 0.5rem;
    margin-bottom: ${({ checkedTrade }) =>
      checkedTrade === 'DIRECT' || checkedTrade === 'ALL' ? '0' : '0.5rem'};
  }

  > div {
    @media (min-width: 375px) and (max-width: 645px),
      (min-width: 769px) and (max-width: 1060px) {
      width: ${({ checkedTrade }) =>
        checkedTrade === 'DIRECT' || checkedTrade === 'ALL' ? '7rem' : 'null'};
      align-self: baseline;
    }
  }
  > * {
    &:first-child {
      @media (min-width: 1070px) and (max-width: 1152px) {
        width: ${({ checkedTrade }) =>
          checkedTrade === 'DIRECT' || checkedTrade === 'ALL'
            ? '13rem'
            : 'null'};
      }
    }
  }
`;

export const PlaceBox = styled.div`
  font-size: 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1.5rem;
  text-align: center;

  > p {
    margin-right: 1rem;
    line-height: 0.8rem;
  }

  @media ${theme.mobile}, ${theme.tablet} {
    margin-top: 8px;
    justify-content: center;
    > p {
      margin-right: 1rem;
      line-height: 0.8rem;
    }
  }

  @media (min-width: 375px) and (max-width: 645px),
    (min-width: 769px) and (max-width: 1060px) {
    margin: 0;
    flex-direction: column;

    > p {
      margin: 0;
    }
  }

  @media (min-width: 1061px) and (max-width: 1280px) {
    flex-direction: column;

    > p {
      margin: 0;
    }
  }
`;

export const FormBtnBox = styled.div`
  margin: 1rem 0px 2rem;
  display: flex;
  justify-content: center;
  font-weight: 600;
`;

export const Line = styled.hr`
  width: 80%;

  @media ${theme.mobile}, ${theme.tablet} {
    width: 100%;
  }
`;

// ProductPayment
export const PaymentLayout = styled.form`
  width: 80%;
  margin: 120px auto 0;
  max-width: 1140px;
  font-family: 'SCDream';

  @media ${theme.tablet} {
    margin: 150px auto 0;
  }
`;
export const PaymentTitle = styled.div`
  display: flex;
  align-items: center;
  font-family: 'TRoundWind';
  font-size: 1.65rem;
  font-weight: 700;
`;

export const GoBack = styled(HiChevronLeft)`
  cursor: pointer;
`;

export const PaymentBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 1.5rem;
  padding: 2.5rem 0px;

  @media (min-width: 769px) and (max-width: 1140px) {
    grid-template-columns: 1fr 1fr;
  }

  @media ${theme.tablet} {
    grid-template-columns: 1fr;
    column-gap: 0;
  }
`;
