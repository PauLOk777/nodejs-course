const errorResponse = schemaErrors => ({
    status: 'failed',
    errors: schemaErrors.map(({ path, message }) => ({ path, message }))
});

function validateSchema(schema) {
    return (req, res, next) => {
        const result = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });

        if (result.error) {
            res.status(400).json(errorResponse(result.error.details));
            return;
        }

        next();
    };
}

export default validateSchema;
