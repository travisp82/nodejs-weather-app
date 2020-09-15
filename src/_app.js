const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

console.log(__dirname)
console.log(path.join(__dirname, '../public'))



//define paths for expres config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//get images
app.use(express.static('views/images'))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Travis G. Paul"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        photo: 'picture of a baby',
        name: 'Travis G. Paul',
        bumbum: 'Zoe Grace Paul'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Welcome to the help section.',
        title: 'Help',
        name: 'Travis G. Paul'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {lat, lon, loc} ={})  =>{
        if(error){
            return res.send({error})
        }

        forecast(lat, lon, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                loc,
                address: req.query.address
            })
        })
    })

})


app.get('/footer', (req, res) => {
    res.send(
        {
            name: 'Travis G. Paul'
        }
    )
})

app.get('/products', (req,res) => {
 if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Travis Gerald Paul',
        errorMsg: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Travis Gerald Paul',
        errorMsg: 'Page Not Found'
    })
})

//default port 80 for http, development port 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})