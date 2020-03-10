import React from 'react';
import './App.scss';
import Post from '../Post';
import Nav from '../Nav';


export class App extends React.Component {
  state = {}

  

  render() {
    return (
      <div className="app-main">
        <Nav />
        <Post />
      </div>
    )
  }
}

export default App;
