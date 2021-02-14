const { query } = require("../database");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const { createJWTToken } = require("../helpers");
const { hashPassword } = require("../helpers");

const userLogin = async (req, res) => {
	try {
		const { password, email } = req.body;
		const encryptedPassword = hashPassword(password);
		let sql = `SELECT * FROM users WHERE user_email = '${email}' AND user_password = '${encryptedPassword}' AND user_google_login = 0`;
		const response = await query(sql);
		const token = createJWTToken({ ...response[0] });
		return res.status(200).send({ ...response[0], token });
	} catch (err) {
		console.log(err.message);
		return res.send(err.message);
	}
};

const userGoogleLogin = async (req, res) => {
	try {
		console.log("masuk google");
		const { token } = req.body;
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.CLIENT_ID,
		});
		const { email, sub } = ticket.getPayload();
		const response = await query(
			`SELECT * FROM users WHERE user_google_uid = '${sub}'`
		);

		if (response.length > 0) {
			const token = createJWTToken({ ...response[0] });
			return res.send({ ...response[0], token });
		} else {
			const response2 = await query(
				`INSERT INTO users (user_email,user_google_login,user_google_uid) VALUES ('${email}', ${1}, '${sub}')`
			);
			const token = createJWTToken({
				id: response2.insertId,
				user_email: email,
				user_google_login: 1,
			});
			return res.send({
				id: response2.insertId,
				user_email: email,
				user_google_login: 1,
				token,
			});
		}
	} catch (err) {
		console.log(err.message);
		return res.send(err.message);
	}
};

const userKeepLogin = async (req, res) => {
	try {
		console.log("keeplogin");
		const { id, user_email } = req.user;
		const response = await query(
			`SELECT * FROM users WHERE id=${id} AND user_email='${user_email}'`
		);
		if (response.length === 1) {
			return res.send(response[0]);
		} else {
			return res.send({
				message: "User not found",
			});
		}
	} catch (err) {
		console.log(err.message);
		return res.send(err.message);
	}
};
module.exports = { userLogin, userGoogleLogin, userKeepLogin };
