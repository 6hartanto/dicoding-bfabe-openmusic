/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.sql("INSERT INTO users(id, username, password, fullname) VALUES ('old_user', 'old_user', 'old_user', 'old user')");
    pgm.sql("UPDATE playlists SET owner = 'old_user' WHERE owner = NULL");
    pgm.addConstraint('playlists', 'fk_playlists.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = pgm => {
    pgm.dropConstraint('playlists', 'fk_playlists.owner_users.id');
    pgm.sql("UPDATE playlists SET owner = NULL WHERE owner = 'old_user'");
    pgm.sql("DELETE FROM users WHERE id = 'old_user'");
};
