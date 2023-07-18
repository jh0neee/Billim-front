export const useAddressSplitter = address => {
  const roadAddressPattern =
    /^(.*?[서울시도])(.*?[구군])(.*?((?:로|길).*?) [0-9]+).*$/;
  const legalPattern1 = /([^ ]+)$/;

  const roadResult = address.match(roadAddressPattern);
  const road = roadResult[1] + roadResult[2] + roadResult[3];

  let legalResult, legal;
  if (address.includes(',')) {
    legalResult = address.split(' ');
    legal = legalResult.slice(-2).join(' ');
  } else {
    legalResult = address.match(legalPattern1);
    legal = legalResult[0];
  }

  const detail = address.replace(road, '').replace(legal, '').trim();

  return { road, legal, detail };
};
