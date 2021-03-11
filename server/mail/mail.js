
// Modules importation
const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const config = require('../config/mail')
const fs = require('fs')

const transporter = nodemailer.createTransport(config)

const readHTMLFile = (path, callback) => { 
    fs.readFile(path, {encoding: 'utf-8'}, (err, html) => {
        if (err) { 
            throw err
        } 
        else { 
            callback(null, html) 
        } 
    })
}

const send = (to, subject, view, replacements) => {
    readHTMLFile('./server/mail/views/' + view + '.html', async (err, html) => {
        const template = handlebars.compile(html)
        const htmlToSend = template(replacements)

        let mailOptions = {
            from: process.env.MAIL_FROM,
            to : to,
            subject : subject,
            html : htmlToSend
        }
        await transporter.sendMail(mailOptions, (error, response) => {
            return true
        })
    })
}

module.exports = send