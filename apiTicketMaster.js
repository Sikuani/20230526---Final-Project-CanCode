export async function getTicketMaster() {
  try {
    const getApi = await fetch(
      "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=NGp9aQzuMvtAkQsVgG8PMV8AOzGCZImj"
    ); //get the api

    const data = await getApi.json(); //convert string to json
    const getEvent = data._embedded.events;
    return getEvent;
  } catch {
    console.log("error");
  }
}
