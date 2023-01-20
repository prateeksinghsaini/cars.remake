const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')



router.post('/', adminController.createMsg)

router.get('/:id', adminController.details)

router.delete('/:id', adminController.delMsg)


module.exports = router;