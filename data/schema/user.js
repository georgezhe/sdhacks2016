var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var UserSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    url: [{
        type: String
    }],
    price:[{
        type: String
    }],
    meta: {
        created_at: {
            type: Date,
            'default': Date.now,
            set: function(val) {
                return undefined;
            }
        },
        updated_at: {
            type: Date,
            'default': Date.now
        }
    }
});


module.exports = UserSchema;
