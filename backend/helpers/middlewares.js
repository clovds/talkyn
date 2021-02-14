const { query } = require("../database");
const { hashPassword } = require("../helpers");
const loginValidator = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		password = hashPassword(password);
		let sql = `SELECT * FROM users WHERE user_email = '${email}' AND user_password = '${password}' AND user_google_login = 0`;
		const response = await query(sql);
		if (response.length !== 0) {
			return next();
		} else {
			await query(
				`INSERT INTO users (user_email, user_password, user_google_login) VALUES ('${email}', '${password}', 0 )`
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
