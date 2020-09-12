const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    joined: { type: Date, default: new Date().toISOString() },
});

const User = mongoose.model('User', userSchema);

export const createUser = async () => {
    const user = new User({
        email: 'example@example.com',
        password: 'hashed-secret',
    });

    const result = await user.save();
    console.log(result);
};
