import React, { Component } from "react";
import "./Search.css";
import Results from '../Results/Results';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			topic: undefined,
			startYear: undefined,
			endYear: undefined,
			results: []
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		let newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	}

	nytSearch(e) {
		e.preventDefault();
		const key = '775f14ef020945c49e51356ce23d9a5c';
		let nytUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${key}&q=${this.state.topic}&begin_date=${this.state.startYear}0101&end_date=${this.state.endYear}1231&fl=web_url,headline,pub_date&page=0`;
		let myRequest = new Request(nytUrl);
		fetch(myRequest)
			.then(res => {
				return res.json();
			}).then(data => {
				this.setState({
					results: data.response.docs
				});
			}).catch(e => {
				this.setState({
					results: `API call failed: ${e}`
				});
			});
	}
 
	render() {
		return (
			<div>
				<div className="search row">
					<form className="col s10 offset-s1" id="article_search" onSubmit={this.nytSearch.bind(this)}>
						<div className="row center-align">
							<div className="input-field col-sm-12">
								<input name="topic" id="topic" type="text" value={this.state.topic} onChange={this.handleChange}/>
								<label for="topic"><em>Topic</em></label>
							</div>
							</div>
							<div className="row center-align">
							<div className="input-field col-sm-6">
								<input name="start_year" id="startYear" type="number" value={this.state.startYear} onChange={this.handleChange}/>
								<label for="start_year"><em>Start Year</em></label>
							</div>
							<div className="input-field col-sm-6">
								<input name="end_year" id="endYear" type="number" value={this.state.endYear} onChange={this.handleChange}/>
								<label for="end_year"><em>End Year</em></label>
							</div>
							</div>

							<button className="btn" type="submit" name="action">Search
							</button>
					</form>
				</div>

				<Results 
					results={this.state.results}
				/>
				
			</div>
		);
	}
}

export default Search;