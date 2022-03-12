import React, { useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';

import Header from './components/Header';
import Alert from './components/Alert';
import { PrivateRoute } from './components/PrivateRoute';

import { LogIn } from './pages/LogInPage';
import PlantCreationPage from './pages/PlantCreationPage';
import PlantsGallery from './pages/PlantGallery';
import PlantDetailsPage from './pages/PlantDetailsPage';
import PlantsBasicListing from './pages/PlantsBasicListPage';
import PlantsAdminList from './pages/PlantsAdminList';

import './App.css';

function App() {
  const defaultOptions = { show: false, message: '', seconds: 4, acceptButton: true };
  const [alertInfo, setAlertInfo] = useState(defaultOptions);

  const showAlert = (message, seconds = 5) => {
    setAlertInfo({ show: true, message, seconds, acceptButton: true });
  }
  const closeAlert = () => {
    setAlertInfo(defaultOptions);
  }

  return (
    <UserContextProvider>
      <Router>
          <Header />
          <Alert
            show={alertInfo.show} 
            message={alertInfo.message}
            closeAlert={ closeAlert }
            seconds={alertInfo.seconds || 4}
            acceptButton={ alertInfo.showButton || true}
          />
          <Switch>
            <Route path="/" exact>
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

            <PrivateRoute path="/plant/create/new" exact>
              <PlantCreationPage showAlert={showAlert} />
            </PrivateRoute>

            <PrivateRoute path="/admin/plants">
              <PlantsAdminList showAlert={showAlert} />  
            </PrivateRoute>
          </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
