import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaPlus, FaTimes } from 'react-icons/fa';

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

const ImageLayout = styled.div`
  margin-left: 1rem;
`;

const ImageInput = styled.input`
  display: none;
`;

const ImagesBox = styled.div`
  display: flex;
  margin-top: ${({ imageLength }) => (imageLength === 0 ? '0' : '1rem')};
`;

const ImageContent = styled.div`
  position: relative;
  margin-right: 1rem;
`;

const DeleteIcon = styled(FaTimes)`
  position: absolute;
  right: 0;
  top: 0;
`;

const ImageBox = styled.div`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 70%;
  overflow: hidden;
`;

const ImageFile = styled.img`
  width: ${({ imageSize, profile }) =>
    profile ? '100%' : imageSize || '58px'};
  height: ${({ imageSize, profile }) =>
    profile ? '100%' : imageSize || '58px'};
  object-fit: ${({ profile }) => (profile ? 'cover' : null)};
`;

const ImageFileButton = styled.div`
  margin-top: 1rem;
  cursor: pointer;
`;

const ImageUpload = props => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState();
  const [showImages, setShowImages] = useState();
  const [isValid, setIsValid] = useState(false);
  const defaultProfileImageUrl =
    'https://billim.s3.ap-northeast-2.amazonaws.com/profile/profile-default.png';

  const pickImageHandler = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (!showImages || showImages.length === 0) {
      return;
    }

    if (props.id === 'profile' && showImages.length === 1) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreview(fileReader.result);
      };
      fileReader.readAsDataURL(showImages[0]);
      return;
    }

    const fileReaderPromises = [];
    const previewResults = [];

    for (let i = 0; i < showImages.length; i++) {
      const file = showImages[i];
      const fileReader = new FileReader();

      const fileReaderPromise = new Promise(resolve => {
        fileReader.onload = () => {
          previewResults[i] = fileReader.result;
          resolve();
        };
      });

      fileReader.readAsDataURL(file);
      fileReaderPromises.push(fileReaderPromise);
    }

    Promise.all(fileReaderPromises).then(() => {
      setPreview(previewResults);
    });
  }, [showImages, props.id]);

  const handleDeleteImage = id => {
    setShowImages(prevImages => {
      const newImages = prevImages.filter((_, index) => index !== id);
      setPreview(prevPreview => {
        const newPreview = [...prevPreview];
        newPreview.splice(id, 1);
        return newPreview;
      });
      return newImages;
    });
  };

  const handleAddImages = e => {
    const imageLists = e.target.files;

    let pickedFile = [];
    let fileIsValid = isValid;
    if (imageLists && imageLists.length < 6) {
      pickedFile = Array.from(imageLists);
      setShowImages(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
      alert('파일은 최대 5개까지 선택할 수 있습니다.');
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return props.id === 'profile' ? (
    <ProfileUploadLayout>
      <p>프로필</p>
      <div>
        <label htmlFor={props.id} onChange={handleAddImages}>
          <ImageInput type="file" id={props.id} ref={fileInputRef} />
        </label>
        {!showImages ? (
          <ImageFile
            src={defaultProfileImageUrl}
            alt="기본 이미지"
            imageSize="50px"
          />
        ) : (
          <>
            <ImageBox size={props.size}>
              <ImageFile profile src={preview} alt="profileImage" />
            </ImageBox>
          </>
        )}
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
    <ImageLayout>
      <label htmlFor={props.id} onChange={handleAddImages}>
        <ImageInput
          type="file"
          id={props.id}
          multiple={props.id !== 'profile'}
        />
        <FaPlus fill="#646F7C" />
        <span>사진추가</span>
      </label>
      <ImagesBox imageLength={preview.length}>
        {preview &&
          preview.map((image, id) => (
            <ImageContent key={id}>
              <ImageFile src={image} alt={`${image}-${id}`} />
              <DeleteIcon onClick={() => handleDeleteImage(id)} />
            </ImageContent>
          ))}
      </ImagesBox>
    </ImageLayout>
  );
};

export default ImageUpload;
