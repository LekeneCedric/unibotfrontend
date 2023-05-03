import React, { useEffect } from "react";
import Routes from './src/navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from "react-redux";
import store from "./store";

const App: React.FC<{}> = ({}) => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </Provider>
  );
};
export default App;
