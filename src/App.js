import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';



/*EXAMPLE #1 
========================================================================*/

/*function Events(props) {
  const clickHandler = console.log;
  return (<button onClick={clickHandler}>Make an event</button>);
};*/




/*EXAMPLE #2 - Prevents the default browser behaviour or checking the checkbox on-click 
========================================================================*/

/*function Nocheckbox() {
  return <input type="checkbox" onClick={(e) => {e.preventDefault();}}/>;
}*/




/*EXAMPLE #3 - Prevents the default browser behaviour submitting a form, unless the certain requirements are met
========================================================================*/

/*class Reloader extends React.Component {
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
}*/




/*EXAMPLE #4 - counts clicks on a div, and only updates the number when div was clicked an even number of times
(doesn't work what it's supposed to atm; it counts and shows all clicks)
========================================================================*/
 
class EventCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(event) {
    const clicksNew = this.state.clicks + 1;
    this.setState({clicks: clicksNew});
    if (clicksNew % 2 === 0) {
      this.props.onEvenClick(clicksNew);
    }
  }

  render() {
    return <div onClick={this.clickHandler}>
      This div has been clicked {this.state.clicks} times.
    </div>
  }
}







/*function App() {
  return (
    <div className="App">
      <Events/>
    </div>
  );
}*/


 
export default EventCounter;
