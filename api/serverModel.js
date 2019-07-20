const db = require('../data/dbConfig');

module.exports = {
    get,
    insert
}

async function insert(videogame) {
    return db('videogames').insert(videogame);
}

function get() {
    return db('videogames');
}