import React, { useEffect } from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Auth from "../modules/auth";
import { useSelector } from "react-redux";
import Main from "../modules/main";
import { useAppDispatch, useAppSelector } from "../../hooks";
import AddPiece from "../modules/main/screens/pieces/components/addPiece";
import PreviewPiece from "../modules/main/screens/pieces/components/previewPiece";
import RequestDetail from "../modules/main/screens/requests/components/requestDetail";
import EditProfile from "../modules/main/screens/settings/components/editProfile";

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
              <Stack.Screen name={'new_piece'} component={AddPiece} />
              <Stack.Screen name={'preview_document'} component={PreviewPiece} options={{headerShown:false}} />
              <Stack.Screen name={'detail_request'} component={RequestDetail} />
              <Stack.Screen name={'editProfile'} component={EditProfile} />
              </>
            )
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
