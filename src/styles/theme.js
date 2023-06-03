const deviceSizes = {
  mobile: '420px',
  tablet: '900px',
  laptop: '1200px',
};

const theme = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
  mainButton: '#212529',
  mainHover: '#343A40',
  subButton: '#E9ECEF',
  subHover: '#F8F9FA',
  fontColor: '#292929',
  fontHover: '#868e96',
  borderColor: '#bdbdbd',
  errColor: 'red',
};

export default theme;
