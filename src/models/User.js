const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    stats: {
        messages: {
            type: Number,
            default: 0
        },
        voiceTime: {
            type: Number,
            default: 0
        }
    },
    warns: [{
        reason: String,
        mod: String,
        date: Date
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;