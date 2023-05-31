const rainImgPath = "url(./imgs/rainingImg.jpeg)";
const cloudImgPath = "url(./imgs/cloudyImg.jpeg)";
const snowImgPath = "url(./imgs/snowImg.jpeg)";
const sunnyImgPath = "url(./imgs/sunnyImg.avif)";
const nightImgPath = "url(./imgs/nightImg.jpeg)";

$(document).ready(function () {
  var alertsOpen = false;
  var lastClickedTab = null;

  $(".tabs button").click(function () {
    if (lastClickedTab) {
      lastClickedTab.removeClass("highlight");
    }

    $(this).addClass("highlight");
    lastClickedTab = $(this);
  });

  $("#alertButton").click(function () {
    alertsOpen = !alertsOpen;

    if (alertsOpen) {
      $(".alerts").addClass("open");
      $(this).addClass("highlight");
    } else {
      $(".alerts").removeClass("open");
      $(this).removeClass("highlight");
    }
  });
});
// lat =35.590310
// lon = -82.487800
// need to make weatherUrl dynamic
const currentWeatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=19.8987&lon=155.6659&appid=20c52dcce61a134a5c6deb567556e70c&units=imperial";

// grab the search bar input value

// when you submit the search do a bunch of things

// create a function that takes a parameter. plug the input value from the search bar into the parameter and make an api call to zipcode api http://api.openweathermap.org/geo/1.0/zip?zip={zipcode}&appid={API key} replacing {zipcode} with the input value and {API key} with api key

fetch(currentWeatherUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const main = data.main;
    const weatherDesc = data.weather[0].main;
    const time = data.sys;
    console.log(time);

    const content = $(".content");

    content.html(`
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

    function changeBackgroundImg(weatherDesc, time) {
      const body = $("body");

      if (weatherDesc === "Clouds") {
        body.css("background-image", cloudImgPath);
      } else if (weatherDesc === "Rain") {
        body.css("background-image", rainImgPath);
      } else if (weatherDesc === "Snow") {
        body.css("background-image", snowImgPath);
      } else if (
        weatherDesc !== "Rain" &&
        weatherDesc !== "Snow" &&
        weatherDesc !== "Clouds"
      ) {
        body.css("background-image", sunnyImgPath);
      } else {
        body.css("background-image", nightImgPath);
      }
      // need to add sunny img and night time img depending on sunset and sunrise returns
    }

    changeBackgroundImg(weatherDesc);
  });
