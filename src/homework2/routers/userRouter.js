import express from 'express';
import userHandlers from '../handlers/userHandlers.js';
import validateSchema from '../validations/helpers/validateSchema.js';
import userSchema from '../validations/schemas/userSchema.js';

const router = express.Router();

router.get('/:id', userHandlers.getUserById);
router.get('/', userHandlers.getUsers);
router.post('/', validateSchema(userSchema), userHandlers.createUser);
router.put('/:id', validateSchema(userSchema), userHandlers.modifyUser);
router.delete('/:id', userHandlers.safeDeleteUser);

export default router;
