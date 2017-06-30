var React = require("react");

var Saved = React.createClass({

	render: function() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Saved Articles</h3>
				</div>
				<div className="panel-body text-center">

			{/*FIX***********THIS*/}
					<p>{this.props.title}</p>
					<p>{this.props.url}</p>
				</div>
			</div>
		);
	}
});

module.exports = Saved;