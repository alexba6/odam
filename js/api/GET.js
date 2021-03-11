const routes = require('../../config/api-routes.json')

const method = 'GET'

const getCurrentUser = async (token) => {
    let request = await fetch(routes.userView, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        mode: 'cors',
        cache: 'default'
    })
    return [await request.status, await request.json()]
}

const getOneArticle = async (token, id) => {
    let request = await fetch(routes.articleView + '/' + id, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        mode: 'cors',
        cache: 'default'
    })
    return [await request.status, await request.json()]
}

const getAllArticles = async (token) => {
    let request = await fetch(routes.articleView, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        mode: 'cors',
        cache: 'default'
    })
    return [await request.status, await request.json()]
}

const getRandomArticle = async () => {
    let request = await fetch(routes.articleRandom, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        cache: 'default'
    })
    return [await request.status, await request.json()]
}

export { getCurrentUser, getOneArticle, getAllArticles, getRandomArticle }