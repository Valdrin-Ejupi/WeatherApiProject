//Dom manipulation and events handling
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
//updateing the UI
const updateUI = (data) =>{
    // console.log(data);
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;
    
    //By destructing the object we can store properties and store in a constant
    const {cityDetails,weather} = data;

    //update details template
    details.innerHTML = `
            <h5 class="my-3">${cityDetails.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;c</span>
            </div>
    `;

    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    }

    time.setAttribute('src',timeSrc);
    icon.setAttribute('src',iconSrc);


    //remove the d-none class if its present on div
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async (city)=>{
    //console.log(city);
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    // return {
    //     cityDetails : cityDetails,
    //     weather : weather
    // };

    //Short way when property name and properyy value is same
    return {cityDetails,weather};

};


cityForm.addEventListener('submit',e=>{
    //prevent for refreshing the page
    e.preventDefault();

    //get city value that the user types in the input field
    const city = cityForm.city.value.trim();
    cityForm.reset();
    
    //update the UI with the new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});