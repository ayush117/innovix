const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}));

// const schemaJoi = Joi.object({
//   username: Joi.string()
//       .alphanum()
//       .min(3)
//       .max(30)
//       .required(),

//   password: Joi.string()
//       .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

//   repeat_password: Joi.ref('password'),

//   access_token: [
//       Joi.string(),
//       Joi.number()
//   ],

//   email: Joi.string()
//       .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
// })

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
