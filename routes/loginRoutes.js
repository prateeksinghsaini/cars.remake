const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

const credentials = {
    name : "name",
    password: "1234"
}

router.get('/', (req, res)=>{
    res.render('admin-login', { title: 'Admin-login' })
})

router.post('/login', (req, res)=>{
    if(req.body.name == credentials.name && req.body.password == credentials.password){
        req.session.user = req.body.name
        if(req.session.user){
            router.get('/admin', adminController.adminPage)
            res.redirect('/admin-login/admin')
        }
        res.end()
    }
})

// logout
router.get('/logout', (req, res)=>{
    req.session.destroy()
    res.redirect('/admin-login')
})

module.exports = router;