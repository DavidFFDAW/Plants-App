import { Route, Redirect, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export function PrivateRoute({ children, ...rest }) {
    // Hook for user loggedIn check
    const { isLogged } = useAuth();
    const currentURL = useLocation();
    window.sessionStorage.setItem('access-route',currentURL.pathname);

    return (
      <Route
        {...rest}
        render={({ location }) =>
          isLogged ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}