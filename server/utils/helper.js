const bcrypt = require('bcrypt');

exports.comparePassword = async (password, hashedPassword) => {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
}