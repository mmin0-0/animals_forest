import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{box-sizing: border-box}
  html {
    font-size: 10px;
    scroll-behavior: smooth;
  }
  body {
    font-size: 1.6rem;
    line-height: 1;
    letter-spacing: -0.02em;
    font-family: ${({theme}) => theme.fontFamily.default};
    font-weight: ${({theme}) => theme.fontWeight.normal};
  }
  input, textarea {
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }
  textarea {
    outline: none;
    resize: none;
    line-height: 1.2;
    font-family: ${({theme}) => theme.fontFamily.default};
  }
  input:focus {outline: none;}
  a {
    text-decoration: none;
    color: inherit;
  }
  button{
    outline: none;
    cursor: pointer;
  }
  .hide {
    position: absolute;
    width: 1px!important;
    height: 1px!important;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    border: 0;
    clip-path: polygon(0 0, 0 0, 0 0);
  }
  .img-wrap {
    img {
      max-width: 100%;
    }
  }
`;

export default GlobalStyle;