const express = require("express")
const next = require("next")
require('dotenv').config()
const serverApp = require('./server/app')

const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== "production"

const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

console.log(`> App launch in ${dev ? "development" : "production"}.`)

nextApp
    .prepare()
    .then(() => {
        const app = express()

        app.use(serverApp)

        app.get("*", (req, res) => {
            return handle(req, res)
        })

        app.listen(PORT, err => {
            if (err) throw err
            console.log(`> Ready on ${PORT}`)
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })