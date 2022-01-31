var bcrypt = require('bcrypt');

exports.encryptpassword = async (password) => {
    try {
        var pass = await bcrypt.hash(password, 10);
        return {
            status: true,
            encrypt: pass
        }
    } catch (error) {
        return {
            status: false,
            msg: "System Error. Please Try Again."
        }
    }
};

exports.comparepassword = async (params) => {
    try {
        const { password, dbPassword } = params;
        var isCompare = await bcrypt.compare(password, dbPassword);
        return isCompare;
    } catch (error) {
        return false;
    }
}