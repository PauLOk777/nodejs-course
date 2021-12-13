import express from 'express';
import userRouter from './routers/userRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;
const USERS_ENDPOINT = '/users';

app.use(express.json());
app.use(USERS_ENDPOINT, userRouter);
app.listen(PORT);
console.log(`>>> Server has been running at port ${PORT}`);
