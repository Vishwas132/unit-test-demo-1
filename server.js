const app = require("./app");
const db = require("./models/index");

db.sequelize
  // .sync({alter: true})
  .sync({force: true})
  .then(() => authenticate())
  .then(() => {
    return app.listen(3000, () => {
      console.log(`Server listning on at http://localhost:${3000}`);
    });
  })
  .catch((err) => {
    console.trace("Server Error: ", err);
  });