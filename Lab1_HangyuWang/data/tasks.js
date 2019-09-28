const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const CHK = require("./checker");
const uuidv4 = require('uuid/v4');

async function getAllTasks(skip, take) {

  const tasksCollection = await tasks();

  if (typeof skip === 'undefined') skip = 0;
  if (typeof take === 'undefined') take = 20;

  if(isNaN(Number(skip))){
    throw "Your skip is not valid";
  }else{
    skip = Number(skip);
  }

  if(isNaN(Number(take))){
    throw "Your take is not valid";
  }else{
    take = Number(take);
  }

  if(take<=0 || skip<0 || take>100) throw "Your skip or take is not valid";

  const Alltasks = await tasksCollection.find().skip(skip).limit(take).toArray();

  return Alltasks;
}
//getAllTasks(undefined,1).then(result => console.log(result));

async function getTaskByID(taskID) {
  CHK.CHKStr(taskID);
  
  if (!taskID) throw "You must provide a taskID.";

  const tasksCollection = await tasks();

  const task = await tasksCollection.findOne({ _id: taskID });

  if (task === null) throw "No task with that id";

  return task;
}
//getTaskByID("055c429b-f75a-4c0d-8d3d-feb984539686").then(result => console.log(result));

async function createTask(title, description, hoursEstimated, completed, comments) {

  CHK.CHKStr(title);
  CHK.CHKStr(description);
  CHK.CHKNum(hoursEstimated);
  CHK.CHKBoo(completed);

  if(!Array.isArray(comments)) throw "You must provide an array for comments.";

  if (!title) throw "You must provide a title.";
  if (!description) throw "You must provide a description.";
  if (hoursEstimated<0) throw "You must provide a valid hoursEstimated(non-negative).";

  //validate the initail comments

  for(let i=0; i < comments.length;i++) {
    if(typeof comments[i].name !== "string" || typeof comments[i].comment !== "string") {
      throw `the comment(s) given is not valid`;
    }
    comments[i]._id = uuidv4();
  }

  const tasksCollection = await tasks();

  let newID = uuidv4();

  let newTask = {
    _id: newID,
    title: title,
    description: description,
    hoursEstimated: hoursEstimated,
    completed: completed,
    comments: comments
  };

  const insertInfo = await tasksCollection.insertOne(newTask);
  if (insertInfo.insertedCount === 0) throw "Could not add task.";

  let InTask = await getTaskByID(newID);
  return InTask;
}
//createTask("title", "description", 0, false, []).then(result => console.log(result));

async function UpdateTaskPut(taskID, title, description, hoursEstimated, completed) {
  CHK.CHKStr(taskID);
  if (!taskID) throw "You must provide an id to search for";
  ////////////////////////
  CHK.CHKStr(title);
  CHK.CHKStr(description);
  CHK.CHKNum(hoursEstimated);
  CHK.CHKBoo(completed);

  if(!title) throw "You must provide an newTitle";
  if(!description) throw "You must provide an newDescription";
  if(hoursEstimated<0) throw "You must provide a valid hoursEstimated";

  //title, description, hoursEstimated, completed
  const replacedFields = {};
  replacedFields.title = title;
  replacedFields.description = description;
  replacedFields.hoursEstimated = hoursEstimated;
  replacedFields.completed = completed;

  const tasksCollection = await tasks();

  const updateResult = await tasksCollection.findOneAndUpdate(
    { _id: taskID },
    { $set: replacedFields },
    { returnOriginal: false }
  );
  if (!updateResult.ok) {
    throw `Mongo was unable to update the user: ${taskID}`;
  }
  
  //return await get(newid);
  let UpTask = await getTaskByID(taskID);
  return UpTask;
}
//UpdateTaskPut("title", "description", 0, false, []).then(result => console.log(result));


