
const { User, Code } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const send = require('../mail/mail')


const randomText = (size) => {
    let text = ""
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    for (let i = 0; i <= size; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
const filterArray = (toValidate, allowInput, up) => {
    let data = []
    for(let element of toValidate){
        if(up) {
            element = element.toUpperCase()
        }
        if(allowInput.indexOf(element) !== -1){
            data.push(element)
        }
    }
    return data
}

exports.loginUser = async (req, res) => {
    User.findOne({ where: { email: req.body.email }})
        .then(user => {
            if(user) {
                if(user.verified) {
                    bcrypt.compare(req.body.password, user.password)
                        .then(result => {
                            if(result) {
                                res.status(200).json({
                                    userId: user.id,
                                    userRole: (JSON.parse(user.role)),
                                    token: jwt.sign(
                                        {userId: user.id },
                                        process.env.JWT_KEY,
                                        { expiresIn: process.env.JWT_TIME }
                                    )
                                })
                            }
                            else{
                                res.status(401).json({ error: 'Password does not match !' })
                            }
                        })
                        .catch(() => res.status(500).json({ error: 'An error has occurred on the server !'}))
                }
                else {
                    res.status(449).json({ error: "User not register yet !" })
                }
                
            }
            else {
                res.status(401).json({ error: 'Connot find the user !' })
            }
        })
        .catch(() => res.status(500).json({ error: 'An error has occurred on the server !'}))
}


exports.addUser = async (req, res) => {
    const role = filterArray(req.body.role, ['READER', 'UPDATER', 'WRITER', 'DELETER', 'ADMIN'], true)
    User.create({ 
        email: req.body.email,
        verified: false,
        role: JSON.stringify(role)
    })
        .then(user => {
            if(user) {
                send(user.email, process.env.SITE_NAME, 'new_temp', {link: `${process.env.SITE_URL}/admin/register?email=${user.email}`})
                res.status(201).json({ message: 'User added !' })
            }
        })
        .catch(error => {
            switch (error.errors[0].type) {
                case "unique violation" :
                    res.status(400).json({ 
                        errorType : error.errors[0].type, 
                        path: (error.errors[0].path.split('.')[1]) 
                    })
                    break
                default :
                    res.status(500).json({ error: 'An error has occurred on the server !'})
                    break
            }
        })
}


exports.registerUser = async (req, res) => {
    User.findOne({ where : { email: req.body.email }})
        .then(user => {
            if(user) {
                if(!user.verified) {
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            user.username = req.body.username
                            user.password = hash
                            user.save()
                                .then(() => {
                                    const randCode = randomText(6)
                                    Code.create({ 
                                        userId: user.id,
                                        code: randCode
                                    })
                                        .then(() => {
                                            send(
                                                user.email, 
                                                `${process.env.SITE_NAME} - Validation du mail`, 'verify_code', 
                                                { 
                                                    site_url: process.env.SITE_URL,
                                                    site_name: process.env.SITE_NAME,
                                                    valid_url: `${process.env.SITE_URL}/admin/valid-user?email=${user.email}&code=${randCode}`
                                                }
                                            )
                                            res.status(201).json({ message: 'Mail send !' })
                                        })
                                        .catch(() => res.status(500).json({ error: 'An error has occurred on the server !'}))
                                })
                                .catch(error => {
                                    switch (error.errors[0].type) {
                                        case "unique violation" :
                                            res.status(400).json({ 
                                                errorType : error.errors[0].type, 
                                                path: (error.errors[0].path.split('.')[1]) 
                                            })
                                            break
                                        default :
                                        res.status(500).json({ error: 'An error has occurred on the server !'})
                                            break
                                    }
                                })
                                
                        })
                        .catch(() => res.status(500).json({ error: 'An error has occurred on the server !'}))
                }
                else {
                    res.status(450).json({ error: 'User is already register !' })
                }
            }
            else {
                res.status(401).json({ error: 'You are not allow to register !' })
            }
        })
        .catch(() => res.status(500).json({ error: 'An error has occurred on the server !'}))
}


exports.validUser = (req, res) => {
    User.findOne({ where: { email: req.body.email }})
        .then(user => {
            if(user) {
                if(!user.verified) {
                    Code.findAll({ where: { userId: user.id }})
                        .then(codes => {
                            let code = codes[codes.length - 1]
                            const date = new Date()
                            if(code.code == req.body.code) {
                                if((date - code.createdAt) < (24 * 3600 * 1000)) {
                                    user.verified = true
                                    user.save()
                                        .then(user => {
                                            res.status(200).json({
                                                userId: user.id,
                                                role: (JSON.parse(user.role)),
                                                token: jwt.sign(
                                                    {userId: user.id },
                                                    process.env.JWT_KEY,
                                                    { expiresIn: process.env.JWT_TIME }
                                                )
                                            })
                                        })
                                        .catch(() => res.status(500).json({ error: 'An error has occurred on the server !'}))
                                }
                                else {
                                    res.status(405).json({ error: 'Code expired !'})
                                }
                                
                            }
                            else {
                                res.status(405).json({ error: 'Code is not valid !'})
                            }
                        })
                }
                else {
                    res.status(401).json({ error: 'User is already register !' })
                }
            }
            else {
                res.status(401).json({ error: 'User not find ' })
            }
        })
        .catch(() => res.status(500).json({ error: 'An error has occurred on the server !'}))
}

exports.getUser = (req, res) => {
    User.findOne({ where: { id: req.user.id }})
        .then(user => {
            if(user) {
                res.status(200).json({ user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }})
            }
            else {
                res.status(400).json({ error: `Cannot find the user !`})
            }
            
        })
        .catch(() => res.status(500).json({ error: 'An error has occurred on the server !'}))
}

exports.okToken = (req, res) => {
    res.status(200).json({ user: { id: req.user.id, role: req.user.role } })
}

exports.updateUser = async (req, res) => {
    User.findOne({ where : { id : req.user.id }})
        .then(user => {
            if(user) {
                const updateUser = () => {
                    for(const property in req.body){
                        if(property !== 'password') {
                            user[property] = req.body[property]
                        }
                    }
                    user.save()
                        .then(() => res.status(200).json({ message: `User ${req.user.id} updated !` }))
                        .catch(() => res.status(500).json({ error: 'An error has occurred on the server !'}))
                }
                if(req.body.password) {
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            if(!hash) {
                                return res.status(500).json({ error: 'An error has occurred on the server !' })   
                            }
                            else {
                                user.password = hash
                                updateUser()
                            }
                        })
                }
                updateUser()
            }
            else {
                res.status(400).json({ error: 'Cannot find the user !' })
            }
        })
        .catch(() => res.status(500).json({ error: 'An error has occurred on the server !'}))
}
