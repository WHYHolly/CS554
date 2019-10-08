const express = require("express");
const router = express.Router();
const peoplefunc = require("../data");
const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get("/history", async (req, res) => {
    let lenOfHis = await client.llenAsync('ViewHistory');
    let len = Math.min(lenOfHis, 20);
    let HistoryList = [];
    HistoryList = await client.lrangeAsync('ViewHistory', 0, len - 1);
    let parsedHis = [];
    HistoryList.map((item, i) => {
        parsedHis[i] = JSON.parse(item);
        // console.log(JSON.parse(item));
    });
    // console.log(HistoryList[0]);
    res.status(200).json(parsedHis);
});

router.get("/:id", async (req, res) => {
    // console.log(req.params.id);
    let isnum = /^\d+$/.test(req.params.id);
    //let cur;
    let id;
    // console.log();
    if (isnum) {
        id = parseInt(req.params.id);
    } else {
        return res.status(400).json({
            error: "Please make sure your id is valid."
        });
    }

    try {
        let findID;
        findID = await client.existsAsync(id);
        // console.log("Now the ID we get is " + findID);
        if (findID) {
            // console.log("Here the id exsit in the redis");
            let people = await client.getAsync(id);
            // console.log(people);
            await client.lpush('ViewHistory', people);
            res.status(200).json(people);
        } else {
            // console.log("Here the id NOT exsit in the redis");
            let people = await peoplefunc.getById(id);
            await client.setAsync(id, JSON.stringify(people));
            await client.lpush('ViewHistory', JSON.stringify(people));
            res.status(200).json(people);
        }
    } catch (e) {
        return res.status(500).json({
            error: "Sorry. This id cannot be found."
        });
    }

});

module.exports = router;