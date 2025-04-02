const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const userModel = require('../schemas/userSchema');
//** creating new user */

async function createUser(params) {
    try {
        const userId = uuidv4();
        const payload = {
            ...params,
            userId: userId,
        }
        const response = await userModel.create(payload);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('something went wrong')
    }
}

//** Validate user */
async function validateUser(params) {
    try {
        const userDetails = await userModel.findOne({ email: params?.username });

        if (!userDetails) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(params?.password, userDetails.password);

        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        return userDetails;
    } catch (error) {
        console.error(error);
        throw new Error(error?.message || "Something went wrong!");
    }
}


module.exports = {
    createUser,
    validateUser,
}