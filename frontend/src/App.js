import React, { useState } from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';

import Header from './components/Header';
import Alert from './components/Alert';
import { PrivateRoute } from './components/PrivateRoute';

import { LogIn } from './pages/LogInPage';
import PlantCreationPage from './pages/PlantCreationPage';
import { PlantEditionPage } from './pages/PlantEditionPage';
import PlantsGallery from './pages/PlantGallery';
import PlantDetailsPage from './pages/PlantDetailsPage';
import PlantsBasicListing from './pages/PlantsBasicListPage';
import PlantsAdminList from './pages/PlantsAdminList';
import MaintenancePage from './pages/MaintenancePage';

import './App.css';

function App() {
  const defaultOptions = { show: false, message: '', seconds: 4, acceptButton: true };
  const [alertInfo, setAlertInfo] = useState(defaultOptions);

  const showAlert = (message, seconds = 0) => {
    setAlertInfo({ show: true, message, seconds, acceptButton: true });
  }
  const closeAlert = () => {
    setAlertInfo(defaultOptions);
  }

  const maintenance = false;

  return (
    <UserContextProvider>
      <Router>
          <Header />
          <Alert
            show={alertInfo.show} 
            message={alertInfo.message}
            closeAlert={ closeAlert }
            seconds={alertInfo.seconds || 0}
            acceptButton={ alertInfo.showButton || true}
          />
          <Switch>
            <Redirect from="/" to="/plants/list/page/1"/>
            <Route path="/plants/list/page/:page" exact>
              <PlantsBasicListing showAlert={showAlert} />
            </Route>

            <Route path="/login" exact>
              <LogIn showAlert={showAlert} />
            </Route>

            <Route path="/plant/gallery" exact>
              <PlantsGallery showAlert={showAlert} />
            </Route>

            <Route path="/plant/searcher" exact>

            </Route>

            <Route path="/plant/search/:name" exact>

            </Route>

            <Route path="/plant/details/:id" exact>
              <PlantDetailsPage showAlert={showAlert} />
            </Route>

            <Route path="/maintenance" exact>
              <MaintenancePage />
            </Route>

            <PrivateRoute path="/plant/create/new" exact>
              <PlantCreationPage showAlert={showAlert} />
            </PrivateRoute>

            <PrivateRoute path="/admin/plants">
              <PlantsAdminList showAlert={showAlert} />  
            </PrivateRoute>

            <PrivateRoute path="/admin/update/plants/:id">
              <PlantEditionPage showAlert={showAlert} />  
            </PrivateRoute>
          </Switch>
          { maintenance && <Redirect from="*" to="/maintenance"/> }
      </Router>
    </UserContextProvider>
  );
}

export default App;
