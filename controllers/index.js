const auth = require("./auth");
const user = require("./user");
const router = require("router")();

router.use("/auth", auth);
router.use("/user", user);

module.exports = router;