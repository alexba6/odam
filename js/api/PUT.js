const routes = require('../../config/api-routes.json')

const method = 'PUT'

const putArticle = async (title, content, id, token) => {
    let request = await fetch(`${routes.articleUpdate}/${id}` , {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ title, content }),
        mode: 'cors',
        cache: 'default'
    })
    return [await request.status, await request.json()]
}

const putCurrentUser = async (data, token) => {
    let request = await fetch(routes.currentUserUpdate , {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data),
        mode: 'cors',
        cache: 'default'
    })
    return [await request.status, await request.json()]
}

export { putArticle, putCurrentUser }