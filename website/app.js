/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() +1) +'.'+ d.getDate()+'.'+ d.getFullYear();
// storing the key in the variable to use it later
const key = '35eb9cc134a47c0879e1b7425b5b58f4';
// listening to click event to trigger the actions
document.getElementById('generate').addEventListener('click', async ()=> {
    // taking zip code from the client and store it in a constant
    const zip = document.getElementById('zip').value;
    // fetch data from the end point using basic url concatinated with zip code and the key
    const data = 
await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${key}&units=metric`)
    .then(res => res.json());
    //getting temprature from the object coming from the end point
const temp = data.main.temp;
// store feeling from the textarea filled by client
const feelings = document.getElementById('feelings').value;
// send data to the server
await fetch('/saveWeatherDate', {method: "POST",
headers: {"Content-Type": "application/json"},body: JSON.stringify({
    date: newDate,
    temp: temp,
    feelings: feelings
})
  });
  // reciving data from server
const weatherresponse = await fetch('/getDate', {credentials: "same-origin"});
const weatherDATA = await weatherresponse.json();
// updating UI
document.getElementById('date').innerHTML = weatherDATA.temp.date;
document.getElementById('temp').innerHTML = weatherDATA.temp.temp;
document.getElementById('content').innerHTML = weatherDATA.temp.feelings;
});

