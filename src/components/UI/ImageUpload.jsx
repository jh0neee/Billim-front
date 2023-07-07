import React, { useEffect, useRef, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

const ProfileUploadLayout = styled.div`
  display: grid;
  grid-template-columns: 0.45fr 1fr 0.3fr;
  align-items: flex-start;
  margin: 2rem 0;
  margin-bottom: 2rem;
  margin-top: 2rem;

  > * {
    &:first-child {
      margin-left: 0.5rem;
      font-weight: 600;
    }
  }

  span {
    margin-left: 0.3rem;
  }

  p {
    margin-top: 1rem;
  }

  div {
    p {
      font-size: 0.65rem;
      margin-top: 0.5rem;
    }
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageBox = styled.div`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 70%;
  overflow: hidden;
`;

const ImageFile = styled.img`
  width: ${({ imageSize, profile }) =>
    profile ? '100%' : imageSize || '80px'};
  height: ${({ imageSize, profile }) =>
    profile ? '100%' : imageSize || '80px'};
  object-fit: ${({ profile }) => (profile ? 'cover' : null)};
`;

const ImageFileButton = styled.div`
  margin-top: 1rem;
  cursor: pointer;
`;

const ImageUpload = props => {
  const fileInputRef = useRef(null);
  const [showImages, setShowImages] = useState([]);
  const defaultProfileImageUrl =
    'https://billim.s3.ap-northeast-2.amazonaws.com/profile/profile-default.png';

  const pickImageHandler = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (props.id === 'profile') {
      setShowImages([defaultProfileImageUrl]);
    }
  }, [props.id]);

  // 이미지 상대경로 저장
  const handleAddImages = event => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (props.id === 'profile') {
      imageUrlLists = imageUrlLists.slice(-1);
    } else if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    setShowImages(imageUrlLists);
    props.onInput(props.id, imageUrlLists, true);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = id => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  return props.id === 'profile' ? (
    <ProfileUploadLayout>
      <p>프로필</p>
      <div>
        <label htmlFor={props.id} onChange={handleAddImages}>
          <ImageInput type="file" id={props.id} ref={fileInputRef} />
        </label>
        <ImageBox size={props.size}>
          <ImageFile
            profile
            src={showImages || defaultProfileImageUrl}
            alt="profileImage"
          />
        </ImageBox>
        <p>
          회원님을 알릴 수 있는 사진을 등록해주세요. <br />
          등록된 사진은 회원님의 게시물이나 댓글에 사용됩니다.
        </p>
      </div>
      <ImageFileButton>
        <FaPlus fill="#646F7C" onClick={pickImageHandler} />
        <span onClick={pickImageHandler}>사진변경</span>
      </ImageFileButton>
    </ProfileUploadLayout>
  ) : (
    <div>
      <label htmlFor={props.id} onChange={handleAddImages}>
        <ImageInput
          type="file"
          id={props.id}
          multiple={props.id !== 'profile'}
        />
        <FaPlus fill="#646F7C" />
        <span>사진추가</span>
      </label>
      <div>
        {showImages.map((image, id) => (
          <div key={id}>
            <ImageFile src={image} alt={`${image}-${id}`} />
            <FaTimes onClick={() => handleDeleteImage(id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
