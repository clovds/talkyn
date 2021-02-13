const express = require("express");
const db = require("../database");
const router = express.Router();

router.post("/login", (req, res) => {
	const { username, password, email } = req.body;
	let sql = `SELECT * FROM users WHERE user_username = '${username}' AND user_password = '${password}'`;

	db.query(sql, (err, data) => {
		if (err) return res.status(500).send(err);
		console.log(data);
		if (data.length === 0) {
			console.log("masuk sini");
			let insert = `INSERT INTO users (user_username, user_email, user_password) VALUES ('${username}', '${email}', '${password}' )`;
			db.query(insert, (err, data) => {
				if (err) return res.status(500).send(err);

				return res.status(200).send({ id: data.insertId, ...req.body });
			});
		} else {
			return res.send(data[0]);
		}
	});
});

module.exports = router;
