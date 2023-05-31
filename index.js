const rainImgPath = "url(./imgs/rainingImg.jpeg)";
const cloudImgPath = "url(./imgs/cloudyImg.jpeg)";
const snowImgPath = "url(./imgs/snowImg.jpeg)";
const sunnyImgPath = "url(./imgs/sunnyImg.avif)";
const nightImgPath = "url(./imgs/nightImg.jpeg)";

$(document).ready(function () {
  var alertsOpen = false;
  var lastClickedTab = null;

  // on document load, before any tabs clicked, add highlight to first button (current weather)
  $(".tabs button").eq(0).addClass("highlight");

  $(".tabs button").click(function () {
    $(".tabs button").eq(0).removeClass("highlight");

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

  $(".weeklyWeather").click(function () {
    const content = $(".content");

    content.empty();

    const defaultOneCall =
      "https://api.openweathermap.org/data/3.0/onecall?lat=35.590310&lon=-82.487800&appid=20c52dcce61a134a5c6deb567556e70c&units=imperial";

    fetch(defaultOneCall)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const weeklyData = data.daily;
        console.log(weeklyData);

        weeklyData.map((dailyData) => {
          const newElement = `<div class="weeklyWeather> 
    <div class="minTemp">Min Temp: ${dailyData.temp.min}</div>
    <div>Max Temp: ${dailyData.temp.max}</div>
    <div>Summary: ${dailyData.summary}</div>
    </div>`;
          content.append(newElement);
        });
      });
  });

  $(".currentWeather").click(function () {
    const content = $(".content");

    content.empty();

    const defaultCurrentWeatherUrl =
      "https://api.openweathermap.org/data/2.5/weather?lat=35.590310&lon=-82.487800&appid=20c52dcce61a134a5c6deb567556e70c&units=imperial";

    fetch(defaultCurrentWeatherUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const main = data.main;
        const weatherDesc = data.weather[0].main;
        const time = data.sys;

        const content = $(".content");

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

        function changeBackgroundImg(weatherDesc) {
          const body = $("body");
          const currentTime = Math.floor(Date.now() / 1000);

          if (currentTime < time.sunrise || currentTime > time.sunset) {
            body.css("background-image", nightImgPath); // need to fix
          } else if (weatherDesc === "Clouds") {
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
          }
        }

        changeBackgroundImg(weatherDesc);
      });
  });

  $(".zipSubmit").click(function () {
    const input = $(".zipInput").val();
    const convertZipAndChangeTemp = (zip) => {
      fetch(
        `http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=20c52dcce61a134a5c6deb567556e70c`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const cityName = data.name;

          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=20c52dcce61a134a5c6deb567556e70c&units=imperial`
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data);
              const content = $(".content");
              const weatherDesc = data.weather[0].main;
              const main = data.main;
              const time = data.sys;
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
              function changeBackgroundImg(weatherDesc) {
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
                } // else if (time less than sunrise OR time greater than sunset) {
                //   body.css("background-image", nightImgPath); // need to fix
                // }
              }

              changeBackgroundImg(weatherDesc);
            });
        });
    };

    convertZipAndChangeTemp(input);
  });
});

const defaultCurrentWeatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=35.590310&lon=-82.487800&appid=20c52dcce61a134a5c6deb567556e70c&units=imperial";

fetch(defaultCurrentWeatherUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const main = data.main;
    const weatherDesc = data.weather[0].main;
    const time = data.sys;

    const content = $(".content");

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

    function changeBackgroundImg(weatherDesc) {
      const body = $("body");
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime < time.sunrise || currentTime > time.sunset) {
        body.css("background-image", nightImgPath); // need to fix
      } else if (weatherDesc === "Clouds") {
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
      }
    }

    changeBackgroundImg(weatherDesc);
  });
