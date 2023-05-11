import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Assistant from "./screens/chatbot";
import Requests from "./screens/requests";
import Pieces from "./screens/pieces";
import Settings from "./screens/settings";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../shared/theme/colors";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Icons from "../shared/theme/icon";
import fontFamily from "../shared/theme/fontFamily";

export default function Main()
{
  const Tab = createBottomTabNavigator();
  return <Tab.Navigator
        screenOptions={({route})=>({
          tabBarIcon: ({focused, color, size})=>{
            let iconName: string = '';
            if (route.name == 'assistant')
            {
              iconName = focused ? Icons.MAIN.TABS.ASSISTANT.ACTIVE : Icons.MAIN.TABS.ASSISTANT.INACTIVE;
            }
            else if (route.name == 'requests')
            {
              iconName = focused ? Icons.MAIN.TABS.REQUEST.ACTIVE : Icons.MAIN.TABS.REQUEST.INACTIVE;
            }
            else if (route.name == 'pieces')
            {
              iconName = focused ? Icons.MAIN.TABS.PIECES.ACTIVE : Icons.MAIN.TABS.PIECES.INACTIVE;
            }
            else if (route.name == 'settings')
            {
              iconName = focused ? Icons.MAIN.TABS.SETTINGS.ACTIVE : Icons.MAIN.TABS.SETTINGS.INACTIVE;
            }
            return <Icon name={iconName} size={widthPercentageToDP('6%')} color={focused?Colors.primary:Colors.gray}/>
          },
          tabBarActiveTintColor:Colors.primary,
          tabBarLabelStyle:{fontFamily:fontFamily.ysabeauMedium,fontSize:widthPercentageToDP('3%')},
        })}
      >
        <Tab.Screen name={'assistant'} component={Assistant} options={{headerShown:false}}/>
        <Tab.Screen name={'requests'} component={Requests}/>
        <Tab.Screen name={'pieces'} component={Pieces}/>
        <Tab.Screen name={'settings'} component={Settings}/>
      </Tab.Navigator>;
}
