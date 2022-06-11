import express from 'express';
import bcrypt from 'bcrypt';
import { createUser, checkUserByName } from './router/helper.js'

const router = express.Router();

// password hashing
async function genHashPassword(password) {
    // generating salt
    const salt = await bcrypt.genSalt(10);
    // hashing password with salt
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

router.post('/singin', express.json(), async (req, res) => {
    const { name, password } = req.body;
    // password hashing
    const hashedPassword = await genHashPassword(password)

    // checking for username existence
    const result = await checkUserByName(name) == null ?
        await createUser({ name: name, password: hashedPassword }) :
        { msg: 'user already exist' };

    res.send(result);
})

export const usersRouter = router;