import { fetchData, fetchCities, fetchEventTypes } from './api.js';
import { showMarkers, popupEvent } from './map.js';

/* L.marker([40.758895, -73.985131])
  .addTo(map)
  .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  .openPopup(); */

const showCities = (cities) => {
  const selectCities = document.querySelector('#select-cities');

  cities.sort().forEach((city) => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    selectCities.appendChild(option);
  });
};

const showEvents = (events) => {
  const eventsContainer = document.querySelector('#events-container');
  events.forEach((event) => {
    const eventName = document.createElement('p');
    const eventLocation = event._embedded.venues[0].location;
    eventName.textContent = event.name;
    eventsContainer.appendChild(eventName);

    showMarkers(eventLocation);
  });
};

const showEventTypes = (eventType) => {
  const selectTypeEvents = document.querySelector('#selectTypeEvents');

  eventType.sort().forEach((event) => {
    const option = document.createElement('option');
    option.value = event;
    option.textContent = event;
    selectTypeEvents.appendChild(option);
  });
}


const searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click', async () => {
  /* const searchInput = document.querySelector('#search-input');
  const city = searchInput.value; */
  const selectCities = document.querySelector('#select-cities');
  const selectedCity = selectCities.value;

  const selectedDate = document.querySelector('#date-picker').value;

  const events = await fetchData(selectedCity);

  popupEvent(events)

  if (selectedDate !== '') {
    const filteredEvents = events.filter(
      (event) => event.dates.start.localDate === selectedDate
    );
    filteredEvents.length <= 0 ? alert('No events') : showEvents(filteredEvents);
  } else {
    showEvents(events);
  }
});

const getData = async () => {
  try {
    const cities = await fetchCities();
    showCities(cities);
    const events = await fetchEventTypes();
    showEventTypes(events)
  } catch (error) {
    console.log('Error to obtain cities: ', error);
  }
};

getData();