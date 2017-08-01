const mysqlDump = require('mysqldump');
const dateFormat = require('dateformat');
const fs = require('fs');
const jsonfile = require('jsonfile');
const Winrar = require('winrarjs');

const Backup = function () {

}

Backup.prototype.setUser = function (user) {
  this.user = user;
}

Backup.prototype.setPassword = function (pass) {
  this.password = pass;
}

Backup.prototype.setDb = function (dbName) {
  this.db = dbName;
}

Backup.prototype.setTabels = function (tabels) {
  this.tabels = tabels;
}

Backup.prototype.setMinute = function (minute) {
  this.minute = minute;
}

Backup.prototype.backup = function () {
  let current = this;
  return new Promise((resolve, reject) => {
    if(!check_field([current.user, current.password, current.db, current.tabels, current.minute])) reject({error: true, message: 'please fill all required field'});
    let date = new Date();
    date.setMinutes(date.getMinutes() - current.minute);
    date = dateFormat(date, "yyyy-mm-dd hh:MM:ss");
    let where = {};
    current.tabels.forEach((item) => {
      where[item] = `updatedAt > '${date}'`;
    })
    console.log(date);
    let name = `${date.replace(/\s|\:/g, '.')}`;
    mysqlDump({
      host: 'localhost',
      user: current.user,
      password: current.password,
      database: current.db,
      tables: current.tabels, // only these tables
      where, // Only test players with id < 1000
      ifNotExist:true, // Create table if not exist
      dest: `${__dirname}/temp/${name}.sql` // destination file
    },function(err){
      if(err) reject(err);
      let rar = new Winrar(`${__dirname}/temp/${name}.sql`);
      rar.setOutput(`${__dirname}/temp/${name}.zip`);
      rar.zip().then((result) => {
        resolve(result)
      }).catch((err)=> {
        reject(err)
      })

    })
  })
}
function check_field(arr) {
  let output = true;
  arr.forEach((item) => {
    if(!item || typeof item == 'undefined' || item == 'undefined') output = false;
  })
  return output;
}

module.exports = Backup;
