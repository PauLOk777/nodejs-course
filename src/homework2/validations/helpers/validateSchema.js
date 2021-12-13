import logger from '../../loggers/winstonLogger.js';

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
            logger.error(`Method: validateSchema, body: ${JSON.stringify(req.body)}, error: ${JSON.stringify(result.error.details)}`);
            res.status(400).json(errorResponse(result.error.details));
            return;
        }

        next();
    };
}

export default validateSchema;
