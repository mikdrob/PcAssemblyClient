import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Map from './containers/Map/Map';
import Confirmation from './containers/Parts/Confirmation';
import PartPage from './containers/Parts/PartPage';
import PartsCart from './containers/Parts/PartsCart';
import PartsIndex from './containers/Parts/PartsIndex';
import { AppContextProvider, initialCartState } from './context/AppContext';
import { IItem } from './domain/IItem';
import store from './redux/store';



function App() {
  const setItemToCart = (items: IItem[]): void => {
    setItem({ ...appState, items });
  }
  const setOrderId = (orderId: string | null): void => {
    setItem({ ...appState, orderId });
  }


  const [appState, setItem] = useState({ ...initialCartState, setItemToCart, setOrderId });

  return (
    <>
      <div className="App">
        <Provider store={store}>
        <AppContextProvider value={appState}>
          <div className="sticky-top">
          <Header />
          </div>
          <Switch>
            <Route path="/map" component={Map} />
            <Route path="/parts" component={PartsIndex} />
            <Route path="/part/:id" component={PartPage} />
            <Route path="/cart" component={PartsCart} />
            <Route path="/confirmation/:id" component={Confirmation} />
          </Switch>

        </AppContextProvider>
        </Provider>
      </div>
    </>
  );
}

export default App;
