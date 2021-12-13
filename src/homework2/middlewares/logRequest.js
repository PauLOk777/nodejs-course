import logger from '../loggers/winstonLogger.js';

export default (req, _, next) => {
    const { query, url } = req;
    logger.info(`call with url: ${url}, with query params: ${JSON.stringify(query)}`);
    next();
};
