import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from '../features/auth';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Routes: React.FC<{}> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'auth'}
          component={Auth}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
