var axios = require("axios");
var nytimesAPI = "4f14f6be03334883a5c41c827be80938";

var helper = {

  //This function runs the query to NYT
  runQuery: function(topic, startYear, endYear){
  	var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytimesAPI + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";
  	return axios.get(queryURL).then(function(res){
  		var newResults = [];
  		var allResults = res.data.res.docs;
  		var counter = 0;

  		//return the first 5 articles that meet the criteria
  		for (var i = 0; i < fullReults.length; i++) {
  			if (counter > 4) {
  				return newResults;
  			}

  			if(fullReults[counter].headline.main && fullReults[counter].pub_date && fullReults[counter].web_url) {
  				counter++;
  			}
  		}
  		return newResults;
  	})
  },

  // This function posts saved articles to our database.
  postArticle: function(title, date, url) {
    return axios.post("/api", { title: title, date: date, url: url});
  }

};

module.exports = helpers;