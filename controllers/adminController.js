const Msg = require('../models/msg');

const adminPage = (req, res)=>{
    Msg.find().sort({ createdAt: -1 })
    .then(result=>{
        res.render('admin', { title: 'Admin', msgs: result })
    })
    .catch((err)=>{
        console.log(err);
    })
}
const createMsg = (req, res)=>{
    const msg = new Msg(req.body)

    msg.save()  
    .then((result)=>{
        res.redirect('/')
    })
    .catch((err)=>{
        console.log(err);
    })
}
const details = (req, res)=>{
    const id = req.params.id
    Msg.findById(id)
    .then(result=>{
        res.render('msg', { title: 'Msg', msg: result })
    })
}
const delMsg = (req, res)=>{
    const id = req.params.id

    Msg.findByIdAndDelete(id)
    .then(result=>{
        res.json({ redirect: '/admin-login/admin' })
    })
    .catch(err=>{
        console.log(err);
    })
}

module.exports = {
    adminPage, createMsg, details, delMsg
}