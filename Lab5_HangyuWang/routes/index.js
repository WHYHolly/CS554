const peopleRoute = require('./peopleRoute');

const constructorMethod = app => {
  app.use("/api/people", peopleRoute);

  app.use("*", (req, res) => {
    res.status(404).json({
      error: "Sorry, this page cannot be found."
    });
  });
};

module.exports = constructorMethod;