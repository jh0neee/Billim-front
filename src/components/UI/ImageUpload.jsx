import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

const ImageInput = styled.input`
  display: none;
`;

const ImageFile = styled.img`
  width: ${({ imageSize }) => imageSize || '100px'};
  height: ${({ imageSize }) => imageSize || '100px'};
`;

const ImageUpload = props => {
  const [showImages, setShowImages] = useState([]);

  // 이미지 상대경로 저장
  const handleAddImages = event => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    setShowImages(imageUrlLists);
    props.onInput(props.id, imageUrlLists, true);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = id => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  return (
    <div>
      <label htmlFor="input-file" onChange={handleAddImages}>
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
