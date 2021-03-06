var React = require("react");
var axios = require("axios");
//Require subb-components
var Search = require("./children/Search");
var Saved = require("./children/Saved");
var Results = require("./children/Results");

var helpers = require("./utils/helpers");

var Main = React.createClass({

	getInitialState: function(){
		return {
			topic: "",
			startYear: "",
			endYear: "",
			results: [],
			savedArticles: []
		}
	},	

	setTerm: function(tpc, stYr, endYr){
		this.setState({
			topic: tpc,
			startYear: stYr,
			endYear: endYr
		})
	},

	saveArticle: function(title, date, url){
		helpers.postArticle(title, date, url);
		this.getArticle();
	},

	deleteArticle: function(article){
		console.log(article);
		axios.delete('/api/saved/' + article._id)
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
				return response;
			}.bind(this));
		this.getArticle();
	},

	getArticle: function(){
		axios.get('/api/saved')
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
			}.bind(this));
	},

	componentDidUpdate: function(prevProps, prevState){
		if(prevState.topic != this.state.topic){
			console.log("UPDATED");
			helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear)
				.then(function(data){
					console.log(data);
					if (data != this.state.results)
					{
						this.setState({
							results: data
						})
					}
				}.bind(this))
		}
	},

	componentDidMount: function(){
		axios.get('/api/saved')
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
			}.bind(this));
	},

	render: function(){
		return(
			<div className="container">
				<div className="row">
					<div className="jumbotron">
						<h2 className="text-center">New York Times Article Search and Save</h2>
						<p className="text-center">Search for and save articles of interest!</p>
					</div>
				</div>
				<div className="row">
					<Search setTerm={this.setTerm}/>
				</div>
				<div className="row">
					<Results results={this.state.results} saveArticle={this.saveArticle}/>
				</div>
				<div className="row">
					<Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />
				</div>
			</div>
		)
	}
});

module.exports = Main;