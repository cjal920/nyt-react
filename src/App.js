import React, { Component } from 'react';
import Search from './components/Search';

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
			<div className="App container">
				<div className="App-header row center-align">
					<h2>New York Times Article Search</h2>
					<p className="App-intro">
						Search for and annotate articles of interest!
					</p>
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







