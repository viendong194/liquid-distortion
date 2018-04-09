import React, { Component } from 'react';
import Blob from './blob'

class App extends Component {
  componentDidMount(){
    new Blob();
  }
  render() {
    return (
      <div className="App">
        <div className="canvas-container">
        </div>
      </div>
    );
  }
}

export default App;
