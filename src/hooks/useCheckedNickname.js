import axios from 'axios';
import { useToastAlert } from './useToastAlert';

export const useCheckNickname = (nickname, setIsCheck) => {
  const url = process.env.REACT_APP_URL;
  const { showToast } = useToastAlert();

  const checkNickname = () => {
    axios
      .get(`${url}/member/check/nickname`, {
        params: { nickname: nickname.value },
      })
      .then(response => {
        if (nickname?.value === '') {
          showToast('닉네임을 입력해주세요.', 'warning');
          setIsCheck(false);
        } else if (!nickname?.isValid) {
          showToast('닉네임은 2~10자로 입력해주세요.', 'warning');
          setIsCheck(false);
        } else {
          if (response.data) {
            showToast('이미 사용중인 닉네임입니다.', 'error');
            setIsCheck(false);
          } else {
            showToast('사용가능한 닉네임입니다.', 'success');
            setIsCheck(true);
          }
        }
      })
      .catch(err => {
        showToast(err.response.data.message || err.message, 'error');
      });
  };

  return [checkNickname];
};
