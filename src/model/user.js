const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = new schema({
    user_name: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },
    is_verified: {
        type: Boolean,
        default: false,
    }
});

userSchema.set('timestamps', true);

module.exports = mongoose.model('user', userSchema);