import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const BackDropLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

const BackDrop = () => {
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return ReactDOM.createPortal(
    <BackDropLayout />,
    document.getElementById("backdrop")
  );
};

export default BackDrop;
