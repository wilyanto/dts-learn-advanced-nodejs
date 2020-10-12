import express from 'express'
import hbs from 'hbs'
import path from 'path'
import morgan from 'morgan'
import bodyParseer from 'body-parser'
import { initDatabase, initTable, insertProduct, getProduct} from './database.js'

const __dirname = path.resolve()

const app = express()

const db = initDatabase()
initTable(db)

app.set('views', __dirname + '/layouts')
app.set('view engine', 'html')
app.engine('html', hbs.__express)

// log incoming request
app.use(morgan('combined'))

// parse request body
app.use(bodyParseer.urlencoded())

// serve static file
app.use('assets/', express.static(__dirname + 'assets'))

app.get('/', (req, res, next) => {
    res.send({success: true})
})

app.get('/product', (req, res, next) => {
    getProduct(db).then(product => {
        console.log('Product result: ', product)
        res.render('product')
    }).catch(error => {
        console.error(error)
    })  
})

app.get('/add-product', (req, res, next) => {
    res.send(req.query)
})

app.post('/add-product', (req, res, next) => {
    console.log('Request', req.body)

    // insert product
    insertProduct(db, req.body.name, parseInt(req.body.price), '-')

    // redirect
    res.redirect('/product')
    res.send(req.body)
})

app.use((err, req, res, next) => {
    res.send(err.message)
})

app.listen(8000, () => {
    console.log('App listen on port 8000')
})