const routes = require('../../config/api-routes.json')

const method = 'DELETE'

const deleteArticle = async (token, id) => {
    let request = await fetch(`${routes.articleDelete}\\${id}`, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        mode: 'cors',
        cache: 'default'
    })
    return [await request.status, null]
}


export { deleteArticle }