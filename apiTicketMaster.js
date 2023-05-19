const apiKey = "NGp9aQzuMvtAkQsVgG8PMV8AOzGCZImj";
const urlApi = "https://app.ticketmaster.com/discovery/v2/events.json"

export async function getTicketMaster(city) {
  try {
    const parameters = {
      apikey: apiKey,
      city: city,
      size: 30
    }

    const convertObjectToString = new URLSearchParams(parameters).toString()

    const getApi = await fetch(
      `${urlApi}?${convertObjectToString}`
    ); //get the api

    const data = await getApi.json(); //convert string to json
    const getEvent = data._embedded.events;
    return getEvent;
  } catch {
    console.log("error");
  }
}
