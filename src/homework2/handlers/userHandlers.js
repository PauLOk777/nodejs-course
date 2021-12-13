import logger from '../loggers/winstonLogger.js';
import userService from '../services/userService.js';

const userHandlers = {
    getUserById: (req, res) => {
        const id = req.params.id;
        const user = userService.getUserById(id);
        res.json(user);
    },

    getUsers: (req, res) => {
        const { loginSubstring, limit } = req.query;
        const users = userService.getUsers(loginSubstring, limit);
        res.json(users);
    },

    createUser: (req, res) => {
        const user = req.body;
        const newUser = userService.createUser(user);
        res.status(201).json(newUser);
    },

    modifyUser: (req, res) => {
        const id = req.params.id;
        const user = req.body;
        try {
            const modifiedUser = userService.modifyUser(id, user);
            res.json(modifiedUser);
        } catch (err) {
            logger.error(`Method: modifyUser, params: id - ${id}, user - ${JSON.stringify(user)}, error: ${err.stack || err}`);
            res.status(404).end();
        }
    },

    safeDeleteUser: (req, res) => {
        const id = req.params.id;
        try {
            const deletedUser = userService.safeDeleteUser(id);
            res.json(deletedUser);
        } catch (err) {
            logger.error(`Method: safeDeleteUser, params: id - ${id}, error: ${err.stack || err}`);
            res.status(404).end();
        }
    }
};

export default userHandlers;
