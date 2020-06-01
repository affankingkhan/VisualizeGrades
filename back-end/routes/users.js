const express = require("express");
const router = express.Router();
const mySQLConnection = require("../connection");

/**
 * get all the users
 */
router.get("/", (req, res) => {
	let sql = "SELECT * FROM Users";
	mySQLConnection.query(sql, (err, result) => {
		if (err) throw err;
		else {
			res.json(result);
		}
	});
});

/**
 * Update a specific user
 */

router.post("/update", (req, res) => {
	let newValues = [
		req.body.firstName,
		req.body.lastName,
		req.body.email,
		req.body.age,
		req.body.status,
		req.body.userID
	];
	let sql = `UPDATE Users
     SET firstName=?, lastName=?,email=?,age=?,status=?, updatedAt=CURRENT_TIMESTAMP
     WHERE userID=?`;

	mySQLConnection.query(sql, newValues, (err, result) => {
		if (err) throw err;
		else {
			res.json(result);
		}
	});
});

router.post("/add", (req, res) => {
	let newValues = [
		req.body.firstName,
		req.body.lastName,
		req.body.email,
		req.body.age,
		req.body.status
	];
	let sql = `INSERT INTO Users
     (firstName, lastName,email,age,status,createdAt)
     VALUES (?,?,?,?,?,CURRENT_TIMESTAMP)`;

	mySQLConnection.query(sql, newValues, (err, result) => {
		if (err) throw err;
		else {
			res.json(result);
		}
	});
});

router.post("/delete", (req, res) => {
	let userID = [req.body.userID];

	let sql = `DELETE FROM Users WHERE (userID=?)`;
	mySQLConnection.query(sql, userID, (err, result) => {
		if (err) throw err;
		else {
			res.json(result);
		}
	});
});

router.get("/hello", (req, res) => {
	res.send("<h1>HELLO WORLDD</h1>");
});

module.exports = router;
