import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const usePostalCode = onInput => {
  const [postCode, setPostCode] = useState('');
  const [address, setAddress] = useState('');
  const [legal, setlegal] = useState('');

  const scriptUrl =
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = data => {
    const address = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
    }

    setAddress(address);
    setPostCode(data.zonecode);
    setlegal(`(${extraAddress})`);

    onInput('postcode', data.zonecode, true);
    onInput('address', address, true);
    onInput('address_legal', extraAddress, true);
  };

  const postCodeOpenHandler = () => {
    open({ onComplete: handleComplete });
  };

  return [postCode, address, legal, postCodeOpenHandler];
};

export default usePostalCode;
