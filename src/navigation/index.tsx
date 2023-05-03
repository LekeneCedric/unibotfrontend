import React, { useEffect } from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Auth from "../modules/auth";
import { useSelector } from "react-redux";
import Main from "../modules/main";
import { useAppDispatch, useAppSelector } from "../../hooks";
import AddPiece from "../modules/main/screens/pieces/components/addPiece";
import PreviewPiece from "../modules/main/screens/pieces/components/previewPiece";

const Stack = createNativeStackNavigator();
const Routes: React.FC<{}> = ({}) => {
  const isAuthenticated = useAppSelector(state=>state.auth.isAuthenticated);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
        animation:'slide_from_right' }}>
        {
          !isAuthenticated ? (
              <Stack.Screen
                name={'auth'}
                component={Auth}
                options={{headerShown: false}}
              />
          ):
            (
              <>
              <Stack.Screen
                name={'main'}
                component={Main}
                options={{headerShown: false}}
              />
              <Stack.Screen name={'new piece'} component={AddPiece}/>
              <Stack.Screen name={'preview_document'} component={PreviewPiece}/>
              </>
            )
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
