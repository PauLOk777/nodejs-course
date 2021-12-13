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
        try {
            const id = req.params.id;
            const user = req.body;
            const modifiedUser = userService.modifyUser(id, user);
            res.json(modifiedUser);
        } catch (err) {
            res.status(404).end();
        }
    },

    safeDeleteUser: (req, res) => {
        try {
            const id = req.params.id;
            const deletedUser = userService.safeDeleteUser(id);
            res.json(deletedUser);
        } catch (err) {
            res.status(404).end();
        }
    }
};

export default userHandlers;
