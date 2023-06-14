const deviceSizes = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1440px',
};

const theme = {
  mobile: `only screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `only screen and (max-width: ${deviceSizes.laptop})`,
  desktop: `only screen and (min-width: ${deviceSizes.desktop})`,
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
