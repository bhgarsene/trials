const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const guestSchema = new Schema({
	firstName: {
		type: String,
		trim: true,		
		required: true,
	},
	lastName: {
		type: String,
		trim: true,		
		required: true,
	},
	country: {
		type: String,
		trim: true,		
		required: true,
	},
	email: {
		type: String,
		trim: true,		
		required: true,
	},
	state: {
		type: String,
		trim: true,		
		required: false,
	},
	postCode: {
		type: String,
		trim: true,		
		required: false,
	},
},
{
	timestamps: true,
}
);

module.exports = mongoose.model('guest', guestSchema)