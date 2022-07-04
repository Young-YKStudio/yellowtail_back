const express = require('express');
const router = express.Router();

const { registerMenu, listAllMenu } = require('../controllers/menu');

router.route('/register').post(registerMenu);
router.route('/allmenu').get(listAllMenu);

module.exports = router;