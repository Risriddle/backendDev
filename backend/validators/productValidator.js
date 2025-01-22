const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string().min(3).max(100).trim().required()
        .messages({
            "string.empty": "Product name cannot be empty",
            "string.min": "Product name must be at least 3 characters",
            "string.max": "Product name cannot exceed 100 characters",
            "any.required": "Product name is required"
        }),

    description: Joi.string().max(255).trim().optional()
        .messages({
            "string.max": "Description cannot exceed 500 characters"
        }),

    price: Joi.number().positive().required()
        .messages({
            "number.base": "Price must be a number",
            "number.positive": "Price must be a positive value",
            "any.required": "Price is required"
        }),

    category: Joi.string().min(3).max(50).trim().required()
        .messages({
            "string.empty": "Category cannot be empty",
            "string.min": "Category must be at least 3 characters",
            "string.max": "Category cannot exceed 50 characters",
            "any.required": "Category is required"
        })
});

module.exports = productSchema;
