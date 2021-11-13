const locationSearch = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const condition = document.querySelector('.condition')
// Creating new forecast object
const forecast = new Forecast();
console.log(forecast)
// Update UI
const updateUI = (data) => {

    const { cityD, weather } = data;
    console.log(data);

    // Setting Images & Icons
    let timesrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timesrc);

    condition.setAttribute('src', `img/icons/${weather.WeatherIcon}.svg`)

    // Setting Details
    details.innerHTML = `
    <h5 class="my-3">${cityD.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // Remove display none class upon getting data
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}

locationSearch.addEventListener('submit', e => {
    // Prevent Default action
    e.preventDefault();

    // Get Form data
    const location = locationSearch.city.value.trim();
    locationSearch.reset();

    // Getting Data
    forecast.getData(location).then(data => updateUI(data))
    .catch(err => console.log(err));

    // local storage
    localStorage.setItem('location', location);
})

if(localStorage.getItem('location')){
    forecast.getData(localStorage.getItem('location'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
};