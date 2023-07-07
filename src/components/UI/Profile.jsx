import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 70%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Profile = props => {
  const { size } = props;
  const defaultProfileImage =
    'https://billim.s3.ap-northeast-2.amazonaws.com/profile/profile-default.png';

  return (
    <>
      <Box size={size}>
        <Image src={props.src || defaultProfileImage} alt="프로필이미지" />
      </Box>
    </>
  );
};
