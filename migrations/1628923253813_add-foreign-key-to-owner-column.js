/* eslint-disable camelcase */

exports.up = pgm => {
    // membuat user baru.
    pgm.sql("INSERT INTO users(id, username, password, fullname) VALUES ('old_user', 'old_user', 'old_user', 'old user')");
 
    // mengubah nilai owner pada playlist yang owner-nya bernilai NULL
    pgm.sql("UPDATE playlists SET owner = 'old_user' WHERE owner = NULL");
 
    // memberikan constraint foreign key pada owner terhadap kolom id dari tabel users
    pgm.addConstraint('playlists', 'fk_playlists.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = pgm => {
    // menghapus constraint fk_playlists.owner_users.id pada tabel playlists
    pgm.dropConstraint('playlists', 'fk_playlists.owner_users.id');
 
    // mengubah nilai owner old_user pada playlist menjadi NULL
    pgm.sql("UPDATE playlists SET owner = NULL WHERE owner = 'old_user'");
 
    // menghapus user baru.
    pgm.sql("DELETE FROM users WHERE id = 'old_user'");
};
