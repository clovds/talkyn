const Crypto = require("crypto");
require("dotenv/config");
const hashPassword = (pass) => {
	return Crypto.createHmac("sha256", process.env.HASH_KEY)
		.update(pass)
		.digest("hex");
};
module.exports = { hashPassword };
