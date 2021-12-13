import Joi from 'joi';

export default Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string()
        .regex(new RegExp('[a-zA-Z]'), 'latin')
        .regex(new RegExp('\\d'), 'numeric')
        .required()
        .messages({
            'string.pattern.name': '"password" must contain at least 1 {#name} character'
        }),
    age: Joi.number().integer().min(4).max(130).required()
});
