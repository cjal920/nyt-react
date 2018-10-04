import React, { Component } from 'react';
import axios from 'axios';
// import { Modal, Button } from 'react-materialize';
import "./Saved.css";

class Saved extends Component {
	constructor(props) {
		super(props);
		this.state = {
			articles: [],
			noteText: undefined,
			response: undefined
		};
		this.handleChange = this.handleChange.bind(this);
	}

	// Get all saved article data from database
	apiCall() {
		axios.get('/api/article', {
		}).then(result => {
			this.setState({
				articles: result.data,
			});
		}).catch(e => {
			// this.setState({
			// 	articles: `API call failed: ${e}`
			// });
		});
	}

	// On initial load and prop updates: render saved articles
	componentDidMount() {
		this.apiCall();
	}

	// Update component on note save, or note delete
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.response !== this.props.response || prevState.response !== this.state.response) {
			this.apiCall();
		}
	}

	// Captures any change in note input fields, updates state
	handleChange(event) {
		let newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	}

	// Add note to article - Under construction
	createNote(e, i, article) {
		e.preventDefault();
		let text = this.state.noteText;
		console.log(text);
		axios.post('/api/note', {
			text: text,
			articleId: article._id
		}).then(result => {
			this.setState({
				response: result
			});
		}).catch(e => {
			this.setState({
				response: `API call failed: ${e}`
			});
		}).then(() => {
			this.setState({
				noteText: [],
			});
		});
	}

	// Remove article from db - Under Construction
	deleteArticle(article) {
		axios.delete('api/article/' + article._id
		).then(result => {
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
			<div className="saved row">
				<div className="col s12">
					<div className="collection with-header">
						<div className="saved-header"><em><strong>SAVED ARTICLES</strong></em></div>
						{this.state.articles.map((article, i) =>
							<div className="saved-item row" key={i}>
								<div className="col-sm-5">
									<a href={article.url}><h6>{article.title}</h6></a>
								</div>
								<div className="col-sm-5">
									<p>{article.date}</p>
								</div>
								<div className="col-sm-2">
									<p><button className="btn" id={article.id} onClick={this.deleteArticle.bind(this, article)}>Delete Article</button></p>
								</div>
							</div>
						)}
					</div>

				</div>

			</div>
		);
	}
}

export default Saved;