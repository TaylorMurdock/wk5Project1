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

const currentWeatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=35.590310&lon=-82.487800&appid=20c52dcce61a134a5c6deb567556e70c&units=imperial";

fetch(currentWeatherUrl)
  .then((response) => {
    // console.log(response.json());
    return response.json();
  })
  .then((data) => {
    console.log();
    const weather = data.main;

    const content = $(".content");
    // console.log(content);
    content.html(`
    <div class="curTemp">
    <b>Current Temperature:&nbsp;</b> ${weather.temp}
    </div>
     <div>
    <b>Feels Like:&nbsp;</b>${weather.feels_like}
    </div>
     <div>
     <b>Low for the day:&nbsp;</b>${weather.temp_min}
    </div>
         <div>
     <b>High for the day:&nbsp;</b>${weather.temp_max}
    </div>
    `);
  });
