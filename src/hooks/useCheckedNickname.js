import axios from 'axios';
import { toast } from 'react-toastify';

export const useCheckNickname = (nickname, setIsCheck) => {
  const url = process.env.REACT_APP_URL;

  const checkNickname = () => {
    axios
      .get(`${url}/member/check/nickname`, {
        params: { nickname: nickname.value },
      })
      .then(response => {
        if (nickname?.value === '') {
          toast.warning('닉네임을 입력해주세요');
          setIsCheck(false);
        } else if (!nickname?.isValid) {
          toast.warning('닉네임은 2~10자로 입력해주세요');
          setIsCheck(false);
        } else {
          if (response.data) {
            toast.error('이미 사용중인 닉네임입니다.');
            setIsCheck(false);
          } else {
            toast.success('사용가능한 닉네임입니다.');
            setIsCheck(true);
          }
        }
      })
      .catch(err => {
        toast.error(err.response.data.message || err.message);
      });
  };

  return [checkNickname];
};
