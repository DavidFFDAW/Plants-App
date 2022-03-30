import React, { useState } from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import { ROUTES } from './constants/routes';

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
import ConfigurationsPage from './pages/ConfigurationPage';
import PlantSearchPage from './pages/PlantSearchPage';

import './App.css';

function App() {
  const defaultOptions = { show: false, message: '', seconds: 4, acceptButton: true };
  const [alertInfo, setAlertInfo] = useState(defaultOptions);

  const showAlert = (message, seconds = 0) => {
    setAlertInfo({ show: true, message, acceptButton: true });
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
            
            <Redirect exact from={ ROUTES.home } to={`${ROUTES.plants}1`} />
            
            <Route path={`${ ROUTES.plants }:page`} exact>
              <PlantsBasicListing showAlert={showAlert} />
            </Route>

            <Route path={ ROUTES.login } exact>
              <LogIn showAlert={showAlert} />
            </Route>

            <Route path={ ROUTES.gallery } exact>
              <PlantsGallery showAlert={showAlert} />
            </Route>

            <Route path={`${ ROUTES.details }:id` } exact>
              <PlantDetailsPage showAlert={showAlert} />
            </Route>

            <Route path={ ROUTES.search } exact>
              <PlantSearchPage/>
            </Route>

            <Route path={ROUTES.maintenance} exact>
              <MaintenancePage />
            </Route>

            <Route path={ROUTES.configs} exact>
              <ConfigurationsPage />
            </Route>

            <PrivateRoute path={ ROUTES.create } exact>
              <PlantCreationPage showAlert={showAlert} />
            </PrivateRoute>

            <PrivateRoute path={ ROUTES.admin }>
              <PlantsAdminList showAlert={showAlert} />  
            </PrivateRoute>

            <PrivateRoute path={ ROUTES.updatePlant }>
              <PlantEditionPage showAlert={showAlert} />  
            </PrivateRoute>
          </Switch>
          { maintenance && <Redirect from="*" to="/maintenance"/> }
      </Router>
    </UserContextProvider>
  );
}

export default App;
