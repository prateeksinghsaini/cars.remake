const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const adminRoutes = require('./routes/adminRoutes')
const loginRoutes = require('./routes/loginRoutes')
const session = require('express-session')
const { v4: uuidv4 } = require('uuid');

mongoose.set('strictQuery', true )

const app = express()

const dbURI = 'mongodb+srv://prateek25:idkmypassword@node-tuts.w3hag0b.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then((result)=>{
        app.listen(3000)
        console.log('connected to db');
    })
    .catch((err)=>{
        console.log(err)
    })

app.set('view engine', 'ejs')
app.set('views', './views')



app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(session({
    secret: uuidv4(),
    resave: 'false',
    saveUninitialized: true
}))

// routes

app.get('/', (req, res)=>{
    res.render('index', { title: 'Home' })
})
app.get('/about', (req, res)=>{
    res.render('about', { title: 'About' })
})
app.get('/about-us', (req, res)=>{
    res.redirect('about')
})
app.get('/contact', (req, res)=>{
    res.render('contact', { title: 'Contact'})
})

// login routes
app.use('/admin-login', loginRoutes)

// admin routes
app.use('/admin', adminRoutes)

app.use((req, res)=>{
    res.status(404).render('404', { title: 'Error' })
})



// app.get('/', (req, res)=>{
//     res.sendFile('./views/index.html', { root: __dirname })
// })
// app.get('/about', (req, res)=>{
//     res.sendFile('./views/about.html', { root: __dirname })
// })
// app.get('/about-us', (req, res)=>{
//     res.redirect('./views/about.html', { root: __dirname })
// })
// app.get('/contact', (req, res)=>{
//     res.sendFile('./views/contact.html', { root: __dirname })
// })
// app.use((req, res)=>{
//     res.status(404).sendFile('./views/404.html', { root: __dirname })
// })











// const http = require('http')
// const fs = require('fs')

// const server = http.createServer((req, res)=>{
//     console.log(req.url, req.method)
//     res.setHeader('Content-type', 'text/html')

//     let path = './views/'
//     switch(req.url){
//         case '/':
//             path += 'index.html';
//             res.statusCode =200;
//             break;
//         case '/about-us':
//             res.statusCode = 301;
//             res.setHeader('Location', '/about')
//             res.end();
//             break;
//         case '/about':
//             path += 'about.html';
//             res.statusCode =200;
//             break;
//         case '/contact':
//             path += 'contact.html';
//             res.statusCode =200;
//             break;
//         default:
//             path += '404.html';
//             res.statusCode =404;
//             break;
//     }

//     fs.readFile(path, (err, data)=>{
//         if(err){
//             console.log(err);
//             res.end()
//         } else {
//             res.write(data)
//             res.end()
//         }
//     })

//     // res.setHeader('Content-type', 'text/plain')
//     // res.write('Hello there')
//     // res.end()

// })

// server.listen(8000, 'localhost', ()=>{
//     console.log('listening for request on port 8000...');
// })
