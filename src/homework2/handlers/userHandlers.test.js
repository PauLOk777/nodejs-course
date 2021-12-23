import userHandlers from './userHandlers';
import userService from '../services/userService';
import StatusCodes from 'http-status-codes';

jest.mock('../services/userService', () => ({
    getUserById: jest.fn(),
    getUsers: jest.fn(),
    createUser: jest.fn(),
    modifyUser: jest.fn(),
    safeDeleteUser: jest.fn()
}));

describe('Testing of user handlers', () => {
    const ID = 1;
    const UNKNOWN_ID = -1;
    const LOGIN_SUBSTRING = 'gmail';
    const LIMIT = 1;
    const USER_BODY = {
        login: 'my@gmail.com',
        password: 'plain text',
        age: 10
    };

    const mockUser = {
        id: ID,
        login: 'my@gmail.com',
        password: 'plain text',
        age: 10,
        isDeleted: false
    };

    const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(() => mockResponse),
        end: jest.fn()
    };

    test('should find user by id and write json to response', () => {
        const mockRequest = {
            params: {
                id: ID
            }
        };
        userService.getUserById.mockReturnValueOnce(mockUser);

        userHandlers.getUserById(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        expect(userService.getUserById).toHaveBeenCalledWith(ID);
    });

    test('should find users with filters and write json to response', () => {
        const mockRequest = {
            query: {
                loginSubstring: LOGIN_SUBSTRING,
                limit: LIMIT
            }
        };
        userService.getUsers.mockReturnValueOnce([mockUser]);

        userHandlers.getUsers(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith([mockUser]);
        expect(userService.getUsers).toHaveBeenCalledWith(LOGIN_SUBSTRING, LIMIT);
    });

    test('should create user and set 201 status code with new user json to response', () => {
        const mockRequest = {
            body: USER_BODY
        };
        userService.createUser.mockReturnValueOnce(mockUser);

        userHandlers.createUser(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.CREATED);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        expect(userService.createUser).toHaveBeenCalledWith(USER_BODY);
    });

    test('should modify user and write json of modified user to response', () => {
        const mockRequest = {
            params: {
                id: ID
            },
            body: USER_BODY
        };
        userService.modifyUser.mockReturnValueOnce(mockUser);

        userHandlers.modifyUser(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        expect(userService.modifyUser).toHaveBeenCalledWith(ID, USER_BODY);
    });

    test('should set 404 status code to response when trying to modify user with unknown id', () => {
        const mockRequest = {
            params: {
                id: UNKNOWN_ID
            },
            body: USER_BODY
        };
        userService.modifyUser.mockImplementation(() => {
            throw new Error();
        });

        userHandlers.modifyUser(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    });

    test('should safe delete user and write json of deleted user to response', () => {
        const mockRequest = {
            params: {
                id: ID
            }
        };
        userService.safeDeleteUser.mockReturnValueOnce(mockUser);

        userHandlers.safeDeleteUser(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        expect(userService.safeDeleteUser).toHaveBeenCalledWith(ID);
    });

    test('should set 404 status code to response when trying to delete user with unknown id', () => {
        const mockRequest = {
            params: {
                id: UNKNOWN_ID
            }
        };
        userService.safeDeleteUser.mockImplementation(() => {
            throw new Error();
        });

        userHandlers.safeDeleteUser(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    });
});
