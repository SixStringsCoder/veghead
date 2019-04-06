const clientId = 'MFVKXsRqmbkGZcS52xV8ow';
const secret = 'dCD2U6l73tQkqFDYHI99wunMeHL8RtVfq9YG26mHrLl0qjZXOJf5tW24Lb3QowkG';
let accessToken = '';

const Yelp = {
  // Retrieves an access token from Yelp API to authenticate requests and retrieve data
  getAccessToken: function() {
    if (accessToken) {
      return new Promise(resolve => {
        resolve(accessToken);
      });
    } return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {method: 'POST'}).then(response => {
      return response.json();
    }).then(jsonResponse => {
       accessToken = jsonResponse.access_token;
    });
  }, // end of getAccessToken method

  // Retrieves search results from the Yelp API
  search: function(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (jsonResponse.businesses) {
          console.log(jsonResponse.businesses);
          return jsonResponse.businesses.map(business => {
            return {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              isclosed: business.is_closed,
              rating: business.rating,
              reviewCount: business.review_count,
              coordinate_lat: business.coordinates.latitude,
              coordinate_long: business.coordinates.longitude,
            }
          }); // end of .map()
        }
      }); // end of 2nd .then()
    });
  }, // end of search method
} // end of Yelp object

export default Yelp;
