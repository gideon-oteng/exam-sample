import express from 'express';
import AuthController from "../controllers/auth";

const AUTH_PREFIX = '/auth';
const router = express.Router();
const authController = new AuthController();

router
    .get('/login', authController.getLoginForm)
    .post('/', authController.login)
    .get('/logout', authController.logout);

export default router
export { AUTH_PREFIX }