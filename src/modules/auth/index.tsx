import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './screens/welcome';
import Login from "./screens/login";
import Register from "./screens/register";

const Stack = createNativeStackNavigator();
const Auth: React.FC<{}> = ({}) => {
  return (
    <Stack.Navigator screenOptions={{
      animation:'slide_from_right'
    }}>
      <Stack.Screen name={'welcome'} component={Welcome} options={{headerShown:false}} />
      <Stack.Screen name={'login'} component={Login} options={{headerShown:false}} />
      <Stack.Screen name={'register'} component={Register} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};
export default Auth;
