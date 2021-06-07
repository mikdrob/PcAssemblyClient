import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Map from './containers/map/Map';



function App() {

  return (
    <div className="container">
      <main role="main" className="pb-3">
        <Switch>
          <Route path="/map" component={Map} />
        </Switch>
        </main>
    </div>
  );
}

export default App;
