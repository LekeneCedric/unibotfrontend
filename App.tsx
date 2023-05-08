import React, { useEffect } from "react";
import Routes from './src/navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from "react-redux";
import store from "./store";
import AuthChecker from "./src/modules/auth/AuthChecker";

const App: React.FC<{}> = ({}) => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AuthChecker/>
        <Routes />
      </PaperProvider>
    </Provider>
  );
};
export default App;
