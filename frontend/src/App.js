import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';

import Header from './components/Header';
import PlantCreationPage from './pages/PlantCreationPage';
import PlantsGallery from './pages/PlantGallery';
import PlantDetailsPage from './pages/PlantDetailsPage';
import PlantsBasicListing from './pages/PlantsBasicListPage';
import PlantsAdminList from './pages/PlantsAdminList';

import './App.css';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Header />
          <Switch>
            <Route path="/" exact>
              <PlantsBasicListing />
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
            <Route path="/plant/details/:id" exact>
              <PlantDetailsPage />
            </Route>
            <Route path="/admin/plants">
              <PlantsAdminList />  
            </Route>
          </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
