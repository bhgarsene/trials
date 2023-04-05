const jwt = require('jsonwebtoken')
const UserModel = require('./App/Models/users');
const bcrypt = require('bcrypt');

module.exports = async function (req, res, next) {
    const username = req.header('username');
    const password = req.header('password');
    if (!username || !password) return res.status(400).send('Access Denied');
    try {
        await UserModel.findOne({ email: username }, function (err, userInfo) {
            if (err) {
                res.status(400).send('Invalid credentials')
            } else {
                console.log(username, password);
                if (userInfo != null && bcrypt.compareSync(password, userInfo.password)) {
                    next();
                } else {
                    res.status(400).send('Invalid credentials')
                }
            }
        });

    } catch (err) {
        res.status(400).send('Invalid token')
    }
}