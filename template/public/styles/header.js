import { createGlobalStyle} from "styled-components"

const Style = createGlobalStyle `
  header {
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--black-color);
  }
  .logoContainer {
    padding: 0 10px;
  }
  .logoContainer img {
    height: 70px;
    cursor: pointer;
  }
`

export default Style