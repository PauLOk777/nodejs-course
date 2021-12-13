import express from 'express';
import userRouter from './routers/userRouter.js';
import logRequest from './middlewares/logRequest.js';
import logError from './middlewares/logError.js';
import processHandlers from './handlers/processHandlers.js';

const app = express();
const PORT = process.env.PORT || 3000;
const USERS_ENDPOINT = '/users';

process.on('uncaughtException', processHandlers.uncaughtException);
process.on('unhandledRejection', processHandlers.unhandledRejection);

app.use(express.json());
app.use(logRequest);
app.use(USERS_ENDPOINT, userRouter);
app.use(logError);

app.listen(PORT);
console.log(`>>> Server has been running at port ${PORT}`);
