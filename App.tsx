import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Navigate from './navigation';
import {persiStore, store} from './src/redux/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persiStore}>
        <Navigate />
      </PersistGate>
    </Provider>
  );
};

export default App;
