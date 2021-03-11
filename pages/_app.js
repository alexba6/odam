import React, {  Component } from 'react'
import '../styles/globals.css'

import { ThemeProvider } from 'styled-components'

import Head from 'next/head'
import { darkMode, lightMode } from '../styles/theme'

import ThemeButtonContext from '../template/theme-button-context'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dark: undefined
    }
  }
  componentDidMount() {
    this.setState({
      dark: JSON.parse(localStorage.getItem('dark_mode'))
    })
  }
  update() {
    localStorage.setItem('dark_mode', JSON.stringify(!this.state.dark))
    this.setState({ dark: !this.state.dark })
  }
  render() {
    if(this.state.dark === undefined) {
      return <></>
    }
    return <ThemeProvider theme={ this.state.dark ? darkMode : lightMode}>
      <Head>
        <title>Un Jour Un Mathématicien</title>
      </Head>
        <ThemeButtonContext.Provider value={{
            dark : this.state.dark,
            theme: this.state.dark ? darkMode : lightMode,
            toggleTheme: () => this.update()
          }}>
          <MyApp Component={this.props.Component} pagePro={this.props.pageProps} />
        </ThemeButtonContext.Provider>
    </ThemeProvider>
  }
}



const MyApp = ({ Component, pageProps }) => {
  console.log('render')
  return  <Component {...pageProps}/>
}

export default App
