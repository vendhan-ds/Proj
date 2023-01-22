const express = require("express");
const router = express.Router();
const groupController = require("../api/group-controller.js");

router.get('/searchbar/:user',groupController.getAllgroups)
router.get('/:user',groupController.getHisGroups)
router.post('/:user',groupController.newGroup)

module.exports = router;