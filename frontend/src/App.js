import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
// import logo from './logo.svg';

import Header from './components/Header';
import PlantCreationPage from './pages/PlantCreationPage';
import PlantsGallery from './pages/PlantGallery';
<<<<<<< HEAD
import PlantsBasicListing from './pages/PlantsBasicListPage';
=======
import PlantsBasicListing from './pages/PlantsBasicListPage;
>>>>>>> 97da908ef52762a164ee85b83dadb8f5e0dd6417

import './App.css';

function App() {
  return (
    <Router>
      <Header />
        <Switch>
          <Route path="/" exact>
            <PlantsBasicListing />
          </Route>
          <Route path="/plant/name/:name" exact>
            {/* <PokemonDetailPage/> */}
          </Route>
          <Route path="/plant/gallery" exact>
            <PlantsGallery />
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
