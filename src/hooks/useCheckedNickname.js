import { toast } from 'react-toastify';
import { review } from '../data';

export const useCheckNickname = (nickname, setIsCheck) => {
  const checkNickname = () => {
    const isCheck = review.map(item => item.username).includes(nickname.value);

    if (nickname.value === '') {
      toast.warning('닉네임을 입력해주세요');
    } else if (!nickname.isValid) {
      toast.warning('닉네임은 2~10자로 입력해주세요');
    } else {
      if (isCheck) {
        toast.error('이미 사용중인 닉네임입니다.');
        setIsCheck(false);
      } else {
        toast.success('사용가능한 닉네임입니다.');
        setIsCheck(true);
      }
    }
  };

  return [checkNickname];
};
