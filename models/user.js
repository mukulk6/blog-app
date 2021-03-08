const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


var user = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    password: { type: String, required: true }
});

user.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    } else {
        bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) {
                return next();
            } else {
                this.password = hash;
                next();
            }

        })
    }

})

user.methods.comparePassword = (hash, password) => {
    console.log(hash, password);
    return bcrypt.compareSync(password,hash);
}

module.exports = mongoose.model('User', user);