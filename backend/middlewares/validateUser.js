const userSchema = require("../validators/userValidator");


const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            errors: error.details.map(err => err.message)
        });
    }

    next();
};

module.exports = validateUser;
