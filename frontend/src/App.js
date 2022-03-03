import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
// import logo from './logo.svg';

import Header from './components/Header';
import PlantCreationPage from './pages/PlantCreationPage';
// import PlantGallery from './pages/PlantGallery';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
        <Switch>
          <Route path="/" exact>
            {/* <HomePage/> */}
          </Route>
          <Route path="/plant/:name" exact>
            {/* <PokemonDetailPage/> */}
          </Route>
          <Route path="/plant/gallery" exact>
            {/* <PlantGallery/> */}
          </Route>
          <Route path="/plant/search/:name" exact>
            {/* <PokemonSearchPage/> */}
          </Route>
          <Route path="/plant/create/new" exact>
            <PlantCreationPage/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
