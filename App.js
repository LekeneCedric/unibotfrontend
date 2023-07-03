import React, { useEffect } from "react";
import Routes from './src/navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from "react-redux";
import store from "./store";
import AuthChecker from "./src/modules/auth/AuthChecker";
import { Dialogflow_V2 } from "react-native-dialogflow";
import { DialogFlowConfig } from "./env";

class App extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      DialogFlowConfig.client_email,
      DialogFlowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      DialogFlowConfig.project_id
    );
  }
  render()
  {
    return (
      <Provider store={store}>
        <PaperProvider>
          <AuthChecker/>
          <Routes />
        </PaperProvider>
      </Provider>
    )
  }
}
export default App;
