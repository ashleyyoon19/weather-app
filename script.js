//importing html elements
const weatherLocation=document.querySelector('#localLoc');
const weatherTemp=document.querySelector('#weatherTemp');
const desc=document.querySelector('#desc');
const wind=document.querySelector('#wind');
const humidity=document.querySelector('#humidity');
const weatherImg=document.getElementById('weatherImg');
const localDate=document.querySelector('#localDate');
const localTime=document.querySelector('#localTime');

localDate.innerHTML=new Date().toLocaleDateString();

let tempUnit="celsius";
let kelvinToCelsius=0;
let celsiusToFah=0;

// let input=document.querySelector('#search');
var clicked=false;
const input=document.querySelector('#search');
let userInput="";

let nightColor=false;

async function getWeather(location){
    const apiKey='ebbd521303ecc9a32317e8f713c1c8b1';
    const response=await fetch('https://api.openweathermap.org/data/2.5/weather?q='+location+'&appid='+apiKey, {mode: 'cors'});

    response.json().then(function(response){
        weatherLocation.innerHTML=response.name+", "+response.sys.country;
        
        kelvinToCelsius=Math.round(response.main.temp-273.15);
        celsiusToFah=Math.round((kelvinToCelsius*1.8)+32);

        //if fahrenheit button is clicked, then...
        if(tempUnit=="celsius"){
            weatherTemp.innerHTML=kelvinToCelsius;
        } else if(tempUnit=="fahrenheit"){
            weatherTemp.innerHTML=celsiusToFah;
        }
        let description=response.weather[0].description;

        if(description.includes("rain") && !description.includes("snow")){
            if(nightColor==true){
                weatherImg.src="images/rainy.png";
            } else {
                weatherImg.src="https://static.thenounproject.com/png/939134-200.png";
            }
            // document.body.style.backgroundImage="url('https://cdn.wallpapersafari.com/66/97/HonF9g.jpeg')";
        } else if(description.includes("clear")){
            if(nightColor==true){
                weatherImg.src="images/sunny.png";
            } else {
                weatherImg.src="https://static.thenounproject.com/png/1355684-200.png";
            }
            // document.body.style.backgroundImage="url('https://cff2.earth.com/uploads/2017/11/08174338/How-ice-forms-inside-of-clouds.jpg')";
        } else if(description.includes("few")){
            if(nightColor==true){
                weatherImg.src="images/whitecloud.png";
            } else {
                weatherImg.src="https://static.thenounproject.com/png/1416977-200.png";
            }
        } else if(description.includes("cloud") && !description.includes("few")){
            if(nightColor==true){
                weatherImg.src="images/cloudy.png";
            } else {
                weatherImg.src="https://static.thenounproject.com/png/1915084-200.png";
            }
            // document.body.style.backgroundImage="url('https://upload.wikimedia.org/wikipedia/commons/b/b9/Scattering_of_clouds.jpg')";
        } else if(description.includes("snow")){
            if(nightColor==true){
                weatherImg.src="images/snow.png";
            } else {
                weatherImg.src="https://static.thenounproject.com/png/1350851-200.png";
            }
            // document.body.style.backgroundImage="url('https://media.cntraveler.com/photos/5c0840017732ca62ae9f72e9/16:9/w_1600,c_limit/Hallstatt%20GettyImages-899427986.jpg')";
        } else if(description.includes("mist")){
            if(nightColor==true){
                weatherImg.src="images/misty.png";
            } else {
                weatherImg.src="https://static.thenounproject.com/png/1021681-200.png";
            }
        } else if(description.includes("thunder")){
            if(nightColor==true){
                weatherImg.src="images/thunder.png";
            } else {
                weatherImg.src="https://static.thenounproject.com/png/2266531-200.png";
            }
        }
        desc.innerHTML=description;
        wind.innerHTML=response.wind.speed+" m/s";
        humidity.innerHTML=response.main.humidity+" %";
    })
}

//CLEAN UP CODE FOR TEMPCONVERSION + GETWEATHER() part

function tempConversion(button){
    const celsiusButton=document.querySelector('#celsius');
    const fahrenheitButton=document.querySelector('#fahrenheit');
    if(button.id=="celsius"){
        celsiusButton.style.color="#fff";
        weatherTemp.innerHTML=kelvinToCelsius;
        if(nightColor==true){
            fahrenheitButton.style.color="#808080";
        } else {
            fahrenheitButton.style.color="#000";
        }
    } else if(button.id=="fahrenheit"){
        fahrenheitButton.style.color="#fff";
        weatherTemp.innerHTML=celsiusToFah;
        tempUnit="fahrenheit";
        if(nightColor==true){
            celsiusButton.style.color="#808080";
        } else {
            celsiusButton.style.color="#000";
        }
    }
}

function getTime(){
    let mins=new Date().getMinutes();
    let hours=new Date().getHours();

    let localTime=document.querySelector('#localTime');

    if(mins<10){
        localTime.innerHTML=hours+":0"+mins;
    } else {
        localTime.innerHTML=hours+":"+mins;
    }

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
        document.getElementById("calendar").src="calendar.png";
        document.getElementById("weaTitle").style.color="#fff";
        document.getElementById("border").style.color="#fff";
        document.getElementById("fahrenheit").style.color="#808080";
        nightColor=true;
    }
}

getTime();

setInterval(getTime, 1000);

let loc="";

async function getLocation(){
    const response=await fetch('https://api.ipdata.co/?api-key=test', {mode: 'cors'});

    response.json().then(function(response){
        loc=response.city;
        getWeather(loc);

        const responseVar=response.time_zone.current_time;
        // localDate.innerHTML=;
        for(let i=0; i<responseVar.length; i++){
            // if(resonseVar)
        }
    })
}
getLocation();

function getDate(){

}