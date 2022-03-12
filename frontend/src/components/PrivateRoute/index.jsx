import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export function PrivateRoute({ children, ...rest }) {
    // Hook for user loggedIn check
    const { isLogged } = useAuth();

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