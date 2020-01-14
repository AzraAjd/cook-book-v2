import React, { Component } from 'react';
import AppNavbar from './components/app.navbar'
import RecipesList from './components/RecipesList'
import { Provider } from 'react-redux';
import store from './store';
import RecipeModal from './components/recipeModal';
import { Container } from 'reactstrap'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
  return (
    <Provider store={store}>
    <div className="App">
      <AppNavbar/>
      <Container>
        <RecipeModal></RecipeModal>
        <RecipesList/>
      </Container>
    </div>
    </Provider>
  );
  }
}

export default App;
