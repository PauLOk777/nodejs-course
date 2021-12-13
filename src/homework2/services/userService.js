import users from '../data/users.js';
import { v4 as uuidv4 } from 'uuid';

const userService = {
    getUserById: id => users
        .filter(user => !user.isDeleted)
        .find(user => user.id === id),

    getUsers: (loginSubstring = '', limit = users.length) => users
        .filter(user => !user.isDeleted)
        .filter(user => user.login.includes(loginSubstring))
        .sort((user1, user2) => user1.login.localeCompare(user2.login))
        .splice(0, limit),

    createUser: user => {
        const newUser = { id: uuidv4(), isDeleted: false, ...user };
        users.push(newUser);
        return newUser;
    },

    modifyUser: (id, userData) => {
        const userToModify = userService.getUserById(id);

        if (!userToModify) {
            throw 'There is no user with this id';
        }

        Object.assign(userToModify, userData);
        return userToModify;
    },

    safeDeleteUser: id => {
        const userToDelete = userService.getUserById(id);

        if (!userToDelete) {
            throw 'There is no user with this id';
        }

        userToDelete.isDeleted = true;
        return userToDelete;
    }
};

export default userService;
