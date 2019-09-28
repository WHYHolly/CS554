const express = require("express");
const router = express.Router();
const taskfunc = require("../data");
const taskData = taskfunc.tasks;
//1
router.get("/", async (req, res) => {
    try {
        //console.log(req.query.skip);
        const resData = await taskData.getAllTasks(req.query.skip, req.query.take);
        res.status(200).json(resData);
    } catch (e) {
        res.status(500).json({error: e});
    }
});
//2
router.get('/:id', async (req, res) => {
    
    try {
      const OneTask = await taskData.getTaskByID(req.params.id);
      res.status(200).json(OneTask);
    } catch (e) {
        res.status(500).json({error: e});
    }
});
//3
router.post('/', async (req, res) => {
    //taskID, title, description, hoursEstimated, completed
    //req.body.name
    try {
      const addTask = await taskData.createTask(req.body.title,req.body.description, req.body.hoursEstimated,req.body.completed,req.body.comments);
      res.status(200).json(addTask);
    } catch (e) {
        res.status(500).json({error: e});
    }
});
//4
router.put('/:id', async (req, res) => {
    //taskID, title, description, hoursEstimated, completed
    //req.body.name
    try {
      const UpdateTask = await taskData.UpdateTaskPut(req.params.id,req.body.title,req.body.description, req.body.hoursEstimated,req.body.completed);
      res.status(200).json(UpdateTask);
    } catch (e) {
        res.status(500).json({error: e});
    }
});
//5
router.patch('/:id', async (req, res) => {
    //taskID, title, description, hoursEstimated, completed
    //req.body.name
    try {
      const UpdateTask = await taskData.UpdateTaskPatch(req.params.id,req.body.title,req.body.description, req.body.hoursEstimated,req.body.completed);
      res.status(200).json(UpdateTask);
    } catch (e) {
        res.status(500).json({error: e});
    }
});
//6
router.post('/:id/comments', async (req, res) => {
    //taskID, title, description, hoursEstimated, completed
    //req.body.name
    try {
      const UpdateTask = await taskData.createComment(req.params.id,req.body.name,req.body.comment);
      res.status(200).json(UpdateTask);
    } catch (e) {
        res.status(500).json({error: e});
    }
});
//7
router.delete('/:taskId/:commentId', async (req, res) => {
    //taskID, title, description, hoursEstimated, completed
    //req.body.name
    try {
    //console.log(`I am in delete route`)
      const UpdateTask = await taskData.deleteComment(req.params.taskId, req.params.commentId);
      res.status(200).json(UpdateTask);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

module.exports = router;