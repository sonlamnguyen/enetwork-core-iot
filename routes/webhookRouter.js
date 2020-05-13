const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');


router.post('/process-rule', webhookController.process_rule);
router.get('/auth', webhookController.auth);
// router.post('/auth', webhookController.auth);
router.get('/access', webhookController.auth_acl);
// router.post('/access', webhookController.auth_acl);


module.exports = router;