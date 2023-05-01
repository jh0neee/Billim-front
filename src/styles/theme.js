const deviceSizes = {
  mobile: "420px",
  tablet: "900px",
  laptop: "1200px"
}

const theme = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
  mainButton: "#494949",
  mainHover: "#5e5e5e",
  subButton: "#e0e0e0",
  subHover: "#868e96",
  fontColor: "#292929",
  borderColor: "#bdbdbd",
  errColor: "red",
}

export default theme;