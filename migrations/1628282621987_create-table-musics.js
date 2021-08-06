/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('musics', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        title: {
            type: 'TEXT',
            notNull: true,
        },
        year: {
            type: 'INT',
            notNull: true,
        },
        performer: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        genre: {
            type: 'VARCHAR(30)',
            notNull: true,
        },
        duration: {
            type: 'INT',
            notNull: true,
        },
        insertedAt: {
            type: 'TEXT',
            notNull: true,
        },
        updatedAt: {
            type: 'TEXT',
            notNull: true
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('musics');
};
