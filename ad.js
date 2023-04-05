const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors')
var multer = require('multer');
var bodyParser = require('body-parser');
var path = require('path');
const guestRoute = require('./routes/guests')
const voucherRoute = require('./routes/voucher')
const usersRoute = require('./routes/users')
app.use(cors())

dotenv.config();

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("connected to DB."))
    .catch(err => console.log(err));


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(express.json());

app.use('/api/guests', guestRoute);
app.use('/api/vouchers', voucherRoute)
app.use('/api/users', usersRoute);
app.use("/home", home);
app.get('/', function (req, res) {
    res.json({ status: "success", message: "guests list found!!!", data: "all" });
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`up running server ${PORT}`));
