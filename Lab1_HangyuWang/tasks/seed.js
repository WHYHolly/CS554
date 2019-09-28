const Mock = require('mockjs');
const Random = Mock.Random;
const connection = require("../config/mongoConnection");
const Task = require('../data/tasks');

async function createDB(num) {

    const db = await connection();

    for (let i = 0; i < num; i++) {

        await Task.createTask(Random.word(4, 10), Random.word(8, 30), Random.integer(1, 100), Random.boolean(), [])

    }
    console.log("seeding done!");

    await db.serverConfig.close();
    //return;
}

createDB(110);