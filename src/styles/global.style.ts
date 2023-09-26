import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
        overflow: hidden;
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    a {
        color: inherit;
        text-decoration: inherit; /* no underline */
    }

    button {
         border: none;
        margin: 0;
        padding: 0;
        width: auto;
        overflow: visible;
        background: transparent;
        color: inherit;
        font: inherit;
        line-height: normal;
        -webkit-font-smoothing: inherit;
        -moz-osx-font-smoothing: inherit;
        -webkit-appearance: none;
    }

    .react-datepicker-wrapper:focus-visible, 
    .react-datepicker__input-container:focus-visible, 
    .react-datepicker-wrapper input[type="text"]:focus-visible {
        outline: none !important;
    }

    .react-datepicker__tab-loop {
      position: absolute;
      top: 0;
    }
    
    .react-datepicker__triangle {
      display: none !important;
    }
`;
