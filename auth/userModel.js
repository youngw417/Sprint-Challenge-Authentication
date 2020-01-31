const userDb = require('../database/dbConfig');

module.exports = {
    addUser,
    findById,
    findByUser
}

function addUser(user) {
    return userDb('users').insert(user)
    .then( item  => {
        const [id] = item;
        return findById(id)
    })
    .catch()

}

function findById(id){
    return userDb('users').select('id','username').where({id}).first()
}

function findByUser(user) {
    return userDb('users').where('username', user) .first()
}