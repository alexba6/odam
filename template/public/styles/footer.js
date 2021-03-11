import { createGlobalStyle} from "styled-components"

const Style = createGlobalStyle `
  footer#public{
    margin-top: auto;
    .footer-frame{
      font-family: 'Prompt', sans-serif;
      background-color: #000000;
      padding: 25px 20px 20px 20px;
      .primary-frame{
        display: flex;
        flex-direction: row;
        max-width: 1500px;
        margin: 10px auto;
        @media screen and (max-width: 700px){
          flex-direction: column;
        }
        ul{
          list-style: none;
        }
        a{
          text-decoration: none;
        }
        .primary-col{
          display: flex;
          flex-direction: column;
          margin: 0 20px;
        }
        .secondary-col{
          margin-left: auto;
          @media screen and (max-width: 700px){
            margin: 0 20px;
          }
        }
        .text{
          margin: 5px 0;
          span{
            transition: color .3s ease-in-out;
          }
          &.primary{
            span{
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1px;
              font-size: 16px;
            }
          }
          &.secondary{
            span{
              color: #555555;
              font-size: 15px;
            }
          }
          &.social{
            text-align: right;
            @media screen and (max-width: 700px){
              text-align: left;
            }
          }
          a{
            &:hover{
              span{
                color: #6831e9;
              }
            }
          }
        }
        .social-media{
          ul{
            display: flex;
            margin-top: 10px;
            li{
              .mask{
                cursor: pointer;
                margin: 0 10px;
                height: 40px;
                width: 40px;
                border-radius: 100%;
                position: relative;
                background-color: #555555;
                transition: color .3s ease-in-out;
                transition: transform .7s ease-in-out;
                svg{
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  font-size: 25px;
                  color: #000000;
                }
                &:hover{
                  background-color: #6831e9;
                  transform: rotate(360deg);
                }
              }
            }
          }
        }
      }
      .secondary-frame{
        border-top: solid 2px #555555;
        max-width: 1500px;
        margin: 0 auto;
        ul{
          list-style: none;
          display: flex;
          flex-direction: row;
          margin: 5px 0;
          @media screen and (max-width: 700px){
            flex-direction: column
          }
          .link{
            margin: 5px 10px;
              span{
                cursor: pointer;
                transition: color .3s ease-in-out;
                color: #555555;
              }
          }
          .licence{
            margin-left: auto;
            @media screen and (max-width: 700px){
              margin: 5px 10px;
            }
            a{
              &:hover{
                span{
                  color: #00a6ff;
                }
              }
            }

          }
        }
      }
    }
  }
`



export default Style