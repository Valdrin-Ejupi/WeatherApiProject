const apiKey = 'D0cXqUbVxGZYAoUtMRxoFv5GIxdebKt3'; //limit 50requests per day
//get weather information


const getWeather = async (id) => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${apiKey}`;

  //lets fetch the data
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};


//Location Api request
//Get city information

const getCity = async (cityCode) => {
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${apiKey}&q=${cityCode}`;

  //fetching the data
  const response = await fetch(base + query);

  //We convert the data into JSON format
  const data = await response.json();

  // console.log(data[0]);
  return data[0];
};