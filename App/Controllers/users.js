const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = {
	create: function (req, res, next) {

		userModel.create(req.body, function (err, result) {
			if (err)
				next(err);
			else
				res.json({ status: "success", message: "User added successfully!!!", data: null });

		});
	},

	authenticate: function (req, res, next) {
		userModel.findOne({ email: req.body.email }, function (err, userInfo) {
			if (err) {
				next(err);
			} else {
				if (userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
					// console.log('login successful');
					const token = jwt.sign({ _id: userInfo._id }, process.env.TOKEN_SECRET)

					res.status(200).send({ status: "success", message: "user found!!!", data: { user: userInfo, token: token } });

				} else {
					res.status(400).send({ status: "error", message: "Invalid email/password!!!", data: null })
				}
			}
		});
	},

}					
