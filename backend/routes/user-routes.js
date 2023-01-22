const express = require("express");
const router = express.Router();
const userController = require("../api/user-controller.js");

router.get('/:user',userController.getMessages)
router.get('group/:user',userController.getGroups)
router.post('/:user',userController.addMessage)
router.post('/groupReq/request',userController.newInvite)
router.post('/friendReq/follow',userController.newInvite)
router.get('/searchbar/search',userController.getAllusers)

module.exports = router;