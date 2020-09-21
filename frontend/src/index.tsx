import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { PrivateRoute, PublicRoute } from './Routes';
import { Login } from './login/presentation/Login';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <header>
        <Link className="logo" to="/">
          Menstra
        </Link>
      </header>
      <main>
        <PrivateRoute
          path="/"
          exact
          component={() => <Redirect to="/dashboard" />}
        />
        <PrivateRoute path="/dashboard" exact component={() => <></>} />
        <PublicRoute path="/login" exact component={withRouter(Login)} />
      </main>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
