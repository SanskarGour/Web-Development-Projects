/*
async function showWeather(){
    // let latitude = 69.6969;
    // let longitude = 42.0420;

    let city = 'goa';
    let API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        const data = await response.json();
        console.log(response);
        console.log(`${data?.main?.temp.toFixed(2)} c`);
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}
*/

const userTab = document.querySelector('[data-userWeather]');
const searchTab = document.querySelector('[data-searchWeather]');
const userContainer = document.querySelector('.weatherContainer');
const grantAccessContainer = document.querySelector('.grant-location-container');
const searchForm  = document.querySelector('[data-searchForm]');
const loadingScreen = document.querySelector('.loading-container');
const userInfoContainer = document.querySelector('.user-information-container');
const errorContainer = document.querySelector('.errorContainer');

let currentTab = userTab;
let API_key = "d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add('current-tab');
getFromSessionStorage();
errorContainer.classList.remove('active');

userTab.addEventListener('click' , () =>{
    switchTab(userTab);
});

searchTab.addEventListener('click' , () =>{
    switchTab(searchTab);
});

function switchTab(clickedTab){

    if(clickedTab != currentTab){
        currentTab.classList.remove('current-tab');
        currentTab = clickedTab;
        currentTab.classList.add('current-tab');
        errorContainer.classList.remove('active');

        if(!searchForm.classList.contains('active')){
            userInfoContainer.classList.remove('active');
            grantAccessContainer.classList.remove('active');
            searchForm.classList.add('active');
        }
        else {
            searchForm.classList.remove('active');
            userInfoContainer.classList.remove('active');
            getFromSessionStorage();
        }
    }
}

function getFromSessionStorage(){
    const localCoordinates = sessionStorage.getItem('user-coordinates');

    // coordinates not available
    if(!localCoordinates){
        grantAccessContainer.classList.add('active');
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const{lat , lon} = coordinates;

    grantAccessContainer.classList.remove('active');
    loadingScreen.classList.add('active');
    errorContainer.classList.remove('active');

    try {
        const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`);

        const data = await response.json();
        loadingScreen.classList.remove('active');

        if(data?.cod == 404){
            userInfoContainer.classList.remove('active');
            errorContainer.classList.add('active');
        } else{
            userInfoContainer.classList.add('active');
            renderWeatherInfo(data);
        }

    } catch (error) {
        loadingScreen.classList.remove('active');
        console.log('Error Occured');
    }
}

function renderWeatherInfo(data){
    //fetching elements
    const cityName = document.querySelector('[data-cityName]');
    const countryFlag = document.querySelector('[data-countryFlag]');
    const desc = document.querySelector('[data-discription]');
    const weatherIcon = document.querySelector('[data-weatherIcon]');
    const temp = document.querySelector('[data-temp]');
    const windSpeed = document.querySelector('[data-windSpeed]');
    const humidity = document.querySelector('[data-humidity]');
    const cloud = document.querySelector('[data-cloud]');

    //optional chaining operator : The optional chaining (?.) operator accesses an object's property or calls a function. If the object accessed or function called using this operator is undefined or null, the expression short circuits and evaluates to undefined instead of throwing an error.

    cityName.innerText = data?.name;
    countryFlag.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    desc.textContent = data?.weather?.[0]?.description;
    weatherIcon.src = ` https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`;
    windSpeed.textContent = `${data?.wind?.speed} m/s`;
    humidity.textContent = `${data?.main?.humidity} %`;
    temp.textContent = `${data?.main?.temp} °C`;
    cloud.textContent = `${data?.clouds?.all} %`;
}

const grantAccessBtn = document.querySelector('[data-GrantAccess]');
grantAccessBtn.addEventListener('click' , getLocation);

function getLocation(){
    if(navigator.geolocation){
        //show position is a call back function
        navigator.geolocation.getCurrentPosition(showPosition);
    }else {
        alert('No Gelolocation Support Available!');
    }
}

function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };

    sessionStorage.setItem('user-coordinates' , JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const searchInput = document.querySelector('[data-searchInput]');

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;
    // console.log(cityName);

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
});

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add('active');
    userInfoContainer.classList.remove('active');
    grantAccessContainer.classList.remove('active');
    errorContainer.classList.remove('active');

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);

        const data = await response.json();
        loadingScreen.classList.remove('active');

        if(data?.cod == 404){
            userInfoContainer.classList.remove('active');
            errorContainer.classList.add('active');
        } else{
            userInfoContainer.classList.add('active');
            renderWeatherInfo(data);
        }

    } catch (e) {
        alert('Error Occured During Searching!');
    }
}