import { ActivityIndicator, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Searchbar } from "react-native-paper";
import { useEffect, useState } from "react";
import Text from "../../../shared/components/native/text";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { GET } from "../../../../api/methods";
import ROUTES from "../../../../api/routes";
import ITypeRequest from "../../../../models/typeRequest.model";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Colors from "../../../shared/theme/colors";
import { useNavigation } from "@react-navigation/native";
import fontFamily from "../../../shared/theme/fontFamily";
import fontSize from "../../../shared/theme/fontSize";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "../../../shared/theme/icon";
import { loadRequest } from "../../../../redux/reducers/requestSlice";
import RequestItem from "./components/requestItem";

export default function Requests()
{
  const navigation = useNavigation();
  const [search,setSearch] = useState<string>('');
  const [token,setToken] = useState(useAppSelector(state=>state.auth.userToken));
  const [sections,setSections] = useState<ITypeRequest[]>([]);
  const [selectedSectionsId,setSelectedSectionsId] = useState<number[]>([]);
  const [isSectionLoad,setIsSectionLoad] = useState<boolean>(false);
  const [isRequestLoad,setIsRequestLoad] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const requests = useAppSelector(state=>state.request.requests);
  const selectionSection = (id:number)=>{
    setSections(sections.map(section=>{
        if (section.id === id)
        {
          section.isSelect = !section.isSelect;
        }
       return section;
    }));

  };
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
      )
    })
  },[navigation]);
  useEffect(()=>{
    setIsSectionLoad(true);
    GET(ROUTES.V1.USER.TYPE_REQUEST.GET,token)
      .then(res=>res.json())
      .then(res=>{
        setSections(res);
      })
      .catch(err=>{
        console.warn(`err ${err}`)
      })
      .finally(()=>{
        setIsSectionLoad(false);
      })
  },[]);
  useEffect(()=>{
    setIsRequestLoad(true)
    GET(ROUTES.V1.USER.REQUEST.GET,token)
      .then(res=>res.json())
      .then(res=>{
        console.log(res);
        dispatch(loadRequest(res));
      })
      .catch(err=>{

      })
      .finally(()=>{
        setIsRequestLoad(false);
      })
  },[])
  return <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        inputStyle={styles.searchBarInput}
        onChangeText={(searchText) => {setSearch(searchText)}}
        value={search}
        style={styles.searchBar}
      />
    <View style={styles.sectionsContainer}>
      {
        isSectionLoad ?
          (
            <ActivityIndicator size={widthPercentageToDP('8%')} color={Colors.primary} style={{alignSelf:'center'}} />
          ) :
            (
                sections.map((section)=>
                {
                  return (
                    <TouchableOpacity
                      key={section.id}
                      onPress={()=>{selectionSection(section.id!)}}
                      style={[styles.sectionItem,{
                      backgroundColor:section.isSelect?Colors.primary:Colors.light,
                      borderWidth:1,
                      borderColor:section.isSelect?Colors.primary:Colors.light,
                    }]}>
                      <Text style={[styles.sectionTitle,{color:section.isSelect?Colors.light:Colors.primary}]}>{section.name}</Text>
                    </TouchableOpacity>
                  );
                })
            )
      }
    </View>
    <ScrollView style={styles.scrollview}>
      {
        isRequestLoad ?
          (
            <View style={{alignItems:'center',justifyContent:'center'}}>
              <ActivityIndicator size={widthPercentageToDP('8%')} color={Colors.primary} style={{alignSelf:'center'}} />
              <Text>Chargement des requests </Text>
            </View>
          ):
            (
              requests.map((request)=>
              {
                if (request.types.name.toLowerCase().includes(search.toLowerCase())|| search==="") {
                  return (
                    <RequestItem key={request.id} id={request.id} types={request.types} created_at={request.created_at} fields={request.fields}/>
                  )
                }
              })
            )
      }
      {
        requests.length === 0 && !isRequestLoad && (
          <View style={{alignItems:'center'}}>
            <Text>Aucune requete trouve</Text>
          </View>
        )
      }
    </ScrollView>
  </SafeAreaView>
}
