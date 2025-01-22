const productSchema = require("../validators/productValidator");


const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            errors: error.details.map(err => err.message)
        });
    }

    next();
};

module.exports = validateProduct;
