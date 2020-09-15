const request = require('request')

const forecast = (lat, lon, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=5c7a74948550223a9686a999fa43c517&query='+ lat + ',' + lon

     

    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error){
            callback('Unable to find location. Try another search.', undefined)
        } else {
           callback(undefined, 'It is currently ' + body.current.temperature + '\xB0C outside. The is a ' + body.current.precip +'% chance of rain, BUT Seigonie say how is ' + body.current.weather_descriptions + '. It is currently ' + body.current.temperature + '\xB0C, but it feels like ' + body.current.feelslike + '\xB0C instead.')
           
        }
    })


}

module.exports = forecast




