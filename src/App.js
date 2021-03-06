import React, { Component } from 'react';
import Search from './components/Search/Search';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			savedArticles: []
		};
	}

	componentDidMount() {
	}

	render() {
		return (
			<div className="container">
					<h1>The New York Times</h1>
					<h2>&#8212; Article Search &#8212;</h2>
					<div className="App-search">
						<em><strong>SEARCH FOR AND ANNOTATE ARTICLES OF INTEREST!</strong></em>
					</div>
				
				<Search />
				
			</div>
		);
	}
}

export default App;




// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;







