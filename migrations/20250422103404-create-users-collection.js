const bcrypt = require('bcrypt');

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

    await db.createCollection('users');

    const users = await Promise.all([
      bcrypt.hash('password', 10).then((hashedPassword) => ({
        nim: 'admin',
        name: 'admin',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
      })),
      bcrypt.hash('password', 10).then((hashedPassword) => ({
        nim: '222410101050',
        name: 'Raka Febrian Syahputra',
        password: hashedPassword,
        role: 'student',
        createdAt: new Date(),
      })),
    ]);
    
    await db.collection('users').insertMany(users);
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});

    await db.collection('candidates').drop();
  }
};
