console.log('client side javascript file is loaded.')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=> {
//         console.log(data)
//     })
// })





const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value


    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://api.weatherstack.com/current?access_key=5c7a74948550223a9686a999fa43c517&query=' + location).then((response) => {
    

    response.json().then((data) =>{
        if(data.error) {
            messageOne.textContent = 'Location not found, please try again'
        } else {
            messageOne.textContent = data.location.name + ', ' + data.location.country
            messageTwo.textContent = 'It is ' + data.current.weather_descriptions[0] + ' right now. The current temperature is ' + data.current.temperature + '\u00B0C.'
            console.log(data.location)
            console.log(data)
        }
        
    })
})


})