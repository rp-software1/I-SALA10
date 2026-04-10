const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAuthSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

const UserAuth = mongoose.model('UserAuth', UserAuthSchema);

module.exports = UserAuth;