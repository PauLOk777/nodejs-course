import logger from '../loggers/winstonLogger.js';

// eslint-disable-next-line no-unused-vars
export default (err, _, res, __) => {
    logger.error(err.stack || err);
    res.status(500).json({ message: 'Internal server error' });
};
