const User = require('../models/user.models');

class AuthServices {

    static async login(email, password) {
        try {
            const result = await User.findOne({
                where: { email },
            });
            if(result){
                return password === result.password 
                ? { isValid: true, result } 
                : { isValid: false};
            }
            return { isValid: false};
        } catch (error) {
            throw error;
        }
    }

};

module.exports = AuthServices;