import { getFiveDaysForecast, getForecast, searchGeoLocation } from "./api.js";
import { currentCity } from "./states.js";
$(function () {
  // Main
  const main = $("main");

  console.log("currentCity: ", currentCity);

  const inputSearch = $("#input-search");
  const btnSearch = $("header .btn-search");
  btnSearch.on("click", async () => {
    if (inputSearch.length > 0) {
      const searchLocation = await searchGeoLocation(inputSearch.val());
      if (searchLocation.length) {
        console.log(searchLocation);
        await getForecast(searchLocation[0]);
        main.empty();
        main.append(`
            <today-forecast></today-forecast>
        `);
      } else {
        main.empty();
        main.append(`<not-found-404></not-found-404>`);
      }
    }
  });

  //#region Navbar buttons clicks
  const todayBtn = $(".btn-today");
  const btn5Days = $(".btn-5-days");

  todayBtn.on("click", async () => {
    // const currentWeather = await getCurrentWeather();
    // console.log("current weather data: ", currentWeather);
    main.empty();
    main.append(`
            <today-forecast></today-forecast>
        `);
    //   add class text to this button
    todayBtn.addClass("border-b-2 border-b-teal-500 border border-gray-600");
    btn5Days.removeClass("border-b-2 border-b-teal-500 border border-gray-600");
  });

  btn5Days.on("click", async () => {
    const fiveDays = await getFiveDaysForecast(currentCity);

    main.empty();
    main.append(`
            <five-days-forecast></five-days-forecast>
        `);
    btn5Days.addClass("border-b-2 border-b-teal-500 border border-gray-600");
    todayBtn.removeClass("border-b-2 border-b-teal-500 border border-gray-600");
  });
  //#endregion End Navbar buttons clicks
});
