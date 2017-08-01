const Backup = require('./');

let backup = new Backup();

backup.setUser('root');
backup.setPassword('YcXvQClj');
backup.setDb('nontonanime.js');
backup.setTabels(['user', 'post']);
backup.setMinute(30);

backup.backup().then((done) => {
  console.log(done);
}).catch((err) => {
  console.log(err);
})

// backup({
//   dbUser: 'root',
//   dbPass: 'YcXvQClj',
//   dbName: 'nontonanime.js',
//   dbTables: ['user', 'post'],
//   minutes: 30
// }).then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// })
