var axios = require("axios");
var nytimesAPI = "4f14f6be03334883a5c41c827be80938";

var helpers = {

  //This function runs the query to NYT
  runQuery: function(topic, startYear, endYear){
  	var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytimesAPI + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";
  	return axios.get(queryURL).then(function(response){
  		var newResults = [];
  		var allResults = response.data.response.docs;
  		var counter = 0;

  		//return the first 5 articles that meet the criteria
  		for (var i = 0; i < allResults.length; i++) {
  			if (counter > 4) {
  				return newResults;
  			}

  			if(allResults[counter].headline.main && allResults[counter].pub_date && allResults[counter].web_url) {
          newResults.push(allResults[counter]);
  				counter++;
  			}
  		}
  		return newResults;
  	})
  },

  // This function posts saved articles to our database.
  postArticle: function(title, date, url) {
    axios.post('/api/saved', {title: title, date: date, url: url}).then(function(results){

      console.log("Posted to database");
      return(results);
    });
  }

};

module.exports = helpers;