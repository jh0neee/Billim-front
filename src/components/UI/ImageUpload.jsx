import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Button from './Button';

const ImageInput = styled.input`
  display: none;
`;

const ImageFile = styled.img`
  width: ${({ imageSize }) => imageSize || '100px'};
  height: ${({ imageSize }) => imageSize || '100px'};
`;

const ImageButton = styled(Button)`
  margin: 0;
  width: 80px;
  height: 27px;
  font-size: 10px;
  font-weight: 400;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 348px;
  height: 100px;
  margin: 0 1.2rem;
`;

const ImageInfo = styled.div`
  display: flex;
  width: 220px;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
`;

const FileNameBox = styled.div`
  width: 120px;
  margin-right: 20px;
  line-height: 1.3;
`;

const FileName = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ImageUpload = props => {
  const [file, setFile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file || file.length === 0) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file[0]);
  }, [file]);

  const pickedHandler = e => {
    let pickedFile = [];
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length < 6) {
      pickedFile = Array.from(e.target.files);
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
      alert('파일은 최대 5개까지 선택할 수 있습니다.');
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className={props.className}>
      <ImageInput
        id={props.id}
        ref={filePickerRef}
        type="file"
        multiple={props.id !== 'profile'}
        accept="image/*"
        onChange={pickedHandler}
      />
      <ImageBox>
        <div>
          {previewUrl && <ImageFile src={previewUrl} alt="Preview" />}
          {!previewUrl && props.id !== 'profile' && (
            <p>상품 사진을 선택해주세요.</p>
          )}
        </div>
        <ImageInfo>
          <FileNameBox>
            {file.map((file, idx) => (
              <FileName key={idx}>{file.name}</FileName>
            ))}
          </FileNameBox>
          <ImageButton type="button" small sub onClick={pickImageHandler}>
            이미지 선택
          </ImageButton>
        </ImageInfo>
      </ImageBox>
      {!isValid && <p>{props.errText}</p>}
    </div>
  );
};

export default ImageUpload;
