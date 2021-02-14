const jwt = require("jsonwebtoken");
require("dotenv/config");

const createJWTToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" });
};
const checkToken = (req, res, next) => {
	if (req.method !== "OPTIONS") {
		console.log("check token");
		jwt.verify(req.body.token, process.env.JWT_KEY, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					message: err.message,
					status: "Unauthorized",
				});
			}
			req.user = decoded;
			// console.log(decoded);
		});
		next();
	}
};
module.exports = {
	createJWTToken,
	checkToken,
};
