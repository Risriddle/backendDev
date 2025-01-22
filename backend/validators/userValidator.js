const Joi = require("joi");

const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!#%*?&])[A-Za-z\\d@$!%*#?&]{8,}$"))
        .required()
        .messages({
            "string.pattern.base": "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        })
});

module.exports = userSchema;
