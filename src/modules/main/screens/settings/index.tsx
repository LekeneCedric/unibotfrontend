import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Avatar } from "react-native-paper";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Text from "../../../shared/components/native/text";
import Simplebutton from "../../../shared/components/buttons/simplebutton";
import SettingsItem from "../../components/settingsItem";
import Icons from "../../../shared/theme/icon";
import Colors from "../../../shared/theme/colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import fontFamily from "../../../shared/theme/fontFamily";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import fontSize from "../../../shared/theme/fontSize";
import { useAppDispatch } from "../../../../../hooks";
import { logout } from "../../../../redux/reducers/authSlice";
import colors from "../../../shared/theme/colors";
import { useTranslation } from "react-i18next";

export default function Settings()
{
  const navigation = useNavigation();
  const [showDetailSettingsApp, setShowDetailSettingsApp] = useState(false);
  const dispatch = useAppDispatch();
  const {t, i18n} = useTranslation();
  const currentLang = i18n.language;
  useEffect(()=>{
    navigation.setOptions({
      headerTitleStyle:{
        fontFamily:fontFamily.ysabeauMedium,
        fontSize:fontSize.smallTitle,
      },
      headerTitle:currentLang === 'en' ? 'Settings' : 'Paramètres',
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
  },[navigation,t])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.presentation}>
        <Avatar.Image source={{uri:'https://picsum.photos/700'}} size={widthPercentageToDP('25%')} />
        <Text style={styles.username} >Lekene Luc Cedric</Text>
        <View style={styles.row}>
          <Text style={styles.matricule}>{currentLang === 'en' ? 'Registration number' : 'Matricule'} : </Text>
          <Text>20V2060</Text>
        </View>
        <View style={styles.editButtonContainer}>
          <Simplebutton text={currentLang === 'en' ? 'Edit profile' : 'Modifier mon profile'} func={()=>{
            //@ts-ignore
            navigation.navigate('editProfile');
          }}/>
        </View>
      </View>
      <View>
        <ScrollView style={styles.scrollView}>
          <View style={[styles.settingsContainer]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
              <View style={{flexDirection: 'row',alignItems: 'center'}}>
                <Icon name={Icons.MAIN.TABS.SETTINGS.ACTIVE} color={Colors.primary} size={35}/>
                <Text style={{fontFamily: fontFamily.ysabeauBold, color: colors.primary,}}> {currentLang === 'en' ? 'Application configuration' : 'Configuration de l\'application'} </Text>
              </View>
              <TouchableOpacity onPress={()=>{setShowDetailSettingsApp((prev)=>!prev)}}>
                <Icon name={showDetailSettingsApp ? Icons.SETTINGS.ARROWMENU.ACTIVE : Icons.SETTINGS.ARROWMENU.INACTIVE} size={35} color={colors.primary} />
              </TouchableOpacity>
            </View>
            {
              showDetailSettingsApp && (
                <View style={{flexDirection: 'column', padding: widthPercentageToDP('2%')}}>
                  <TouchableOpacity onPress={()=>{i18n.changeLanguage(currentLang==="en"?"fr":"en");}} style={{flexDirection: 'row', marginBottom: heightPercentageToDP('2%'), justifyContent: 'space-between',borderBottomWidth: 0.7, borderBottomColor: colors.primary}}>
                    <Text style={{fontFamily: fontFamily.ysabeauText, color: colors.primary,}}>
                      {currentLang === 'en' ? 'Current Lang' : 'Langue actuelle'}
                    </Text>
                    <Text style={{fontFamily: fontFamily.ysabeauBold, color: colors.primary,}}>
                      {currentLang === 'en' ? 'English' : 'Francais'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between',borderBottomWidth: 0.7, borderBottomColor: colors.primary}}>
                    <Text style={{fontFamily: fontFamily.ysabeauText, color: colors.primary,}}>
                       Theme
                    </Text>
                    <Text style={{fontFamily: fontFamily.ysabeauBold, color: colors.primary,}}>
                      Dark Mode
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            }


          </View>
          <SettingsItem func={()=>{dispatch(logout())}} title={currentLang === 'en' ? 'Logout' : 'Deconnexion'} description={currentLang === 'en' ? 'Leave the application' : 'Quitter l\'application'} icon={Icons.exit} backgroundColor={Colors.danger} textColor={Colors.light}/>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
