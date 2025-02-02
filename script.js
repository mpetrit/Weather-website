const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });

let apiKey="1962a7ba88554653529e2c7aa1330d26"
let weatherUnit= "metric"
let cityName;

let inputField=document.querySelector("#input-city")
let inputBtn=document.querySelector("#input-btn")
let unitToggle=document.querySelector("#unit-toggle")
let shallowResults=document.querySelector(".shallow-results")

let minTemp=document.querySelector("#min-temp")
let feelsLike=document.querySelector("#feels-like")
let maxTemp=document.querySelector("#max-temp")

let humidity=document.querySelector("#humidity")
let windSpeed=document.querySelector("#wind-speed")
let clouds=document.querySelector("#clouds")
let pressure=document.querySelector("#pressure")
let seaLevel=document.querySelector("#sea-level")
let grndPressure=document.querySelector("#grnd-pressure")



inputBtn.addEventListener("click",()=>{
    cityName=inputField.value;
    clearDisplay()
})


unitToggle.addEventListener("change",()=>{
    if(unitToggle.checked){
        weatherUnit="imperial"
        clearDisplay()
    }
    else{
        weatherUnit="metric"
        clearDisplay()
    }
})
function clearDisplay(){
    shallowResults.innerHTML=""
    displayWeather()
}

function displayWeather(){
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${weatherUnit}`)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        //place country in the input field, check if u run it again
        ((inputField.value).includes(regionNamesInEnglish.of(data.sys.country))==0)? inputField.value+=`, ${regionNamesInEnglish.of(data.sys.country)}`: '';
        //alert("You are looking at the city already!")

        //shallow-results
        let temp=document.createElement("h2");
        temp.textContent=Math.round(data.main.temp)+ ((weatherUnit=="metric")? " ᵒC":" ᵒF")
        let img=document.createElement("img")
        img.src=`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        let divTemp=document.createElement("div")
        let p=document.createElement("p")
        p.textContent=data.weather[0].main
        divTemp.appendChild(temp)
        divTemp.appendChild(img)
        divTemp.appendChild(p)
        
        //sunrise
        let divRise=document.createElement("div")
        let sunrise=document.createElement("p")
        let dateRise = new Date(data.sys.sunrise * 1000); //learn
        sunrise.textContent= dateRise.toLocaleTimeString();
        let imgRise=document.createElement("img")
        imgRise.src="images/sunrise.png"
        divRise.appendChild(imgRise)
        divRise.appendChild(sunrise)
        
        //sunset
        let divSet=document.createElement("div")
        let sunset=document.createElement("p")
        let dateSet = new Date(data.sys.sunset * 1000); //learn
        sunset.textContent= dateSet.toLocaleTimeString();
        let imgSet=document.createElement("img")
        imgSet.src="images/sunset.png"
        divSet.appendChild(imgSet)
        divSet.appendChild(sunset)
        
        //append
        divTemp.className="temp-shallow"
        divRise.className="time-of-sun"
        divSet.className="time-of-sun"
        shallowResults.appendChild(divTemp)
        shallowResults.appendChild(divRise)
        shallowResults.appendChild(divSet)


        
        //all-info
        minTemp.textContent=`Lows: ${Math.round(data.main.temp_min)} ${(weatherUnit=="metric")? " ᵒC":" ᵒF"}`;
        feelsLike.textContent=`Feels like: ${Math.round(data.main.feels_like)} ${(weatherUnit=="metric")? " ᵒC":" ᵒF"}`;
        maxTemp.textContent=`Highs: ${Math.round(data.main.temp_max)} ${(weatherUnit=="metric")? " ᵒC":" ᵒF"}`;
        
        humidity.textContent=`${data.main.humidity} %`
        windSpeed.textContent=`${data.wind.speed} ${(weatherUnit=="metric")? "m/s":"mph"}`
        clouds.textContent=`${data.clouds.all} %`
        pressure.textContent=`${data.main.pressure} hPa`
        seaLevel.textContent=`${data.main.sea_level} hPa`
        grndPressure.textContent=`${data.main.grnd_level} hPa`
        
        
        
        
        
        if (data.cod === "400") {
            alert("City not found! Please enter a valid city name.");
            return;
        }
        })
    .catch((error) => {
        alert("Something went wrong! Try again.")
        console.error(error)
      });
    
    
}

