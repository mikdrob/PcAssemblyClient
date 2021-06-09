import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Map from './containers/Map/Map';
import PartsIndex from './containers/Parts/PartsIndex';
import { AppContextProvider, initialCartState } from './context/AppContext';
import { IItem } from './domain/IItem';



function App() {
  const setItemToCart = (items: IItem[]): void => {
    setItem({...appState, items});
}

  const [appState, setItem] = useState({...initialCartState, setItemToCart});

  return (
    <>
    <AppContextProvider value={appState}>
    <Header />
    <div className="container">
      <div className="container">
        <main role="main" className="pb-3">
          <Switch>
            <Route path="/map" component={Map} />
            <Route path="/parts" component={PartsIndex} />
          </Switch>
        </main>
      </div>
    </div>
    </AppContextProvider>
    </>
  );
}

export default App;
