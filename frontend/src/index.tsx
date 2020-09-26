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
import { Login } from './auth/presentation/Login';
import { Register } from './auth/presentation/Register';
import { PrivateRoute, PublicRoute } from './core/presentation/Routes';

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
        <PublicRoute path="/register" exact component={withRouter(Register)} />
      </main>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
