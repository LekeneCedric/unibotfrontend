import { ActivityIndicator, ScrollView, View } from "react-native";
import styles from "./styles";
import Text from "../../../../../shared/components/native/text";
import CustomTextInput from "../../../../../auth/components/inputs/textinput";
import PhoneInput from "../../../../../auth/components/inputs/phoneinput";
import CustomPasswordInput from "../../../../../auth/components/inputs/passwordinput";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import IUser from "../../../../../../models/user.model";
import { GET, POST } from "../../../../../../api/methods";
import routes from "../../../../../../api/routes";
import { useAppSelector } from "../../../../../../../hooks";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Colors from "../../../../../shared/theme/colors";
import Icons from "../../../../../shared/theme/icon";
import { AnimatedFAB } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import departements from "../../../../../shared/utils/departements";
import FIELDS from "../../../../../shared/utils/fields";
import LEVELS from "../../../../../shared/utils/levels";

export default function EditProfile() {
  const navigation = useNavigation();
  navigation.setOptions({
    headerTitle: "My Profil",
    headerTitleAlign: "center",
  })
  const token = useAppSelector(state=>state.auth.userToken);
  const [isLoading,setIsLoading] = useState(false);
  const [user,setUser] = useState<IUser>({});
  const [updateUser,setUpdateUser] = useState<IUser>({});
  useEffect(()=>{
    setIsLoading(true);
    GET(routes.V1.USER.GET,token)
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        setUser(res);
        setUpdateUser(res);
      })
      .catch(err=>{console.log(err)})
      .finally(()=>{setIsLoading(false)})
  },[])
  return (
    <View style={styles.container}>
      {
        isLoading && (
          <View style={styles.loadContainer}>
            <ActivityIndicator size={widthPercentageToDP('8%')}/>
            <Text>Chargement des informations</Text>
          </View>
        )
      }
      {
        !isLoading && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.title}> Informations Personnelles</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>name</Text>
              <CustomTextInput value={updateUser.name} placeholder={"name"}
                               onChangeText={(new_name) => {
                                 setUpdateUser({...updateUser,name:new_name});
                               }} />
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>matricule</Text>
              <CustomTextInput value={updateUser.matricule} placeholder={"matricule"}
                               onChangeText={(new_matricule) => {
                                 setUpdateUser({...updateUser,matricule:new_matricule})
                               }} />
            </View>
            <View style={styles.section}>
              <Text style={styles.title}> Informations etudiant</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Department</Text>
              <Picker
                selectedValue={updateUser.department}
                onValueChange={(itemValue)=>{
                  setUpdateUser({...updateUser,department:itemValue})
                }}
              >
                {
                  departements.map((departement)=>{
                    return (
                      <Picker.Item label={departement.name} value={departement.value}/>
                    )
                  })
                }
              </Picker>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Field</Text>
              <Picker
                selectedValue={updateUser.field}
                onValueChange={(itemValue)=>{
                  setUpdateUser({...updateUser,field:itemValue})
                }}
              >
                {
                  FIELDS.map((field)=>{
                    return (
                      <Picker.Item label={field.name} value={field.value}/>
                    )
                  })
                }
              </Picker>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Level</Text>
              <Picker
                selectedValue={updateUser.level}
                onValueChange={(itemValue)=>{
                  setUpdateUser({...updateUser,level:itemValue})
                }}
              >
                {
                  LEVELS.map((level)=>{
                    return (
                      <Picker.Item label={level.name} value={level.value}/>
                    )
                  })
                }
              </Picker>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}> Informations contact</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>email</Text>
              <CustomTextInput value={updateUser.email} placeholder={"email"}
                               onChangeText={(new_email) => {
                                 setUpdateUser({...updateUser,email:new_email})
                               }} />
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>phone1</Text>
              <CustomTextInput value={updateUser.phone1} placeholder={"phone1"}
                               onChangeText={(new_phone1) => {
                                 setUpdateUser({...updateUser,phone1:new_phone1})
                               }} />
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>phone2</Text>
              <CustomTextInput value={updateUser.phone2} placeholder={"phone2"}
                               onChangeText={(new_phone2) => {
                                 setUpdateUser({...updateUser,phone2:new_phone2})
                               }} />
            </View>
          </ScrollView>
        )
      }
      {
        user !== updateUser ? (
          <AnimatedFAB
            color={Colors.light}
            icon={Icons.add}
            label={'edit informations'}
            extended={true}
            animateFrom={'right'}
            onPress={()=>{
              let data = new FormData();
              Object.keys(updateUser).forEach((key)=>{
                //@ts-ignore
                data.append(key,updateUser[key]);
              })
              //@ts-ignore
              POST(routes.V1.USER.UPDATE,data,token)
                .then(res=>res.json())
                .then(res=>{console.log(res)})
                .catch(err=>{console.log(err)})
                .finally(()=>{setIsLoading(false)})
            }}
            style={styles.fab}
          />
        ):null
      }
    </View>
  );
}
