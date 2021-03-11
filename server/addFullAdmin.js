
const { User } = require('./models')
const send = require('./mail/mail')

const addUser = (email) => {
    User.create({
            email: email,
            verified: false,
            role: JSON.stringify(['FULL_ADMIN'])
        })
        .then(user => {
            if(user) {
                send(user.email, process.env.SITE_NAME, 'new_temp', {link: `${process.env.SITE_URL}/admin/register?email=${user.email}`})
            }
        })
        .catch(error => console.log(error))
}


const addFullAdmin = (userEmailArray) => {
    for(const userEmail of userEmailArray) {
        console.log(userEmail)
        User.findOne({ where: { email: userEmail }})
            .then(user => {
                if(!user) {
                    addUser(userEmail)
                }
            })
            .catch(error => console.log(error))
    }
}

addFullAdmin(JSON.parse(process.env.FULL_ADMIN))