const deviceSizes = {
  mobile: "420px",
  tablet: "900px",
  laptop: "1200px"
}

const theme = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
  mainButton: "#343A40",
  mainHover: "#212529",
  subButton: "#F8F9FA",
  subHover: "#E9ECEF",
  fontColor: "#292929",
  fontHover: "#868e96",
  borderColor: "#bdbdbd",
  errColor: "red",
}

export default theme;