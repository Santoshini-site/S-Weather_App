const apiKey = `78ac8879d2db07c74d220718ec809479`;
// const city="bengaluru";

async function fetchWeatherData(city) {
	try {
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
		if(!response.ok){
			throw new Error("unable to fetch the weather data");
		}
		const data = await response.json();
		console.log(data);
		//  console.log (data.main.temp);
		//  console.log(data.name);
		//  console.log(data.wind.speed);
		//  console.log(data.main.humidity);
		updateWeatherUI(data);
	}catch(error){
		console.error(error);
	}
}
const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");

const descriptionText = document.querySelector(".description-text")
const date = document.querySelector(".date");
const descriptionIcon=document.querySelector(".description i")
// fetchWeatherData();
function updateWeatherUI(data) {
	cityElement.textContent = data.name;
	// temperature.textContent=data.main.temp;
	temperature.textContent = `${Math.round(data.main.temp)}`;
	windSpeed.textContent = `${(data.wind.speed)}km/h`;
	humidity.textContent = `${(data.main.humidity)}%`;
	visibility.textContent = `${(data.visibility / 1000)}km`;
	descriptionText.textContent = data.weather[0].description;

	const currentDate = new Date();
	date.textContent = currentDate.toDateString();
	const weatherIconName=getWeatherIconName(data.weather[0].main);
	descriptionIcon.innerHTML =`<i class="material-icons">${weatherIconName}</i>`;
	
}
const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input")
formElement.addEventListener("submit", function (e) {
	e.preventDefault();
	const city = inputElement.value;
	if (city !== "") {
		fetchWeatherData(city);
		inputElement.value = "";
	}
});

function getWeatherIconName(weatherCondition){
	const iconMap={
		Clear:"wb_sunny",
		Clouds:"wb_cloudy",
		Rain:"umbrella",
		Thunderstorm:"thunderstorm",
		Drizzle:"grain",
		Snow:"ac_unit",
		Mist:"cloud",
		Smoke:"cloud",
		Haze:"cloud",
		Fog:"foggy"


	};
	return iconMap[weatherCondition] || "help"
}




































// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
// 		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
// 	}
// };


// // try {
// // 	const response = await fetch(url, options);
// // 	const result = await response.text();
// // 	console.log(result);
// // } catch (error) {
// // 	console.error(error);
// // }