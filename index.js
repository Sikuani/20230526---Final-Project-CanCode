import { getTicketMaster, getCities } from "./apiTicketMaster.js";

const mapDraw = document.querySelector("#map");
const infoEvents = document.querySelector("#infoEvents");

const map = L.map("map").setView([40.6315113, -74.0182606], 10);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let eventsTicketMaster = document.querySelector("#eventsTicketMaster");
let nameEvent = document.querySelector("#nameEvent");
let dateEvent = document.querySelector("#dateEvent");
let addressEvent = document.querySelector("#addressEvent");
let priceRanges = document.querySelector("#priceRanges");
let imageEvent = document.querySelector("#imageEvent");

const showEvents = (events) => {
  const searchingBar = document.querySelector("#searchingBar");
  events.forEach((event) => {
    //console.log(event);

    const popupEvent = L.popup().setLatLng([
      event._embedded.venues[0].location.latitude,
      event._embedded.venues[0].location.longitude,
    ]).setContent(`
      <h3>${event.name}</h3>
      <h3>Local date: ${event.dates.start.localDate} Local time: ${event.dates.start.localTime}</h3>
      <p>Address: ${event._embedded.venues[0].address.line1}</p>
      `);
    //<p>Price:  $${event.priceRanges[0].min}</p>

    const marker = L.marker([
      event._embedded.venues[0].location.latitude,
      event._embedded.venues[0].location.longitude,
    ])
      .addTo(map)
      .bindPopup(popupEvent)
      .openPopup();

    marker.on("click", () => {
      nameEvent.innerHTML = `<p>${event.name}</p>`;
      dateEvent.innerHTML = `<p>Local date: ${event.dates.start.localDate} Local time: ${event.dates.start.localTime}</p>`;
      addressEvent.innerHTML = `<p>Address: ${event._embedded.venues[0].address.line1}</p>`;
      // priceRanges.innerHTML = `<p>Price:  $${event.priceRanges[0].min}</p>`;
      imageEvent.src = `${event.images[0].url}`;
    });
  });
};

//function to city list
const dropdownCities = ( cities ) => {
  let EventCities = document.querySelector("#EventCities");
  cities.forEach(city => { // get all cities from array
      const cityOption = document.createElement("option")
      cityOption.textContent = city;
      cityOption.value = city
      EventCities.appendChild(cityOption);
  }) 
}

//function to get api info
async function getCitiesNames() {
  try {
    const citiesOptions = await getCities();
    dropdownCities(citiesOptions)
  }
  catch {
    console.log("error");
  }
}
getCitiesNames()



let searchingButton = document.querySelector("#searchingButton");

searchingButton.addEventListener("click", async () => {
  try {
    let searchingByCity = document.querySelector("#searchingByCity");
    let EventCities = document.querySelector("#EventCities");
    let getCityValue = EventCities.value
    let citySelected = searchingByCity.value;
    let events = await getTicketMaster(citySelected);
    showEvents(events);
  } 
  
  catch {
    alert("You must enter a valid name");
  }
});

//To do
/*
searchingByDate
searchingByEvent

get map center on screen
Geolocalizacion

dropdown city options


*/
