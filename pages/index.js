
import React, { Component } from 'react'

import Template from '../template/public/public'

import { getRandomArticle } from '../js/api/GET'

import Loading from '../components/loading/loading'
import ArticleNotFoundStyle from '../styles/articleNotFound'
import HomeStyle from '../styles/home'

const ArticleNotFound = () => {
    return <div id="article-not-found-container">
        <div className="error-frame">
            <span>404</span>
        </div>
        <div className="text">
            <span>Aucun mathématicien disponible pour le moment !</span>
        </div>
        <ArticleNotFoundStyle/>
    </div>
}

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            article: undefined,
            error: undefined,
            loading: true
        }
    }
    /**
     *  Get random article from the API
     */
    async componentDidMount() {
        const [status, data] = await getRandomArticle()
        switch(status) {
            case 200:
                this.setState({ article: data.article, loading: false })
                break
            default:
                this.setState({ error: status, loading: false })
                break
        }
    }
    render() {
        if(this.state.loading) {
            return <Template>
                <Loading/>
            </Template>
        }
        else if(this.state.error !== undefined) {
            return <Template>
                <ArticleNotFound/>
            </Template>
        }
        return <Template>
            <div id="article-container">
                <div className="articleframe">
                    <div className="title">
                        <h1>{this.state.article.title}</h1>
                    </div>
                    <div className="content" dangerouslySetInnerHTML={{__html:this.state.article.content}} />
                </div>
            </div>
            <HomeStyle />
        </Template>
    }
}
export default Home