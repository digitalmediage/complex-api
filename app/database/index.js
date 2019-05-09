const mongoose = require('mongoose');


class Database {
  constructor() {
    this.url = process.env.MONGODB_CLOUD_URL;
    this._connect();
  }

  _connect() {
    mongoose.connect(this.url, {
      useNewUrlParser: true
    })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Database connection successful')
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(`Database connection error => ${err}`);
      });
  }
}

module.exports = new Database();
