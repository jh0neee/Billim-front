import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../../styles/theme';

import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';
import Dropdown from '../../../components/UI/DropDown';

// DetailView.jsx
export const DetailLayout = styled.div`
  max-width: 1140px;
  width: 70%;
  margin: 120px auto 0;
  font-family: 'SCDream';

  @media (max-width: 925px) {
    width: 100%;
    overflow-x: hidden;
  }
  @media ${theme.tablet}, ${theme.mobile} {
    margin: 150px auto 0;
  }
`;

export const DetailBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 1.5rem;
  padding: 2.5rem 0px;

  @media (max-width: 925px) {
    width: 70%;
    margin: 0 auto;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr;
    column-gap: 0;
    row-gap: 1.5rem;
  }
  @media ${theme.mobile} {
    width: 80%;
    margin: 0 auto;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr;
    column-gap: 0;
    row-gap: 1.5rem;
  }
  @media (max-width: 400px) {
    width: 90%;
  }
`;

export const DetailReviewBox = styled.div`
  margin: 2rem 1rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 925px) {
    width: 70%;
    margin: 2rem auto;
  }
  @media ${theme.mobile} {
    width: 80%;
    margin: 2rem auto;
  }
`;

export const ReviewTitle = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: 700;
`;

export const ButtonLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 3rem;

  > * {
    margin-left: 1rem;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      text-decoration-line: underline;
      text-underline-position: under;
    }
  }
`;

export const StyledLine = styled.hr`
  @media (max-width: 925px), ${theme.mobile} {
    width: 90%;
  }
`;

export const ChatLink = styled(Link)`
  display: flex;
  align-items: center;

  > svg {
    color: darkgrey;
    height: 15px;
    width: 18px;
    margin: 0 0 0.1rem 0.05rem;
  }

  &:hover > svg {
    color: #ffc300;
  }

  &:hover {
    text-decoration: none;
  }
`;

// PaymentInformation
export const PayInformation = styled.div`
  padding: 0.5rem;

  > * {
    margin-left: 0.8rem;
    font-size: 0.9rem;

    &:nth-child(3n + 1) {
      margin-left: 0;
    }
  }

  @media (max-width: 412px) {
    width: 300px;
    margin: 0 auto;
  }
`;

export const InformationTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const InformationBox = styled.div`
  margin: 2rem 0;

  > * {
    margin: 1.3rem;

    &:nth-child(n + 2) {
      margin-left: 3.5rem;
    }
  }
  @media (max-width: 412px) {
    > * {
      margin: 1.3rem 0;

      &:nth-child(n + 2) {
        margin: 0;
      }
    }
  }
`;

export const PayTitle = styled.div`
  display: flex;
  align-items: center;
  color: ${props => (props.lyt ? 'white' : 'black')};
  font-size: 1.25rem;
  font-weight: 600;

  > p {
    margin-left: 0.5rem;
  }

  @media (max-width: 1140px) {
    margin-bottom: 0.3rem;
  }

  @media ${theme.tablet} {
    display: ${props => props.lyt && 'none'};
  }
`;

export const TradeDropDown = styled(Dropdown)`
  margin-left: 4.2rem !important;
  width: 15rem;

  @media (max-width: 412px) {
    margin-left: 2rem !important;
    width: 15.5rem;
  }
`;

export const PayDelivery = styled.div`
  margin: 2.5rem 0 2rem 2rem;

  @media ${theme.tablet} {
    margin: 2.5rem 2rem 2rem;
  }

  @media ${theme.mobile} {
    margin: 2.5rem 1rem 2rem;
  }
`;

export const DeliveryItems = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 3.5fr;
  align-items: center;
  margin: 2rem 0;

  * {
    > input {
      width: calc(100% + 136px);
    }
  }

  @media (max-width: 1140px) {
    grid-template-columns: 1fr;
    * {
      > input {
        width: 100%;
      }
    }
  }
`;

export const DeliveryAddress = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 3.5fr;
  align-items: center;
  margin: 1rem 0;
  margin-top: -0.45rem;

  * {
    > input {
      width: ${props => (props.road ? 'calc(100% + 136px)' : '100%')};
    }
  }

  @media (min-width: 769px) and (max-width: 1140px) {
    grid-template-columns: ${props =>
      props.road ? '2fr 7.5fr' : '2fr 4fr 3.5fr'};

    * {
      > input {
        width: 100%;
      }
    }
  }

  @media ${theme.tablet} {
    ${props =>
      props.postCode &&
      css`
        grid-template-rows: 0.5fr 1fr;
        grid-template-columns: 2.5fr 0.5fr;
        * {
          &:first-child {
            grid-area: ${props => props.postCode && '1/1/2/3'};
          }

          &:nth-child(2) {
            grid-area: ${props => props.postCode && '2/1/3/2'};
          }

          &:last-child {
            grid-area: ${props => props.postCode && '2/2/3/3'};
          }
        }
      `}

    ${props =>
      props.road &&
      css`
        grid-template-columns: 1fr;
        * {
          > input {
            width: 100%;
          }
        }
      `};

    ${props =>
      props.detail &&
      css`
        grid-template-columns: 3fr 1fr;
      `};
  }

  @media (max-width: 480px) {
    ${props =>
      props.detail &&
      css`
        grid-template-columns: 1fr;
      `};
  }
`;

export const LegalInput = styled(Input)`
  margin-left: 0.5rem;
  width: 128px;

  @media (min-width: 769px) and (max-width: 1140px) {
    width: calc(100% - 8px);
  }

  @media ${theme.mobile} {
    margin: 0;
    width: 100%;
  }
`;

export const PostCodeButton = styled(Button)`
  width: 120px;
  margin-left: 1rem;

  @media (min-width: 769px) and (max-width: 1140px) {
    width: 88%;
  }
`;

export const TradeMethodOption = styled.p`
  font-size: 0.94rem;
`;
