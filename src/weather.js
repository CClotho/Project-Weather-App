
import { format, compareAsc } from 'date-fns'
import './style.css';


const div = document.querySelector('#test');
const img = document.querySelector('img');
img.src = "";
const generateButton = document.createElement('button');
const searchBtn = document.querySelector('#search');
const input= document.querySelector("#site-search");
const ApiKey = "1ew2wlfsXaJd5gOd9X0DpK5lTVb1ED2M";


searchBtn.addEventListener('click', (event)=> {
   event.preventDefault();
   
 generateContent(input.value);
 //generate(input.value);

})

async function generateContent(data) {
   
   //const fragment = document.createDocumentFragment();
   const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=1ew2wlfsXaJd5gOd9X0DpK5lTVb1ED2M&s=${data}`, {mode: 'cors'})
   const gif = await response.json();
   
   img.src = gif.data.images.original.url;



 
}

  


generateButton.addEventListener('click',function(event) {
   event.preventDefault();

    generate(input.value);
})



generateButton.textContent = "Generate";
generateButton.className = "generate";
/* 
generateButton.addEventListener('click', function(event) {
   event.preventDefault();
   fetch('https://api.giphy.com/v1/gifs/translate?api_key=1ew2wlfsXaJd5gOd9X0DpK5lTVb1ED2M&s=cats', {mode: 'cors'})
.then(function(response) {
   // will return a response, we then convert that response to json data.
   return response.json();
})
.then(function(response) {
   console.log(response)
   img.src = response.data.images.original.url;
})
.catch((error) => {
   console.log("GIF not available: " + error);
});


}) */
document.body.appendChild(generateButton);

async function generate(input) {
    const fragment = document.createDocumentFragment();
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=61000bb3874147f0bbd53838231208&q=${input}&days=7&aqi=no&alerts=yes`, {mode: 'cors'})
    const day = await response.json();
    
    await console.log(day);
    const element = document.createElement('div');
    element.textContent = day.location.country;
    fragment.appendChild(element);
    
    for (const object of day.forecast.forecastday) {
        const wrapper = document.createElement('div');
        const imgWrapper = document.createElement('div');
        const element = document.createElement('div');
        const days = document.createElement('img');
        const p = document.createElement('p');
        const tempC = document.createElement('span');
        const tempF = document.createElement('span')
        const weekDay = format(new Date(object.date), 'EEEE');
        const forecastDate = document.createElement('span');

        forecastDate.textContent = object.date;
        
        wrapper.className = "card";
        element.textContent = weekDay;
        element.appendChild(forecastDate);
        element.appendChild(tempC);
        element.appendChild(tempF);

        tempC.textContent = "C: " + object.day.avgtemp_c;
        tempF.textContent = "F: " + object.day.avgtemp_f;
        imgWrapper.className = "imgWrapper";
        
        days.src = object.day.condition.icon;
        p.textContent = object.day.condition.text;
        imgWrapper.appendChild(days);
        wrapper.appendChild(imgWrapper);
        wrapper.appendChild(element);
        wrapper.appendChild(p);
        fragment.appendChild(wrapper);
    }

    div.textContent = "";  // clear previous content
    div.appendChild(fragment);  // append all at once
}






/* ForEach
async function generate(input) {
    div.textContent = "";
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=61000bb3874147f0bbd53838231208&q=${input}&days=7&aqi=no&alerts=yes`, {mode: 'cors'})
    const day = await response.json();
    const element = document.createElement('div');

    console.log(day);
    element.textContent = day.location.country;
    div.appendChild(element);
    
    day.forecast.forecastday.forEach(function(object) {
        
        const wrapper = document.createElement('div');
        const element = document.createElement('div');
        const days = document.createElement('img');
        const weekDay = format(new Date(object.date), 'EEEE') 
        console.log(weekDay);
        const forecastDate = document.createTextNode(object.date);
        element.textContent =  weekDay;
        element.appendChild(forecastDate);
        days.src = object.day.condition.icon;

        wrapper.appendChild(element);
        wrapper.appendChild(days);
        
        div.appendChild(wrapper);
    })
} */