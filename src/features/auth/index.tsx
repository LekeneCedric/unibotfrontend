import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/login';
import Welcome from './screens/welcome';

const Stack = createNativeStackNavigator();
const Auth: React.FC<{}> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'welcome'} component={Welcome} />
      <Stack.Screen name={'login'} component={Login} />
    </Stack.Navigator>
  );
};
export default Auth;
