import React from 'react';
import profileImage from '../../asset/image/profileImage.png';

export const Profile = props => {
  const { size } = props;
  return (
    <img src={profileImage} alt="프로필이미지" width={size} height={size} />
  );
};
