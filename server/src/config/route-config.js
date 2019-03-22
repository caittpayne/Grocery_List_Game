module.exports = {
  init(app) {
    const userRoutes = require("../routes/users");
    const listRoutes = require("../routes/lists");

    app.use("/users", userRoutes);
    app.use("/lists", listRoutes);
  }
};
