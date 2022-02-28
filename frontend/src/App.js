import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
// import logo from './logo.svg';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
        <Switch>
          <Route path="/" exact>
            {/* <HomePage/> */}
          </Route>
          <Route path="/pokemon/:name" exact>
            {/* <PokemonDetailPage/> */}
          </Route>
          <Route path="/pokemon/search/:name" exact>
            {/* <PokemonSearchPage/> */}
          </Route>
          <Route path="/pokemon/move/info/:move" exact>
            {/* <PokeMoveInfoPage/> */}
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
