//importing html elements
const weatherLocation=document.querySelector('#localLoc');
const weatherTemp=document.querySelector('#weatherTemp');
const desc=document.querySelector('#desc');
const wind=document.querySelector('#wind');
const humidity=document.querySelector('#humidity');
const weatherImg=document.getElementById('weatherImg');
const localDate=document.querySelector('#localDate');
const localTime=document.querySelector('#localTime');
const celsiusButton=document.querySelector('#celsius');
const fahrenheitButton=document.querySelector('#fahrenheit');
const userInput=document.querySelector('#search');

//defining variables
let kelvinToCelsius=0;
let celsiusToFah=0;
let nightColor=false;
let loc="";
let description="";
let hours="";

getTime();
setInterval(getTime, 1000);
getLocation();
getDate();
privacy();

/*fetches API from OpenWeatherMap*/
async function getWeather(location){
    const apiKey='ebbd521303ecc9a32317e8f713c1c8b1';
    const response=await fetch('https://api.openweathermap.org/data/2.5/weather?q='+location+'&appid='+apiKey, {mode: 'cors'});

    response.json().then(function(response){
        weatherLocation.innerHTML=response.name+", "+response.sys.country;
    
        kelvinToCelsius=Math.round(response.main.temp-273.15);
        celsiusToFah=Math.round((kelvinToCelsius*1.8)+32);

        weatherTemp.innerHTML=kelvinToCelsius;
        if(nightColor==true) document.getElementById("fahrenheit").style.color="#808080";

        description=response.weather[0].description;
        changeImg(description);

        desc.innerHTML=description;
        wind.innerHTML=response.wind.speed+" m/s";
        humidity.innerHTML=response.main.humidity+"%";
    })
}

/*changes weather icon based on weather description*/
function changeImg(description){
    if(description.includes("rain") && !description.includes("snow")){
        nightColor==true ? weatherImg.src="images/rainy.png" : weatherImg.src="https://static.thenounproject.com/png/939134-200.png";
    } else if(description.includes("clear")){
        nightColor==true ? weatherImg.src="images/sunny.png" : weatherImg.src="https://static.thenounproject.com/png/1355684-200.png";
    } else if(description.includes("few")){
        nightColor==true ? weatherImg.src="images/whitecloud.png" : weatherImg.src="https://static.thenounproject.com/png/1416977-200.png";
    } else if(description.includes("cloud") && !description.includes("few")){
        nightColor==true ? weatherImg.src="images/cloudy.png" : weatherImg.src="https://static.thenounproject.com/png/1915084-200.png";
    } else if(description.includes("snow")){
        nightColor==true ? weatherImg.src="images/snow.png" : weatherImg.src="https://static.thenounproject.com/png/1350851-200.png";
    } else if(description.includes("mist")){
        nightColor==true ? weatherImg.src="images/misty.png" : weatherImg.src="https://static.thenounproject.com/png/1021681-200.png";
    } else if(description.includes("thunder")){
        nightColor==true ? weatherImg.src="images/thunder.png" : weatherImg.src="https://static.thenounproject.com/png/2266531-200.png";
    }
} 

/*converts celsius to fahrenheit and vice versa depending
on button clicked*/
function tempConversion(button){
    if(button.id=="celsius"){
        celsiusButton.style.color="#fff";
        weatherTemp.innerHTML=kelvinToCelsius;
        nightColor==true ? fahrenheitButton.style.color="#808080" : fahrenheitButton.style.color="#000";
    } else if(button.id=="fahrenheit"){
        fahrenheitButton.style.color="#fff";
        weatherTemp.innerHTML=celsiusToFah;
        nightColor==true ? celsiusButton.style.color="#808080" : celsiusButton.style.color="#000";
    }
}

/*gets local time of visitor/user*/
function getTime(){
    hours=new Date().getHours();
    let mins=new Date().getMinutes();
    let localTime=document.querySelector('#localTime');

    mins<10 ? localTime.innerHTML=hours+":0"+mins : localTime.innerHTML=hours+":"+mins;
    timeImg(hours);
}

/*changes background of app based on local time of visitor/user*/
function timeImg(hours){
    if(hours>=5 && hours<8) {
        document.body.style.backgroundImage="url('https://images.hdqwalls.com/download/sunrise-on-the-beach-in-the-summer-time-at-ocean-isle-beach-4k-ga-1600x900.jpg')";
    } else if(hours>=8 && hours<=16){
        document.body.style.backgroundImage="url('https://cff2.earth.com/uploads/2017/11/08174338/How-ice-forms-inside-of-clouds.jpg')";
    } else if(hours>16 && hours<20){
        document.body.style.backgroundImage="url('https://images.wallpaperscraft.com/image/sea_sunset_dusk_153051_1600x900.jpg')";
    } else {
        document.body.style.backgroundImage="url('https://astronomy.com/-/media/Images/News%20and%20Observing/Sky%20this%20Week/STW%202020/October/DelphinusStars.jpg?mw=600')";
        weatherLocation.style.color="#fff";
        weatherTemp.style.color="#fff";
        localDate.style.color="#fff";
        document.getElementById("calendar").src="images/calendar.png";
        document.getElementById("weaTitle").style.color="#fff";
        document.getElementById("border").style.color="#fff";
        nightColor=true;
    }
}

/*gets local date of visitor/user*/
function getDate(){
    localDate.innerHTML=new Date().toLocaleDateString();
}

/*gets location of visitor via IP address*/
async function getLocation(){
    const apiKey='c27bf991417a54acc12dee95b7eb4a8912478af2aad2a7a779de9dd1';
    const response=await fetch('https://api.ipdata.co/?api-key='+apiKey, {mode: 'cors'});
    
    response.json().then(function(response){
        loc=response.city;
        getWeather(loc);
    })
}

/*fetches weather API based on city visitor searches/enters in*/
function searchLocation(button){
    let inputValue=userInput.value;
    getWeather(inputValue);
}

/*sets color of privacy info based on time*/
function privacy(){
    nightColor==true ? document.getElementById("privacyInfo").style.color="#fff" 
    : document.getElementById("privacyInfo").style.color="#000"
}