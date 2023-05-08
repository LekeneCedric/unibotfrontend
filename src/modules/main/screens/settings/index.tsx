import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Avatar } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Text from "../../../shared/components/native/text";
import Simplebutton from "../../../shared/components/buttons/simplebutton";
import SettingsItem from "../../components/settingsItem";
import Icons from "../../../shared/theme/icon";
import Colors from "../../../shared/theme/colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import fontFamily from "../../../shared/theme/fontFamily";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import fontSize from "../../../shared/theme/fontSize";
import { useAppDispatch } from "../../../../../hooks";
import { logout } from "../../../../redux/reducers/authSlice";

export default function Settings()
{
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  useEffect(()=>{
    navigation.setOptions({
      headerTitleStyle:{
        fontFamily:fontFamily.ysabeauMedium,
        fontSize:fontSize.smallTitle,
      },
      headerTitleAlign:'center',
      headerLeft:()=>(
        <TouchableOpacity style={{marginLeft:widthPercentageToDP('2%')}}>
          <Icon name={Icons.menu} size={widthPercentageToDP('6%')} color={Colors.primary} />
        </TouchableOpacity>
      ),
      headerRight:()=>(
        <TouchableOpacity style={{marginRight:widthPercentageToDP('2%')}} onPress={()=>{dispatch(logout())}}>
          <Icon name={Icons.exit} size={widthPercentageToDP('6%')} color={Colors.danger} />
        </TouchableOpacity>
      )
    })
  },[navigation])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.presentation}>
        <Avatar.Image source={{uri:'https://picsum.photos/700'}} size={widthPercentageToDP('25%')} />
        <Text style={styles.username} >Lekene Luc Cedric</Text>
        <View style={styles.row}>
          <Text style={styles.matricule}>Matricule : </Text>
          <Text>20V2060</Text>
        </View>
        <View style={styles.editButtonContainer}>
          <Simplebutton text={'Edit profile'} func={()=>{}}/>
        </View>
      </View>
      <View>
        <ScrollView style={styles.scrollView}>
          <SettingsItem title={'Langue de l\'application'} description={'Francais'} icon={Icons.language}/>
          <SettingsItem title={'Theme'} description={'Black'} icon={Icons.theme}/>
          <SettingsItem func={()=>{dispatch(logout())}} title={'Logout'} description={'deconnect to your account'} icon={Icons.exit} backgroundColor={Colors.danger} textColor={Colors.light}/>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
