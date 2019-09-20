import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


/*function Events(props) {
  const clickHandler = console.log;
  return (<button onClick={clickHandler}>Make an event</button>);
};*/

/*function Nocheckbox() {
  return <input type="checkbox" onClick={(e) => {e.preventDefault();}}/>;
}*/

class Reloader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {content: ""};
    this.onChar = this.onChar.bind(this);
    this.onGoTime = this.onGoTime.bind(this);
  }
  onChar(event) {
    this.setState({ content: event.target.value });
  }
  onGoTime(event) {
    if (this.state.content !== "reload") {
      event.preventDefault();
    }
  }

  render() {
    return (
     <form onSubmit={this.onGoTime}>
        <input type="text" value={this.state.content} onChange={this.onChar} />
        <input type="submit" value="Go Time" />
     </form>);
  }
}

  


/*function App() {
  return (
    <div className="App">
      <Events/>
    </div>
  );
}*/


 
export default Reloader;
