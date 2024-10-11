/*
    API
        src: http://api.weatherapi.com/v1/forecast.json?key=cf4fc7d70da743ff82300255241010&q=07112&days=7
*/

var parentDiv = document.querySelector(".data");
var searchInput = document.querySelector("#search");
var searchBTN = document.querySelector(".buttonSearch");

// console.log(parentDiv)

async function getWeather(term) {
  var apiKey = "cf4fc7d70da743ff82300255241010";

  let response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${term}`
  );
  let data = await response.json();
  console.log(data);
  const myDate = new Date(data.location.localtime);
  // day of week
  var myDay = myDate.getDay();
  var mySecondDay = myDay + 1;
  var myThirdDay = myDay + 2;
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  //month nane
  var myMonth = myDate.getMonth();
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var nextDay = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=07112&q=${term}&days=7`
  );
  var dataForNext = await nextDay.json();

  //Second Day
  let dayTwo = dataForNext.forecast.forecastday[1];

  //Third Day
  let dayThree = dataForNext.forecast.forecastday[2];

  var text = `<div class="container">
                <div class="row">
                    <div class="col-4">
                        <section class="first text-white text-opacity-50 rounded-3 w-100">
                            <header class="d-flex justify-content-between gap-5 container pt-1 rounded-2">
                                <p>${daysOfWeek[myDay]}</p>
                                <p>${myMonth + 2}${monthsOfYear[myMonth]}</p>
                            </header>
                            <div class="content pb-1 pt-3 ps-2">
                                <p>${data.location.name}</p>
                                <h1 class="text-center text-white temp">${
                                  data.current.temp_c
                                }<sup>o</sup>C</h1>
                                <img src=https:${
                                  data.current.condition.icon
                                } alt=${
    data.current.condition.text
  } class="py-4">
                                <p class="text-info">${
                                  data.current.condition.text
                                }</p>
                                <ul class="icons d-flex list-unstyled gap-3">
                                    <li class="d-flex gap-2 align-items-baseline">
                                        <img src="images/icon-umberella.png" alt="icon-umberella" class="w-25 h-25">
                                        <p>${data.current.humidity}%</p>
                                    </li>
                                    <li class="d-flex gap-2 align-items-baseline">
                                        <img src="images/icon-wind.png" alt="icon-wind" class="w-25 h-25">
                                        <p>${data.current.wind_kph}km/h</p>
                                    </li>
                                    <li class="d-flex gap-2 align-items-baseline">
                                        <img src="images/icon-compass.png" alt="icon-compass" class="w-25 h-25">
                                        <p>East</p>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <div class="col-4">
                        <section class="second text-white text-opacity-50 rounded-3 w-100 h-100 text-center">
                            <header class="container pt-1 rounded-2">
                                <p class="pb-3">${daysOfWeek[mySecondDay]}</p>
                            </header>
                            <div class="content d-flex flex-column pb-1 pt-3 ps-2" >
                                <img src=https:${dayTwo.day.condition.icon} alt=${
    dayTwo.day.condition.text
  } class=" mx-auto h-25">
                                <h4 class="text-white fs-4">${
                                  dayTwo.day.maxtemp_c
                                }<sup>o</sup>C</h4>
                                <p>${dayTwo.day.mintemp_c}<sup>o</sup></p>
                                <p class="text-info">${
                                  dayTwo.day.condition.text
                                }</p>
                            </div>
                        </section>
                    </div>

                    <div class="col-4">
                        <section class="first text-white text-opacity-50 rounded-3 w-100 h-100 text-center">
                            <header class="container pt-1 rounded-2 pb-2">
                                <p>${daysOfWeek[myThirdDay]}</p>
                            </header>
                            <div class="content d-flex flex-column pb-1 pt-3 ps-2">
                                <img src=https:${dayThree.day.condition.icon} alt=${
                                    dayThree.day.condition.text} class=" mx-auto h-25">
                                <h4 class="text-white fs-4">${dayThree.day.maxtemp_c}<sup>o</sup>C</h4>
                                <p>${dayThree.day.mintemp_c}<sup>o</sup></p>
                                <p class="text-info">${ dayThree.day.condition.text}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>`;

  parentDiv.innerHTML = text;
}
searchBTN.addEventListener("click", function () {
  getWeather(searchInput.value);
});

searchInput.addEventListener("keydown", function(e){
    // e.preventDefault();
    if(e.key=="Enter") {
        e.preventDefault();
        getWeather(e.target.value);
    }
})