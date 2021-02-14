const router = require("express").Router();
const { loginValidator, checkToken } = require("../helpers");
const { userLogin, userGoogleLogin, userKeepLogin } = require("../controller");

router.post("/login", loginValidator, userLogin);

router.post("/google-login", userGoogleLogin);

router.post("/keep-login", checkToken, userKeepLogin);

module.exports = router;
