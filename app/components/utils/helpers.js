var axios = require("axios");

var helper = {











  // This function hits our own server to retrieve the record of query results
  getSaved: function() {
    return axios.get("/api");
  },

  // This function posts saved articles to our database.
  postSaved: function(location) {
    return axios.post("/api", { title: title, url: url });
  }

};

module.exports = helpers;