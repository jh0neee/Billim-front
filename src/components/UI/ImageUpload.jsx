import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { FaPlus, FaTimes } from 'react-icons/fa';

const ProfileUploadLayout = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.9fr 0.5fr;
  align-items: flex-start;
  margin-top: 2rem;

  > * {
    &:first-child {
      margin-left: 0.5rem;
      font-weight: 600;
    }
  }

  span {
    font-size: 0.9rem;
    margin-left: 0.3rem;
  }

  p {
    margin-top: 1rem;
  }

  @media ${theme.tablet} {
    grid-template-columns: 0.45fr 1fr 0.5fr;
  }

  @media ${theme.mobile} {
    grid-template-columns: 0.55fr 0.8fr 0.44fr;
    margin-top: 1rem;

    span {
      font-size: 0.7rem;
    }
  }
`;
const ProfileTextBox = styled.div`
  display: grid;
  grid-template-columns: 0.35fr 1fr;
  line-height: 0.8rem;
  margin-bottom: 2rem;

  @media ${theme.tablet} {
    grid-template-columns: 0.45fr 1.5fr;
  }

  @media ${theme.mobile} {
    grid-template-columns: 1fr;
    margin-bottom: 1rem;
    justify-items: end;
  }
`;

const ProfileText = styled.p`
  grid-area: 1 / 2 / 2 / 3;
  font-size: 0.65rem;
  margin-top: 0.5rem;
`;

export const ImageLayout = styled.div`
  margin-left: 1rem;

  @media ${theme.mobile}, ${theme.tablet} {
    margin-bottom: 0.5rem;
    margin-top: 1rem;
  }
`;

export const ImageInput = styled.input`
  display: none;
`;

export const ImagesBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${({ imageLength }) =>
    imageLength === 0 || typeof imageLength === 'undefined' ? '0' : '1rem'};
  gap: 0.3rem;
`;

export const ImageContent = styled.div`
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

export const ImageFile = styled.img`
  width: ${({ profile }) => (profile ? '100%' : '58px')};
  height: ${({ profile }) => (profile ? '100%' : '58px')};
  object-fit: ${({ profile }) => (profile ? 'cover' : null)};
`;

const ImageFileButton = styled.div`
  display: flex;
  align-items: center;
  margin: auto 0;
  cursor: pointer;
  justify-content: center;

  @media ${theme.mobile} {
    > * {
      &:first-child {
        width: 0.7rem;
      }
    }
  }
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

    if (props.id === 'profileImageUrl' && showImages.length === 1) {
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

  return props.id === 'profileImageUrl' ? (
    <div>
      <ProfileUploadLayout>
        <p>프로필</p>
        <div>
          <label htmlFor={props.id} onChange={handleAddImages}>
            <ImageInput type="file" id={props.id} ref={fileInputRef} />
          </label>
          {!showImages ? (
            <>
              <ImageBox size={props.size}>
                <ImageFile
                  profile="true"
                  src={props.src || defaultProfileImageUrl}
                  alt="기본 이미지"
                />
              </ImageBox>
            </>
          ) : (
            <>
              <ImageBox size={props.size}>
                <ImageFile profile="true" src={preview} alt="profileImage" />
              </ImageBox>
            </>
          )}
        </div>
        <ImageFileButton>
          <FaPlus fill="#646F7C" onClick={pickImageHandler} />
          <span onClick={pickImageHandler}>사진변경</span>
        </ImageFileButton>
      </ProfileUploadLayout>
      <ProfileTextBox>
        <ProfileText>
          회원님을 알릴 수 있는 사진을 등록해주세요. <br />
          등록된 사진은 회원님의 게시물이나 댓글에 사용됩니다.
        </ProfileText>
      </ProfileTextBox>
    </div>
  ) : (
    <ImageLayout>
      <label htmlFor={props.id} onChange={handleAddImages}>
        <ImageInput
          type="file"
          id={props.id}
          multiple={props.id !== 'profileImageUrl'}
        />
        <FaPlus fill="#646F7C" />
        <span>사진추가</span>
      </label>
      <ImagesBox imageLength={preview?.length}>
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
