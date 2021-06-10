import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Map from './containers/Map/Map';
import Confirmation from './containers/Parts/Confirmation';
import PartsCart from './containers/Parts/PartsCart';
import PartsIndex from './containers/Parts/PartsIndex';
import { AppContextProvider, initialCartState } from './context/AppContext';
import { IItem } from './domain/IItem';



function App() {
  const setItemToCart = (items: IItem[]): void => {
    setItem({...appState, items});
}
const setOrderId = (orderId: string | null): void => {
    setItem({...appState, orderId});
}

  const [appState, setItem] = useState({...initialCartState, setItemToCart, setOrderId});

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
            <Route path="/cart" component={PartsCart} />
            <Route path="/confirmation/:id" component={Confirmation} />
          </Switch>
        </main>
      </div>
    </div>
    </AppContextProvider>
    </>
  );
}

export default App;
