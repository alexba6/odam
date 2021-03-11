import { createGlobalStyle} from "styled-components"

const Style = createGlobalStyle`
  #article-not-found-container {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    user-select: none;
    .error-frame {
      span {
        font-size: 200px;
        font-weight: 500;
        color: #000000;
        text-shadow: 5px 5px #7c7c7c;
      }
    }
    .text {
      margin: 20px 0;
      span {
        font-size: 18px;
        font-family: 'Comfortaa', cursive;
      }
    }
  }
`

export default Style