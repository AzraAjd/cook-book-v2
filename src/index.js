import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Events from './App';
import Nocheckbox from './App';
import EventCounter from "./App";
import * as serviceWorker from './serviceWorker';
import Reloader from './App';

//ReactDOM.render(<App />, document.getElementById('root'));

//ReactDOM.render(<Events />, document.getElementById('root'));

//ReactDOM.render(<Nocheckbox />, document.getElementById('root'));

//ReactDOM.render(<Reloader />, document.getElementById('root'));

ReactDOM.render(<EventCounter onEvenClick={(data)=>
    {console.log(`even $(data)`);}} />,
    document.getElementById("root")
  );
  

serviceWorker.unregister();
