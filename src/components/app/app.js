import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage, CartPage } from '../pages';
import ShopHeader from '../shop-header';

import './app.css';

const App = () => {
  return (
    <main role="main" className="container">
      <ShopHeader />
      <Switch>
        <Route
          path="/"
          component={HomePage}
          exact />

      <Route
          path="/cart"
          component={CartPage}
          />
      <Route render={() => (
        <div className="jumbotron text-center">
          <h2>404<br/>Page not found</h2>
        </div>
      )} />
      </Switch>
    </main>
  );
};

export default App;