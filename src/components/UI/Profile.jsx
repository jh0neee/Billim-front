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

  const BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME;
  const REGION = process.env.REACT_APP_REGION;

  const defaultProfileImage = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/profile/profile-default.png`;
  return (
    <>
      <Box className={props.className} size={size}>
        <Image src={props.src || defaultProfileImage} alt="프로필이미지" />
      </Box>
    </>
  );
};
