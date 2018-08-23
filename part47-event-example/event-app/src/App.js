import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Tim'
    };
  }

  render() {
    return (
      <div className="App">
        <h1>{ this.state.name }</h1>
        <button
          onClick={ () => this.setState({ name: 'TIM' }) }
        >Click Me</button>
      </div>
    );
  }
}

export default App;
