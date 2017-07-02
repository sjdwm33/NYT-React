var React = require("react");
var axios = require("axios");
//Require subb-components
var Search = require("./children/Search");
var Saved = require("./children/Saved");

var helpers = require("./utils/helpers");

var Main = React.createClass({

	getInitialState: function(){
		return{
			topic: "",
			startYear: "",
			endYear: "",
			results: [],
			savedArticles: []
		}
	},

	componentDidMount: function(){
		axios.get('/api/saved').then(function(res){
			this.setState({
				savedArticles: res.data
			});
		}.bind(this));
	},

	componentDidUpdate: function(previousProps, previousState){
		if(previousState.topic != this.state.topic){
			helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear).then(function(data){
				if (data != this.state.results){
					this.setState({
						results: data
					})
				}
			}.bind(this))
		}
	},

	setTerm: function(topic, startYear, endYear){
		this.setState({
			topic: topic,
			startYear: startYear,
			endYear: endYear
		})
	},

	saveArticle: function(title, date, url){
		helpers.postArticle(title, date, url);
		this.getArticle();
	},

	deleteArticle: function(article){
		axios.delete('/api/saved/' + article._id).then(function(res){
			this.setState({
				savedArticles: res.data
			});
			return res;
		}.bind(this));
		this.getArticle();
	},

	getArticle: function(){
		axios.get('/api/saved').then(function(res){
			this.setState({
				savedArticles: res.data
			});
		}.bind(this));
	},

	render: function(){
		return(
			<div className="container">
        		<div className="row">
          			<div className="jumbotron">
            			<h2 className="text-center">New York Times Article Scrubber</h2>
            			<p className="text-center">Search for and annotate articles of interest!</p>
            		</div>
            	</div>
            	<div className="row">
            		<Search setTerm={this.setTerm} />
            	</div>
            	<div className="row">
            		<Results results={this.state.results} saveArticle={this.saveArticle} />
            	</div>
            	<div className="row">
            		<Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />
            	</div>
            </div>
        )
	}

});

module.exports = Main;