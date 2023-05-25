const map = L.map('map');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const getLocation = (lat, lng) => {
  map.setView([lat, lng], 15);
};

/* const marker = L.marker([lat, lng]).addTo(map);
marker.bindPopup('Tu ubicación').openPopup(); */

if ('geolocation' in navigator) { //API del navegador si tiene
  navigator.geolocation.getCurrentPosition( //stackOverflow
    (position) => {
      const { latitude, longitude } = position.coords; //destructuring position.coords.latitude
      getLocation(latitude, longitude);
    },
    (error) => {
      console.log('Error obtaining location: ', error);
    }
  );
} else {
  console.log('Geolocation not supported in your browser');
}

const showMarkers = (coord) => { //evento pink coordenadas evento 
  const marker = L.marker([coord.latitude, coord.longitude]).addTo(map); //pines azules
};


const popupEvent = (event) => {
  L.popup().setLatLng([
    event._embedded.venues[0].location.latitude,
    event._embedded.venues[0].location.longitude,
  ]).setContent(`
    <h3>${event.name}</h3>
    <h3>Local date: ${event.dates.start.localDate} Local time: ${event.dates.start.localTime}</h3>
    <p>Address: ${event._embedded.venues[0].address.line1}</p>
    `);
}



export { showMarkers, popupEvent };