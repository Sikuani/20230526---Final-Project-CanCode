const apiKey = "NGp9aQzuMvtAkQsVgG8PMV8AOzGCZImj";
const urlApi = "https://app.ticketmaster.com/discovery/v2/events.json";

export async function getTicketMaster(city) {
  try {
    const parameters = {
      apikey: apiKey,
      city: city,
      size: 30,
    };

    const convertObjectToString = new URLSearchParams(parameters).toString();

    const getApi = await fetch(`${urlApi}?${convertObjectToString}`); //get the api

    const data = await getApi.json(); //convert string to json
    const getEvent = data._embedded.events;
    console.log(data);

    return getEvent;
  } catch {
    console.log("error");
  }
}

export async function getCities() {
  try {
    const parameters = {
      apikey: apiKey,
      size: 30,
      country: "US",
    };

    const convertObjectToString = new URLSearchParams(parameters).toString();

    const getApi = await fetch(`${urlApi}?${convertObjectToString}`); //get the api

    const data = await getApi.json(); //convert string to json
    const getEvent = data._embedded.events; //array matriz
    const getCities = getEvent.map((city) => {
      return city._embedded.venues[0].city.name;
    });
    return getCities;
  } catch {
    console.log("error");
  }
}