async function UpdateTaskPatch(taskID, title, description, hoursEstimated, completed) {
  CHK.CHKStr(taskID);
  if (!taskID) throw "You must provide an id to search for";
  ////////////////////////
  if(!(typeof title === "string" || title === undefined)){
    throw `the newTitle should be a string or no input`
  }
  if(typeof title === "string"){
    if(!title) throw "You must provide an newTitle";
  }

  if(!(typeof description === "string" || description === undefined)){
    throw `the newDescription should be a string or no input`
  }
  if(typeof description === "string"){
    if(!description) throw "You must provide an newDescription";
  }

  if(!(typeof hoursEstimated === "number" || hoursEstimated === undefined)){
    throw `the new hoursEstimated should be a number or no input`
  }
  if(typeof hoursEstimated === "number"){
    if(hoursEstimated<0) throw "the new hoursEstimated should be not less than 0";
  }

  if(!(typeof completed === "boolean" || completed === undefined)){
    throw `the new completed should be a boolean or no input`
  }

  //title, description, hoursEstimated, completed
  const replacedFields = {};
  if (typeof title === 'string') {
    replacedFields.title = title;
  }
  if (typeof description === 'string') {
    replacedFields.description = description;
  }
  if (typeof hoursEstimated === 'number') {
    replacedFields.hoursEstimated = hoursEstimated;
  }
  if (typeof completed === 'boolean') {
    replacedFields.completed = completed;
  }

  if (Object.keys(replacedFields).length === 0) {
    throw 'Please indicate the update information to update.';
  }

  const tasksCollection = await tasks();

  const updateResult = await tasksCollection.findOneAndUpdate(
    { _id: taskID },
    { $set: replacedFields },
    { returnOriginal: false }
  );
  if (!updateResult.ok) {
    throw `Mongo was unable to update the user: ${taskID}`;
  }
  
  //return await get(newid);
  let UpTask = await getTaskByID(taskID);
  return UpTask;
}
//UpdateTaskPatch("title", "description", 0, false, []).then(result => console.log(result));


async function createComment(taskID, name, comment) {
  CHK.CHKStr(taskID);
  CHK.CHKStr(name);
  CHK.CHKStr(comment);

  if (!taskID) throw "You must provide a taskID.";
  if (!name) throw "You must provide a name.";
  if (!comment) throw "You must provide nonempty comment.";
  //console.log("Here is it");
  await getTaskByID(taskID);

  let newID = uuidv4();

  let newComment = {
    _id: newID,
    name: name,
    comment: comment
  };

  const tasksCollection = await tasks();

  const updateResult = await tasksCollection.findOneAndUpdate(
    { _id: taskID },
    { $push: { 
      comments: newComment 
    }},
    { returnOriginal: false }
  );

  if (!updateResult.ok) {
    throw `Mongo was unable to update the user: ${taskID}`;
  }

  let NewTask = await getTaskByID(taskID);

  return NewTask;
}
// createComment('055c429b-f75a-4c0d-8d3d-feb984539686', "The name", "the comment").then(result => console.log(result));


async function deleteComment(taskID, commentID){
  CHK.CHKStr(taskID);
  CHK.CHKStr(commentID);

  // const task = await getTaskByID(taskID);
  // console.log(`Task with ID ${JSON.stringify(task)}`);
    
  const tasksCollection = await tasks();
  
  const TaskWithComment = await tasksCollection.findOne(
    {"comments._id":commentID},
    {_id:taskID}
  )
  //console.log(`Task with Comment ${TaskWithComment}`);
  
  if(!TaskWithComment){
    throw `No comment with ID ${commentID}`;
  }
  
  const deleteResult = await tasksCollection.findOneAndUpdate(
      { _id: taskID },
      { $pull: { 
        comments: {
          _id: commentID
        } 
      }}
  );

  if (!deleteResult.ok) {
    throw `Mongo was unable to update the user: ${taskID}`;
  }

  return await getTaskByID(taskID);
  
}
//deleteComment('055c429b-f75a-4c0d-8d3d-feb984539686', "45cf96f0-10ec-4821-88b2-9fcfdc070c9e").then(result => console.log(result));


module.exports = {
  getAllTasks,
  getTaskByID,
  createTask,
  UpdateTaskPut,
  UpdateTaskPatch,
  createComment,
  deleteComment
}
