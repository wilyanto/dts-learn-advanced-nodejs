import express from 'express'
import hbs from 'hbs'
import path from 'path'
import morgan from 'morgan'

const __dirname = path.resolve()

const app = express()

app.set('views', __dirname + '/layouts')
app.set('view engine', 'html')
app.engine('html', hbs.__express)

// log incoming request
app.use(morgan('combined'))

// serve static file
app.get('/', (req, res, next) => {
    res.send({success: true})
})

app.get('/product', (req, res, next) => {
    res.render('product')
})

app.use((err, req, res, next) => {
    res.send(err.message)
})

app.listen(8000, () => {
    console.log('App listen on port 8000')
})