import { getTicketMaster } from "./apiTicketMaster.js";

const mapDraw = document.querySelector("#map");
const infoEventos = document.querySelector("#infoEventos");

const map = L.map("map").setView([40.6315113, -74.0182606], 12);

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

const showEvents = async () => {
  const dataEvents = await getTicketMaster();

  dataEvents.forEach((item) => {
    //loop the array

    console.log(item);

    const popupEvent = L.popup().setLatLng([
      item._embedded.venues[0].location.latitude,
      item._embedded.venues[0].location.longitude,
    ]).setContent(`
      <h3>${item.name}</h3>
      <h3>Local date: ${item.dates.start.localDate} Local time: ${item.dates.start.localTime}</h3>
      <p>Address: ${item._embedded.venues[0].address.line1}</p>
      <p>Price:  $${item.priceRanges[0].min}</p>
      `);

    const marker = L.marker([
      item._embedded.venues[0].location.latitude,
      item._embedded.venues[0].location.longitude,
    ])
      .addTo(map)
      .bindPopup(popupEvent)
      .openPopup();

    marker.on("click", () => {
      nameEvent.innerHTML = `<p>${item.name}</p>`;
      dateEvent.innerHTML = `<p>Local date: ${item.dates.start.localDate} Local time: ${item.dates.start.localTime}</p>`;
      addressEvent.innerHTML = `<p>Address: ${item._embedded.venues[0].address.line1}</p>`;
      priceRanges.innerHTML = `<p>Price:  $${item.priceRanges[0].min}</p>`;
      imageEvent.src = `${item.images[0].url}`;
    });
  });
};
showEvents();
