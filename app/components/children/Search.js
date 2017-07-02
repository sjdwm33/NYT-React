var React = require("react");

var Search = React.createClass({

	getInitialState: function(){
		return{
			topic: "",
			startYear: "",
			endYear: ""
		}
	},

	handleChange: function(event){
		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	},

	handleClick: function(){
		this.props.setTerm(this.state.topic, this.state.startYear, this.state.endYear);
	},

	render: function() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Search</h3>
				</div>
				<div className="panel-body text-center">
					<form>
						<div className="form-group">
							<h4>Topic</h4>
							<input type="text" className="form-control text-center" id="topic" onChange= {this.handleChange} required/>
							<br />

							<h4>Start Year</h4>
							<input type="text" className="form-control text-center" id="startYear" onChange= {this.handleChange} required/>
							<br />

							<h4>End Year</h4>
							<input type="text" className="form-control text-center" id="endYear" onChange= {this.handleChange} required/>
							<br />

							<button type='button' className="btn btn-primary" onClick={this.handleClick}>Search</button>
						</div>
					</form>	
				</div>
			</div>
		);
	}
});

module.exports = Search;