const { ExpressDB } = require('../expressdb');

async function testSetAndGet() {
  const db = new ExpressDB();
  try {
    db.set('name', 'John Doe');
    console.log(`Value: ${await db.get('name')}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    db.close();
  }
}

async function testAddAndSubtract() {
  const db = new ExpressDB();
  try {
    console.log(`Incremented Value: ${await db.add('counter', 5)}`);
    console.log(`Decremented Value: ${await db.subtract('counter', 2)}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    db.close();
  }
}

async function testPushAndPull() {
  const db = new ExpressDB();
  try {
    console.log(`List Value: ${await db.get('list')}`);
    console.log(`Updated List Value: ${await db.push('list', 'item1', 'item2')}`);
    console.log(`List Value: ${await db.get('list')}`);
    console.log(`Updated List Value: ${await db.pull('list', 'item1')}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    db.close();
  }
}

async function testDelete() {
  const db = new ExpressDB();
  try {
    db.delete('name');
    console.log(`Value: ${await db.get('name')}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    db.close();
  }
}

async function testClear() {
  const db = new ExpressDB();
  try {
    db.clear();
    console.log(`Value: ${await db.get('counter')}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    db.close();
  }
}

async function main() {
  await testSetAndGet();
  await testAddAndSubtract();
  await testPushAndPull();
  await testDelete();
  await testClear();
}

main();