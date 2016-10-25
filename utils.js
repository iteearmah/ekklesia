var API_URL='http://ekklesia.jtekitsolutions.com/api/';
exports.getJSON=function(url) {
    console.log(API_URL + url);
  return fetch(API_URL + url).then(function(response) {
    return response.json();
  });
}