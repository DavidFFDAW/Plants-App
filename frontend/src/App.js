import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
// import logo from './logo.svg';

import Header from './components/Header';
import PlantCreationPage from './pages/PlantCreationPage';
import PlantsGallery from './pages/PlantGallery';
import PlantsBasicListing from './pages/PlantsBasicListPage';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
        <Switch>
          <Route path="/" exact>
            <PlantsBasicListing />
          </Route>
          <Route path="/plant/name/:id" exact>
            {/* <PokemonDetailPage/> */}
          </Route>
          <Route path="/plant/gallery" exact>
            <PlantsGallery />
          </Route>
          <Route path="/plant/searcher" exact>
            {/* <PokemonSearchPage/> */}
          </Route>
          <Route path="/plant/search/:name" exact>
            {/* <PokemonSearchPage/> */}
          </Route>
          <Route path="/plant/create/new" exact>
            <PlantCreationPage />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
