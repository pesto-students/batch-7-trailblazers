import express from 'express';
import dashboard from '../controllers/dashboardController';

const router = express.Router();

/* GET home page. */
router.post('/add/:id', dashboard.addBoard);
router.get('/getboards/:id', dashboard.getBoardList);

module.exports = router;