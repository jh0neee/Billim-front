import React from 'react';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';

import theme from '../../styles/theme';
import LoadingSpinner from '../UI/LoadingSpinner';
import { Profile } from '../UI/Profile';

const UserProfile = styled(Profile)`
  @media (max-width: 1111px) {
    width: 50px;
    height: 50px;
    margin-top: 0.5rem;
  }
`;

const UserParagraphBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 8rem;

  > * {
    &:last-child {
      margin-top: 0.8rem;
    }
  }

  @media (max-width: 1111px) {
    padding-top: 0.3rem;
  }

  @media ${theme.mobile} {
    flex-direction: row;
    align-items: center;
    width: ${({ grade }) => (grade === 'DIAMOND' ? '14rem' : '13rem')};

    > * {
      &:last-child {
        margin-top: 0;
        margin-left: 0.5rem;
      }
    }
  }
`;

const NicknameParagraph = styled.p`
  font-family: 'TRoundWind';
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.2rem;

  > span {
    font-family: 'SCDream';
    font-size: 0.9rem;
  }
`;
const DateParagraph = styled.p`
  font-size: 0.5rem;
`;

const GradeParagraph = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.color};
`;

const getGradeColor = grade => {
  if (grade === 'BRONZE') {
    return '#cc8e34';
  } else if (grade === 'GOLD') {
    return '#ffd700';
  } else if (grade === 'SILVER') {
    return '#c0c0c0';
  }
  return '#a0e1f5';
};

const MyPageUser = ({ user }) => {
  if (!user.createAt) {
    return <LoadingSpinner />;
  }
  const formattedDate = format(parseISO(user.createAt), 'yyyy.MM.dd');
  const gradeColor = getGradeColor(user.grade);

  return (
    <div>
      <UserProfile size="100px" src={user.profileImageUrl} />
      <UserParagraphBox grade={user.grade}>
        <div>
          <NicknameParagraph>
            {user.nickname}
            <span> 님</span>
          </NicknameParagraph>
          <DateParagraph>가입일: {formattedDate}</DateParagraph>
        </div>
        <GradeParagraph color={gradeColor}>{user.grade}</GradeParagraph>
      </UserParagraphBox>
    </div>
  );
};

export default MyPageUser;
