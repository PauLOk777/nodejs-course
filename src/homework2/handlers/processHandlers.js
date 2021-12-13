import logger from '../loggers/winstonLogger.js';

const processHandlers = {
    uncaughtException: err => {
        logger.fatal(`Uncaught Exception: ${err.stack || err}`);
        process.exit(1);
    },

    unhandledRejection: err => logger.error(`Unhandled Rejection at ${err.stack || err}`)
};

export default processHandlers;
