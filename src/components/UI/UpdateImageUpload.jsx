import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaPlus, FaTimes } from 'react-icons/fa';
import {
  ImageLayout,
  ImageInput,
  ImagesBox,
  ImageContent,
  ImageFile,
} from './ImageUpload';

const DeleteIcon = styled(FaTimes)`
  position: absolute;
  right: 0;
  top: 0;
`;

const UpdateImageUpload = props => {
  const { imageUrls, setDeleteImages, id, onInput } = props;
  const [preview, setPreview] = useState([]);
  const [showImages, setShowImages] = useState([...imageUrls]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!showImages || showImages.length === 0) {
      setPreview([]);
      return;
    }

    const stringImages = showImages.filter(item => typeof item === 'string');
    const fileObjects = showImages.filter(item => typeof item === 'object');

    setPreview([...stringImages]);

    const fileReaderPromises = fileObjects.map(file => {
      return new Promise(resolve => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaderPromises).then(previewResults => {
      setPreview(prev => [...prev, ...previewResults]);
    });
  }, [showImages]);

  const handleDeleteImage = id => {
    setShowImages(prevImages => {
      const deletedImage = prevImages[id];
      const newImages = prevImages.filter((_, index) => index !== id);

      if (
        typeof deletedImage === 'string' &&
        typeof setDeleteImages === 'function'
      ) {
        setDeleteImages(prevDeleteImages => [
          ...prevDeleteImages,
          deletedImage,
        ]);
      }

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
    if (imageLists && imageLists.length <= 5 - showImages.length) {
      pickedFile = Array.from(imageLists);
      setShowImages(prevImages => [...prevImages, ...pickedFile]);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
      alert(`파일은 최대 ${5 - showImages.length}개까지 선택할 수 있습니다.`);
    }
    onInput(id, pickedFile, fileIsValid);
  };

  return (
    <ImageLayout>
      <label htmlFor={id} onChange={handleAddImages}>
        <ImageInput type="file" id={id} multiple={id !== 'profile'} />
        <FaPlus fill="#646F7C" />
        <span>사진추가</span>
      </label>
      <ImagesBox imageLength={preview.length}>
        {preview &&
          preview.map((image, imageId) => (
            <ImageContent key={imageId}>
              <ImageFile src={image} alt={`${image}-${imageId}`} />
              <DeleteIcon onClick={() => handleDeleteImage(imageId)} />
            </ImageContent>
          ))}
      </ImagesBox>
    </ImageLayout>
  );
};

export default UpdateImageUpload;
