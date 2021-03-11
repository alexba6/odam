import { createGlobalStyle} from "styled-components"

const Style = createGlobalStyle`
  #article-container {
    min-height: 80vh;
    display: flex;
    justify-content: center;
    .articleframe {
      margin: 40px 15px;
      padding: 5px;
      max-width: 1300px;
      width: 100%;
      box-shadow: 10px 10px 10px #747474;
      background-color: #ffffff;
      .title {
        margin-left: 10px;
        h1 {
          font-family: 'Rokkitt', serif;
          font-size: 40px;
        }
      }
      .content {
        margin: 0 20px;
        font-family: 'Rokkitt', serif;
        font-size: 18px;
      }
    }
  }
`

export default Style