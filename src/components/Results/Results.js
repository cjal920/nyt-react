import React, { Component } from 'react';
import Saved from '../Saved/Saved';
import axios from 'axios';
import "./Results.css";

class Results extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newArticle: [],
			response: undefined
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(article) {
		axios.post('/api/article', {
			title: article.headline.main,
			date: article.pub_date,
			url: article.web_url
		}).then(result => {
			this.setState({
				response: result
			});
		}).catch(e => {
			this.setState({
				response: `API call failed: ${e}`
			});
		});
	}
	
	render() {
		return (
			<div>
				<div className="results row">
					<div className="col-sm-12">
						<div className="collection with-header">
							<div className="results-header">
							<em><strong>SEARCH RESULTS</strong></em>
							</div>
								{this.props.results.map((result, i) =>
									<div className="results-item row">
										<div className="col-sm-6"><a href={result.web_url}><h6>{result.headline.main}</h6></a></div>
										<div className="col-sm-4"><p>{result.pub_date}</p></div>
										<div className="col-sm-2"><button className="btn" key={i} onClick={this.handleClick.bind(this, result)}>Save</button></div>
									</div>
								)}
						</div>
					</div>
				</div>

				<Saved
					response={this.state.response}
				/>

			</div>
		);
	}
}

export default Results;