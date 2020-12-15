import express from 'express';
import PageController from "../controllers/page";

const router = express.Router();
const pageController = new PageController();

router
    .get('/', pageController.getPage)
    .post('/page', pageController.postPage);

export default router;