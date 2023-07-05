const { ExpressError } = require("./ExpreesError");
const sqlite3 = require("sqlite3").verbose();

class ExpressDB {
  constructor(options = {}) {
    this.db = new sqlite3.Database(options.databaseName || "expressdb.sqlite");
    this.initializeDatabase();
  }

  initializeDatabase() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS data (
        key TEXT PRIMARY KEY,
        value TEXT
      )
    `;
    this.db.run(createTableQuery, (err) => {
      if (err) {
        throw new ExpressError("Error creating table: " + err);
      }
    });
  }

  set(key, value) {
    const query = `INSERT OR REPLACE INTO data (key, value) VALUES (?, ?)`;
    this.db.run(query, [key, JSON.stringify(value)], (err) => {
      if (err) {
        throw new ExpressError("Error setting data: " + err);
      }
    });
  }

  get(key, defaultValue = null) {
    const query = `SELECT value FROM data WHERE key = ?`;
    return new Promise((resolve, reject) => {
      this.db.get(query, [key], (err, row) => {
        if (err) {
          reject(new ExpressError("Error retrieving data: " + err));
        } else {
          resolve(row ? JSON.parse(row.value) : defaultValue);
        }
      });
    });
  }

  add(key, value) {
    return this.get(key, 0).then((currentValue) => {
      const newValue = currentValue + value;
      this.set(key, newValue);
      return newValue;
    });
  }

  subtract(key, value) {
    return this.add(key, -value);
  }

  push(key, ...items) {
    return this.get(key, []).then((currentValue) => {
      const newValue = [...currentValue, ...items];
      this.set(key, newValue);
      return newValue;
    });
  }

  pull(key, ...items) {
    return this.get(key, []).then((currentValue) => {
      const newValue = currentValue.filter((item) => !items.includes(item));
      this.set(key, newValue);
      return newValue;
    });
  }

  delete(key) {
    const query = `DELETE FROM data WHERE key = ?`;
    this.db.run(query, [key], (err) => {
      if (err) {
        throw new ExpressError("Error deleting data: " + err);
      }
    });
  }

  clear() {
    const query = `DELETE FROM data`;
    this.db.run(query, (err) => {
      if (err) {
        throw new ExpressError("Error clearing data: " + err);
      }
    });
  }

  close() {
    this.db.close();
  }
}

module.exports = {
  ExpressDB,
};