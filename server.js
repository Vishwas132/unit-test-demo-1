const app = require("./app");
const db = require("./models/index");

db.sequelize
  .authenticate()
  // .then(() => db.sequelize.sync({force: true}))
  .then(() => {
    return app.listen(3000, () => {
      console.log(`Server listning on at http://localhost:${3000}`);
    });
  })
  .catch((err) => {
    console.trace("Server Error: ", err);
  });