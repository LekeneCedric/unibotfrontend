/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './i18n'
import {Provider} from "react-redux";
import store from "./store";
AppRegistry.registerComponent(appName, () =>App);
