import React from 'react';
import './App.scss';
import Post from '../Post';


export class App extends React.Component {
  state = {}

  

  render() {
    return (
      <div>
        <Post />
      </div>
    )
  }
}

export default App;
