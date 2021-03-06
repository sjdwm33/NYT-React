var axios = require("axios");
var nytimesAPI = "4f14f6be03334883a5c41c827be80938";

var helpers = {

  //This function runs the query to NYT
  runQuery: function(topic, startYear, endYear){
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytimesAPI + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";

    return axios.get(queryURL)
      .then(function(response){

        var newResults = [];
        var fullResults = response.data.response.docs;
        var counter = 0;

        for(var i = 0; i < fullResults.length; i++){
          if(counter > 4) {
            return newResults;
          }

          if(fullResults[counter].headline.main && fullResults[counter].pub_date && fullResults[counter].web_url) {
            newResults.push(fullResults[counter]);
            counter++;
          }
        }
        return newResults;
    })
  },


  // This function posts saved articles to our database.
  postArticle: function(title, date, url){

    axios.post('/api/saved', {title: title, date: date, url: url})
    .then(function(results){
      console.log("Posted to database");
      return(results);
    })
  }

}

module.exports = helpers;