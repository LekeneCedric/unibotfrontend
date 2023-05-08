import { ActivityIndicator, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { AnimatedFAB, Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import fontFamily from "../../../shared/theme/fontFamily";
import fontSize from "../../../shared/theme/fontSize";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "../../../shared/theme/icon";
import Colors from "../../../shared/theme/colors";
import PieceItem from "../../components/pieceItem";
import IPiece from "../../../../models/piece.model";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import ROUTES from "../../../../api/routes";
import Text from "../../../shared/components/native/text";
import { DELETE, GET } from "../../../../api/methods";
import { loadPiece, removePiece } from "../../../../redux/reducers/pieceSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Pieces()
{
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const pieces = useAppSelector(state=>state.pieces.pieces);
  const [token,setToken] = useState(useAppSelector(state=>state.auth.userToken));
  const [selectedId,setSelectedId] = useState<number>(0);
  const [search,setSearch] = useState<string>('');
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
    setIsLoading(true);
    GET(ROUTES.V1.USER.PIECE.GET,token)
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        dispatch(loadPiece(res));
      })
      .catch(err=>{
      })
      .finally(()=>{
        console.log(pieces)
        setIsLoading(false);
      })
  },[dispatch]);
  return <SafeAreaView style={styles.container}>
    <Searchbar
      placeholder="Search"
      inputStyle={styles.searchBarInput}
      onChangeText={(searchText) => {setSearch(searchText)}}
      value={search}
      style={styles.searchBar}
    />

    <ScrollView style={styles.scrollview}  showsVerticalScrollIndicator={false}>
      {

        isLoading ?
          (
            <View style={styles.loadContainer}>
              <ActivityIndicator size={widthPercentageToDP('8%')}/>
              <Text>Chargement des pieces</Text>
            </View>
          ) :
          (
                pieces.map(p=>{
                  if (p.name.toLowerCase().includes(search.toLowerCase())|| search==="")
                  {
                    return <PieceItem key={p.id} id={p.id} name={p.name} types={p.types} media={p.media}/>
                  }
                  return null
                })
          )
      }
    </ScrollView>
    <AnimatedFAB
      color={Colors.light}
      icon={Icons.add}
      label={'add new piece'}
      extended={true}
      animateFrom={'right'}
      onPress={()=>{
        //@ts-ignore
        navigation.navigate('new_piece')
      }}
      style={styles.fab}
    />
  </SafeAreaView>
}
