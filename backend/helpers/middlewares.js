const { query } = require("../database");
const { hashPassword } = require("./hash");
// const { hashPassword } = require("../helpers/hash");
const loginValidator = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		console.log("masuk login");
		const encryptedPassword = hashPassword(password);
		console.log(encryptedPassword);
		let sql = `SELECT * FROM users WHERE user_email = '${email}' AND user_password = '${encryptedPassword}' AND user_google_login = 0`;
		const response = await query(sql);
		if (response.length !== 0) {
			return next();
		} else {
			await query(
				`INSERT INTO users (user_email, user_password, user_google_login) VALUES ('${email}', '${encryptedPassword}', 0 )`
			);
			next();
		}
	} catch (err) {
		console.log(err.message);
		return res.send(err.message);
	}
};

module.exports = {
	loginValidator,
};
