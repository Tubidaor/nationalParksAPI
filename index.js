
const apiKey ="Yb53TssxDHdcaMBqBalGgotyUQYeT8DTHvCvBAKP"
const natParkUrl = "https://developer.nps.gov/api/v1/parks"


function formatQueryString(query) {
  const queryItems = Object.keys(query)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
  return queryItems.join('&');
}


function displayResults(responseJson) {
  $('.results').empty();
  if (responseJson.data.length === 0) {
    $('.results').text("Please enter a state")
  } else {
    for ( let i = 0; i < responseJson.data.length; i++) {
      $('.results').append(
        `<li>
        <h2>${responseJson.data[i].fullName}</h2>
        <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
        <br/><br/>${responseJson.data[i].description}</p>
        </li>`);
      }
    }
  $('.stateIp').val("State Initials");
  $('.hidden').show();
}

function getResults(searchState, maxResults=10) {
  const query = {
    API_KEY: apiKey,
    stateCode: searchState,
    limit: maxResults
  };
  const queryString = formatQueryString(query);
  const url = natParkUrl + '?' + queryString;
  console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(alert("Sorry something went wrong, try again"));
    }) 
    .then(responseJson => displayResults(responseJson));
}

function formCapture() {
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('.stateIp').val();
    const maxResults = $('.maxIp').val();
    getResults(searchState, maxResults)
    console.log(searchState, maxResults)
  });
}

  $(formCapture);
