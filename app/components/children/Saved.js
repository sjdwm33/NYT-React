var React = require("react");

var Saved = React.createClass({

	getInitialState: function(){
		return{
			savedArticles: []
		}
	},

	clickToDelete: function(result){
		this.props.deleteArticle(result);
	},

	componentWillReceiveProps: function(nextProps){
		var that = this;
		var newResults = nextProps.savedArticles.map(function(search, i){
			var boundClick = that.clickToDelete.bind(that, search);
			return <div className="list-group-item" key={i}><a href={search.url} target="_blank">{search.title}</a><br />{search.date}<br /><button type="button" className="btn btn-warning" style={{'float': 'right', 'marginTop': '-39px'}} onClick={boundClick}>Delete</button></div>
		});
		this.setState({savedArticles: newResults});
	},

	render: function() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Saved Articles</h3>
				</div>
				<div className="panel-body text-center">
					{this.state.savedArticles}
				</div>
			</div>
		);
	}
});

module.exports = Saved;