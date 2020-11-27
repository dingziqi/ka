const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const nodemon = require('nodemon');
const Database = require('warehouse');
const models = require('./model');

let db;
const dbPath = path.resolve(__dirname, './../db.json');

start();

async function start() {
  await initDb();
}

async function initDb() {
  db = new Database({
    version: 1,
    path: dbPath,
  });

  await promisify(fs.access)(dbPath)
    .then(
      () => {
        return db.load();
      },
    )
    .catch((err) => {
      if (err.errno === -4058) {
        return;
      }
      
      fs.unlink(dbPath);
    });

  const modelNames = Object.keys(models);
  modelNames.forEach(name => {
    db.model(name, modelNames[name]);
  })

  console.log(db);
}
