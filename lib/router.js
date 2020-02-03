const express = require('express');
const router = express.Router();
const FBController = require('./controllers/fbMessenger');

router.post('/webhook', FBController.receiveRequest);
router.get('/webhook', FBController.webhookVerification);

module.exports = router;
