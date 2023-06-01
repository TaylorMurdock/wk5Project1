const rainImgPath = "url(./imgs/rainingImg.jpeg)"; // Assigns the path to the raining image
const cloudImgPath = "url(./imgs/cloudyImg.jpeg)"; // Assigns the path to the cloudy image
const snowImgPath = "url(./imgs/snowImg.jpeg)"; // Assigns the path to the snow image
const sunnyImgPath = "url(./imgs/sunnyImg.avif)"; // Assigns the path to the sunny image
const nightImgPath = "url(./imgs/nightImg.jpeg)"; // Assigns the path to the night image

$(document).ready(function () {
  var alertsOpen = false; // Initializes a variable to keep track of whether alerts are open or closed
  var lastClickedTab = null; // Initializes a variable to store the last clicked tab

  $(".tabs button").eq(0).addClass("highlight"); // Adds the "highlight" class to the first button in the tabs section

  $(".tabs button").click(function () {
    $(".tabs button").eq(0).removeClass("highlight"); // Removes the "highlight" class from the first button in the tabs section

    if (lastClickedTab) {
      lastClickedTab.removeClass("highlight"); // Removes the "highlight" class from the previously clicked button
    }

    $(this).addClass("highlight"); // Adds the "highlight" class to the currently clicked button
    lastClickedTab = $(this); // Stores the currently clicked button as the last clicked tab
  });

  $("#alertButton").click(function () {
    alertsOpen = !alertsOpen; // Toggles the value of alertsOpen variable

    if (alertsOpen) {
      $(".alerts").addClass("open"); // Adds the "open" class to the alerts section
      $(this).addClass("highlight"); // Adds the "highlight" class to the alertButton
    } else {
      $(".alerts").removeClass("open"); // Removes the "open" class from the alerts section
      $(this).removeClass("highlight"); // Removes the "highlight" class from the alertButton
    }
  });

  $(".weeklyWeather").click(function () {
    const content = $(".content"); // Selects the content section

    content.empty(); // Clears the content section

    const defaultOneCall =
      "https://api.openweathermap.org/data/3.0/onecall?lat=35.590310&lon=-82.487800&appid=20c52dcce61a134a5c6deb567556e70c&units=imperial";
    // Assigns the API URL for fetching weekly weather data

    fetch(defaultOneCall)
      .then((response) => {
        return response.json(); // Returns the response as JSON
      })
      .then((data) => {
        const weeklyData = data.daily; // Extracts the daily weather data from the response

        weeklyData.map((dailyData) => {
          const newElement = `<div class="weeklyWeather> 
    <div class="minTemp">Min Temp: ${dailyData.temp.min}</div>
    <div>Max Temp: ${dailyData.temp.max}</div>
    <div>Summary: ${dailyData.summary}</div>
    </div>`;
          // Creates a new element with the daily weather data

          content.append(newElement); // Appends the new element to the content section
        });
      });
  });

  $(".currentWeather").click(function () {
    const content = $(".content"); // Selects the content section

    content.empty(); // Clears the content section

    const defaultCurrentWeatherUrl =
      "https://api.openweathermap.org/data/2.5/weather?lat=35.590310&lon=-82.487800&appid=20c52dcce61a134a5c6deb567556e70c&units=imperial";
    // Assigns the API URL for fetching current weather data

    fetch(defaultCurrentWeatherUrl)
      .then((response) => {
        return response.json(); // Returns the response as JSON
      })
      .then((data) => {
        const main = data.main; // Extracts the main weather data from the response
        const weatherDesc = data.weather[0].main; // Extracts the weather description from the response
        const time = data.sys; // Extracts the time data from the response

        const content = $(".content"); // Selects the content section again

        content.html(`
    <div class="cityName">
    <b>Current Location:&nbsp;</b> Asheville
    </div>
    <div class="curTemp">
    <b>Current Temperature:&nbsp;</b> ${main.temp}
    </div>
     <div class="curFeelsLike">
    <b>Feels Like:&nbsp;</b>${main.feels_like}
    </div>
     <div class="curLow">
     <b>Low for the day:&nbsp;</b>${main.temp_min}
    </div>
    <div class="curHigh">
     <b>High for the day:&nbsp;</b>${main.temp_max}
    </div>
    `);
        // Updates the content section with the current weather data

        changeBackgroundImg(weatherDesc); // Calls the function to change the background image based on the weather description
      });
  });

  $(".zipSubmit").click(function () {
    const input = $(".zipInput").val(); // Retrieves the value from the zip input field

    const convertZipAndChangeTemp = (zip) => {
      fetch(
        `https://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=20c52dcce61a134a5c6deb567556e70c`
      )
        .then((response) => {
          return response.json(); // Returns the response as JSON
        })
        .then((data) => {
          const cityName = data.name; // Extracts the city name from the response

          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=20c52dcce61a134a5c6deb567556e70c&units=imperial`
          )
            .then((response) => {
              return response.json(); // Returns the response as JSON
            })
            .then((data) => {
              const content = $(".content"); // Selects the content section again
              const weatherDesc = data.weather[0].main; // Extracts the weather description from the response
              const main = data.main; // Extracts the main weather data from the response
              const time = data.sys; // Extracts the time data from the response

              content.html(`
                <div class="cityName">
                <b>Current Location:&nbsp;</b> ${cityName}
                </div>
                <div class="curTemp">
                <b>Current Temperature:&nbsp;</b> ${main.temp}
                </div>
                <div class="curFeelsLike">
                <b>Feels Like:&nbsp;</b>${main.feels_like}
                </div>
                <div class="curLow">
                <b>Low for the day:&nbsp;</b>${main.temp_min}
                </div>
                <div class="curHigh">
                <b>High for the day:&nbsp;</b>${main.temp_max}
                </div>
              `);
              // Updates the content section with the current weather data

              changeBackgroundImg(weatherDesc); // Calls the function to change the background image based on the weather description
            });
        });
    };

    convertZipAndChangeTemp(input); // Calls the function to fetch and update weather data based on the input zip code
  });
});

const defaultCurrentWeatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=35.590310&lon=-82.487800&appid=20c52dcce61a134a5c6deb567556e70c&units=imperial";
// Assigns the API URL for fetching current weather data

fetch(defaultCurrentWeatherUrl)
  .then((response) => {
    return response.json(); // Returns the response as JSON
  })
  .then((data) => {
    const main = data.main; // Extracts the main weather data from the response
    const weatherDesc = data.weather[0].main; // Extracts the weather description from the response
    const time = data.sys; // Extracts the time data from the response

    const content = $(".content"); // Selects the content section again

    content.html(`
    <div class="cityName">
    <b>Current Location:&nbsp;</b> Asheville
    </div>
    <div class="curTemp">
    <b>Current Temperature:&nbsp;</b> ${main.temp}
    </div>
     <div class="curFeelsLike">
    <b>Feels Like:&nbsp;</b>${main.feels_like}
    </div>
     <div class="curLow">
     <b>Low for the day:&nbsp;</b>${main.temp_min}
    </div>
    <div class="curHigh">
     <b>High for the day:&nbsp;</b>${main.temp_max}
    </div>
    `);
    // Updates the content section with the current weather data

    changeBackgroundImg(weatherDesc); // Calls the function to change the background image based on the weather description
  });
function changeBackgroundImg(weatherDesc) {
  const body = $("body"); // Selects the body element
  const currentTime = Math.floor(Date.now() / 1000); // Retrieves the current time

  if (currentTime < time.sunrise || currentTime > time.sunset) {
    body.css("background-image", nightImgPath); // Sets the background image to the night image if it's nighttime
  } else if (weatherDesc === "Clouds") {
    body.css("background-image", cloudImgPath); // Sets the background image to the cloudy image if it's cloudy
  } else if (weatherDesc === "Rain") {
    body.css("background-image", rainImgPath); // Sets the background image to the raining image if it's raining
  } else if (weatherDesc === "Snow") {
    body.css("background-image", snowImgPath); // Sets the background image to the snow image if it's snowing
  } else if (
    weatherDesc !== "Rain" &&
    weatherDesc !== "Snow" &&
    weatherDesc !== "Clouds"
  ) {
    body.css("background-image", sunnyImgPath); // Sets the background image to the sunny image if it's clear weather
  }
}
