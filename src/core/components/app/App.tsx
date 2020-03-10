import React from 'react';
import './App.scss';
import Post from '../Post';


export class App extends React.Component {
  state = {}

  

  render() {
    return (
      <div className="app-main">
        <Post />
      </div>
    )
  }
}

export default App;
