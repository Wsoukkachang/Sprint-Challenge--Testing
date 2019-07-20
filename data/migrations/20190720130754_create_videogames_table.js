
exports.up = function(knex) {
    return knex.schema.createTable('videogames', tbl => {
        tbl.increments();
        tbl.string('title').notNullable().unique();
        tbl.string('genre').notNullable();
        tbl.integer('releaseYear');
    })
};

exports.down = function(knex) {
    return knex.schema.dropIfTableExists('videogames');
};