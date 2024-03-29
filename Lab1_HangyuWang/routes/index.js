const taskRoutes = require('./taskRoute');

const constructorMethod = app => {
  app.use("/api/tasks", taskRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found ..." });
  });
};

module.exports = constructorMethod;