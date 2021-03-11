
import React, { Component } from 'react'
import Header from './header'
import NavBar from './nav-bar'

import navBarContent from './nav-bar-context'

import themeContext from '../theme-button-context'

import {
    TemplateHeader,
    TemplateBody,
    TemplateTitle,
    TemplateOptions,
    TemplateFooter,
    TemplateSubTitle,
    TemplateBox
} from './components'




class AdminTemplate extends Component {
    static Header = TemplateHeader
    static Body = TemplateBody
    static Title = TemplateTitle
    static Options = TemplateOptions
    static Footer = TemplateFooter
    static SubTitle = TemplateSubTitle
    static Box = TemplateBox

    constructor(props) {
        super(props)
        this.state = {
            displayNavBar: false
        }
    }
    render() {
        const displayNavBarValue = {
            display: this.state.displayNavBar,
            toggleState: () => this.setState({ displayNavBar: (!this.state.displayNavBar) })
        }
        return <navBarContent.Provider value={displayNavBarValue}>
            <Header/>
            <div className="admin-container">
                <NavBar/>
                <div className="admin-page-content">
                    <div className="component-box">
                        { this.props.children }
                    </div>
                </div>
            </div>
            <style jsx>{`
              .admin-container {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
              }
              .admin-page-content {
                width: 100%;
                margin-top: 71px;
                min-height: calc(100vh - 71px);
              }
              .component-box {
                background-color: ${this.context.theme.secondaryBackgroundColor};
                margin: 15px 10px;
                border-radius: 5px;
              }
              @media screen and (max-width: 600px){
                .component-box {
                  margin: 10px 7px;
                }
              }
            `}</style>
            <style jsx global>{`
                body{
                  background-color: ${this.context.theme.primaryBackgroundColor};
                }
            `}</style>
        </navBarContent.Provider>
    }
}


AdminTemplate.contextType = themeContext



export default AdminTemplate