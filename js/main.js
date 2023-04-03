let navSpan = document.createElement('span');
navSpan.className = 'text-info'
navSpan.innerHTML = `To do list!`
let bar = document.getElementById('bar');
// bar.appendChild(navSpan)
let divInNav = document.querySelector('nav > div')
divInNav.append(navSpan)

let rows = document.getElementsByClassName('row');
console.log(rows)

let firstRow = rows[0]
let secondRow = rows[1]
let thirdRow = rows[20]

let mainHeader = document.createElement('h1')
mainHeader.className = 'text-center text-warning'
mainHeader.id = 'mainheader'
mainHeader.innerHTML = 'Current Weather Summary'

firstRow.append(mainHeader)


let formDiv = document.createElement('div')
formDiv.className = 'row mt-5'
let formAction = document.createElement('form')
formAction.id = 'weatherForm'
let formGroupDiv = document.createElement('div')
formGroupDiv.className = 'form-group'

formInput1 = document.createElement('input')
formInput1.className ='form-control'
formInput1.name = 'cityName'
formInput1.type = 'text'
formInput1.placeholder = 'Please enter a City name'

formInput2 = document.createElement('input')
formInput2.type ='Submit'
formInput2.value = 'Submit'
formInput2.className = 'btn btn-primary w-100 mt-3'

formGroupDiv.append(formInput1)
formGroupDiv.append(formInput2)
console.log(formGroupDiv)

formAction.append(formGroupDiv)

formDiv.append(formAction)
console.log(formDiv)

secondRow.append(formDiv)


/// grabbing the value from a form. 
let formEvent = document.getElementById('weatherForm');

async function handleFormSubmit(event){
    event.preventDefault();
    //console.log(event.target.cityName.value)
    let cityName = event.target.cityName.value;
    //console.log(cityName)

    let cityNameData = await getCityNameData(cityName);
    console.log(cityNameData);
    
    let cardD = document.getElementById('countryRow');

    cardD.addEventListener('dblclick', removeElement);


    // let weatherCard = document.getElementById('weatherCard');
    // let hCityName = document.createElement('h1');
    // hCityName.innerHTML= `${cityNameData.location.name}, ${cityNameData.location.region}`;
    // weatherCard.append(hCityName)

    // let currentTemp = document.createElement('h3');
    // currentTemp.innerHTML= `Temperature: ${cityNameData.current.temp_f}° `;
    // weatherCard.append(currentTemp)

    // let feelsLike = document.createElement('h3');
    // feelsLike.innerHTML= `Feels Like: ${cityNameData.current.feelslike_f}° `;
    // weatherCard.append(feelsLike)

    // let hCondition = document.createElement('h3');
    // feelsLike.innerHTML= `Condition: ${cityNameData.current.condition.text}`;
    // weatherCard.append(hCondition)

    buildWeatherCard(cityNameData)

    event.target.cityName.value = '';
}
formEvent.addEventListener('submit', handleFormSubmit)

async function getCityNameData(cityName){
    try{
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`);
        let data = await response.json();
        return data
    }
    catch(err){
        console.error(err);
    }
}

function buildWeatherCard(cityNameData){

    let weatherCard = document.getElementById('weatherCard');
    let hCityName = document.createElement('h1');
    hCityName.innerHTML= `${cityNameData.location.name}, ${cityNameData.location.region}`;
    weatherCard.append(hCityName);

    let currentTemp = document.createElement('h3');
    currentTemp.innerHTML= `Temperature: ${cityNameData.current.temp_f}° `;
    weatherCard.append(currentTemp);

    let feelsLike = document.createElement('h3');
    feelsLike.innerHTML= `Feels Like: ${cityNameData.current.feelslike_f}° `;
    weatherCard.append(feelsLike);

    let wind = document.createElement('h3');
    feelsLike.innerHTML= `Wind: ${cityNameData.current.gust_mph}`;
    weatherCard.append(wind);

    let hCondition = document.createElement('h3');
    feelsLike.innerHTML= `Condition: ${cityNameData.current.condition.text}`;
    weatherCard.append(hCondition);

}


function removeElement(event){
    const elementToRemove = event.target;


}

