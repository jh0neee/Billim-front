import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle` 

  a{
    text-decoration: none;
    color: inherit;
  }

  input, textarea { 
    -moz-user-select: auto;
    -webkit-user-select: auto;
    user-select: auto;
  }

  input:focus {
    outline: none;
  }

  button {
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
  }

  // scroll bar
  ::-webkit-scrollbar {
    width: 5px;
    height: 7px;
  }
  body *::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.9);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 2px; 
    background-color: #b3b3b3;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #b3b3b3;
  }
  ::-webkit-scrollbar-button:start:decrement, 
  ::-webkit-scrollbar-button:end:increment {
    width: 2px; 
    height: 2px; 
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

export default GlobalStyles;
