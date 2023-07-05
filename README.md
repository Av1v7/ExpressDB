# ExpressDB

ExpressDB is a simple key-value database module for Node.js applications. It provides an easy-to-use interface for storing and retrieving data using SQLite.

## Features

- Set and get key-value pairs
- Increment and decrement numeric values
- Push and pull items to and from an array
- Delete individual keys
- Clear the entire database

## Installation

You can install ExpressDB using npm:

```shell
npm i @aviv-s/express.db
```

### Usage
To use ExpressDB in your Node.js application, follow these steps:

1. Require the ExpressDB module: ```const { ExpressDB, ExpressError } = require('@aviv-s/express.db'); ```
2. Create an instance of the ExpressDB class: ```const db = new ExpressDB();```
3. Use the available methods to interact with the database. Here are some examples: 
```
// Set a value
await db.set('name', 'John Doe');

// Get a value
const value = await db.get('name');
console.log(`Value: ${value}`);

// Increment a value
const incrementedValue = await db.add('counter', 5);
console.log(`Incremented Value: ${incrementedValue}`);

// Decrement a value
const decrementedValue = await db.subtract('counter', 2);
console.log(`Decremented Value: ${decrementedValue}`);

// Push items to an array
const updatedList = await db.push('list', 'item1', 'item2');
console.log(`Updated List Value: ${updatedList}`);

// Pull items from an array
const newList = await db.pull('list', 'item1');
console.log(`Updated List Value: ${newList}`);

// Delete a key
db.delete('name');

// Clear the database
db.clear();
```
4. Make sure to handle errors appropriately. The set, add, subtract, and push methods may throw an ExpressError if there is an issue with the database operation.
```
try {
  // Perform database operations
} catch (error) {
  if (error instanceof ExpressError) {
    console.error(`ExpressDB Error: ${error.message}`);
  } else {
    console.error(`Unknown Error: ${error}`);
  }
}

```
5. Finally, close the database connection when you're done: ```db.close();```

### Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request on the GitHub repository: [https://github.com/Av1v7/ExpressDB/pulls]

### Need Help?

-  **Discord :** Av1v7#2420 || https://discord.gg/Pf2cj9ZNAa.
-  **Twitter :** https://twitter.com/Av1vF.
-  **Gmail :** avivshemesh96@gmail.com.
