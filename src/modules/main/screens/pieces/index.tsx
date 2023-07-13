import {
  ActivityIndicator,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import styles from "./styles";
import { AnimatedFAB, Portal, Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import fontFamily from "../../../shared/theme/fontFamily";
import fontSize from "../../../shared/theme/fontSize";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "../../../shared/theme/icon";
import Colors from "../../../shared/theme/colors";
import colors from "../../../shared/theme/colors";
import PieceItem from "../../components/pieceItem";
import IPiece from "../../../../models/piece.model";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import ROUTES from "../../../../api/routes";
import Text from "../../../shared/components/native/text";
import { GET } from "../../../../api/methods";
import { loadPiece } from "../../../../redux/reducers/pieceSlice";
import Simplebutton from "../../../shared/components/buttons/simplebutton";
import { useTranslation } from "react-i18next";

export default function Pieces()
{
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const pieces = useAppSelector(state=>state.pieces.pieces);
  const [piecesFiltered, setPiecesFiltered] = useState<IPiece[]>([]);
  const [token,setToken] = useState(useAppSelector(state=>state.auth.userToken));
  const [categoriesPieces, setCategoriesPieces] = useState<{id: number, name: string, isSelected: boolean}[]>([]);
  const [selectedRequestCategoriesId,setSelectedRequestCategoriesId] = useState<number[]>([]);
  const [selectedId,setSelectedId] = useState<number>(0);
  const [search,setSearch] = useState<string>('');
  const [reload, setReload] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [formats, setFormats] = useState<{name: string, isSelected: boolean}[]>([]);
  const [selectedFormatsName,setSelectedFormatsName] = useState<string[]>([]);
  const {t, i18n} = useTranslation();
  const currentLang = i18n.language;
  const filter = () => {
    // setPiecesFiltered(pieces);
    const filterPieces = pieces.filter((piece:IPiece)=>{
      if (selectedRequestCategoriesId.length > 0 && selectedFormatsName.length > 0)
      {
        return (selectedRequestCategoriesId.includes(piece.type.categorie_piece_id!) && selectedFormatsName.includes(piece.media.extension))
      }
      else if (selectedRequestCategoriesId.length > 0)
      {
        return (selectedRequestCategoriesId.includes(piece.type.categorie_piece_id!))
      }
      else if (selectedFormatsName.length > 0)
      {
        return (selectedFormatsName.includes(piece.media.extension))
      }
      else {
        return pieces;
      }
    });
    setPiecesFiltered(filterPieces);
    setShowFilter(false)
  }
  const handleRefresh = ()=>{
    setRefresh(true);
    setReload(!reload);
  };
  const selectFormat = (format: {name: string, isSelected: boolean})=>{
    let selectedFormatsNameTemp = selectedFormatsName;
    if (selectedFormatsNameTemp.includes(format.name))
    {
      selectedFormatsNameTemp.splice(selectedFormatsNameTemp.indexOf(format.name),1);
    }
    else {
      selectedFormatsNameTemp.push(format.name);
    }
    setSelectedFormatsName(selectedFormatsNameTemp);
    const updateFormats = formats.map((frmt)=>{
      // console.log('selectedReqCat',selectedRequestCategories.filter(reqCatId => reqCatId === typeRequest.id))
      if (format.name === frmt.name)
      {
        return {...frmt,isSelected:!frmt.isSelected}
      }
      return frmt;
    });
    setFormats(updateFormats);
  }
  const selectCategory = (categorie: {id: number, name: string, isSelected: boolean})=>{
    let selectedReqCatIdTemp = selectedRequestCategoriesId;
    if (selectedReqCatIdTemp.includes(categorie.id!))
    {
      selectedReqCatIdTemp.splice(selectedReqCatIdTemp.indexOf(categorie.id!),1);
    }
    else {
      selectedReqCatIdTemp.push(categorie.id!);
    }

    setSelectedRequestCategoriesId(selectedReqCatIdTemp)
    const updateRequestCategories = categoriesPieces.map((catPiece)=>{
      // console.log('selectedReqCat',selectedRequestCategories.filter(reqCatId => reqCatId === typeRequest.id))
      if (categorie.id === catPiece.id)
      {
        return {...catPiece,isSelected:!catPiece.isSelected}
      }
      return catPiece;
    });
    setCategoriesPieces(updateRequestCategories);
  }
  useEffect(()=>{
    navigation.setOptions({
      headerTitleStyle:{
        fontFamily:fontFamily.ysabeauMedium,
        fontSize:fontSize.smallTitle,
      },
      headerTitleAlign:'center',
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => setShowFilter(true)} style={styles.headerFilter}>
            <Icon name={Icons.MAIN.REQUESTS.FILTER} size={40} color={Colors.primary} />
          </TouchableOpacity>
        );
      }
    })
  },[navigation]);
  useEffect(() => {
    setPiecesFiltered(pieces);
  },[pieces])
  useEffect(()=>{
    setIsLoading(true);
    GET(ROUTES.V1.USER.PIECE.GET,token)
      .then(res=>res.json())
      .then(res=>{
        dispatch(loadPiece(res));
        let tempFormats : {name : string, isSelected: false}[] = [];
        res.map((piece:IPiece) => {
          tempFormats.push({name: piece.media.extension, isSelected: false});
        });
        // console.warn(tempFormats);
        setFormats(tempFormats);
        setPiecesFiltered(res);
        // dispatch(loadPiece(res));
      })
      .catch(err=>{
      })
      .finally(()=>{
        // console.log(pieces)
        setIsLoading(false);
        setRefresh(false);

      });
    GET(ROUTES.V1.USER.CATEGORIE_PIECE.GET,token)
      .then(res=>res.json())
      .then(res=>{
        let catPiecesTemp = res.map((catPiece: {id: number, name: string, isSelected: boolean})=>{return {...catPiece,isSelected:false}})
        setCategoriesPieces(catPiecesTemp);
      })
      .catch(err=>{})
      .finally(()=>{})
  },[dispatch,reload]);
  return <SafeAreaView style={styles.container}>
    <Searchbar
      placeholder={currentLang === 'en' ? 'Search' : 'Rechercher'}
      placeholderTextColor={colors.gray}
      iconColor={colors.gray}
      inputStyle={styles.searchBarInput}
      onChangeText={(searchText) => {setSearch(searchText)}}
      value={search}
      style={styles.searchBar}
    />

    <ScrollView
      refreshControl={
        <RefreshControl
          tintColor={Colors.primary}
          refreshing={refresh}
          onRefresh={handleRefresh}
        />
      }
      style={styles.scrollview}
      showsVerticalScrollIndicator={false}>
      <Portal>
        <Modal style={styles.filterModal} visible={showFilter} onDismiss={()=>{setShowFilter(true)}}>
          <TouchableOpacity onPress={()=>setShowFilter(false)}>
            <Icon name={Icons.back} style={{marginTop: 10}} size={40} color={Colors.primary} />
          </TouchableOpacity>
          <ScrollView style={styles.filterModalContainer}>
            <Text style={styles.filterModalContainerTitle}> {currentLang === 'en' ? 'What categories of pieces ?' : 'Quel(s) categories de pieces'} </Text>
            <View style={{flexDirection: 'row',flexGrow: 1, flexWrap: 'wrap'}}>
              {
                categoriesPieces.map((cat)=> {
                  return (
                    <TouchableOpacity
                      onPress={()=>{selectCategory(cat)}}
                      style={[styles.categorieContainer,{backgroundColor: cat.isSelected ? colors.primary : colors.light}]}
                    >
                      <Text style={[styles.categorieText,{color: cat.isSelected ? colors.light : colors.primary}]}>{cat.name}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            <Text style={styles.filterModalContainerTitle}> {currentLang === 'en' ? 'Which format ?' : 'Quel format ?'}</Text>
            <View style={{flexDirection: 'row',flexGrow: 1, flexWrap: 'wrap'}}>
              {
                formats.map((format)=> {
                  return (
                    <TouchableOpacity
                      onPress={()=>{selectFormat(format)}}
                      style={[styles.categorieContainer,{backgroundColor: format.isSelected ? colors.primary : colors.light}]}
                    >
                      <Text style={[styles.categorieText,{color: format.isSelected ? colors.light : colors.primary}]}>{format.name}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            <Simplebutton  text={currentLang === 'en' ? 'Filter validation' : 'Validation filtre'} func={filter} />
          </ScrollView>
        </Modal>
      </Portal>
      {
        isLoading ?
          (
            <View style={styles.loadContainer}>
              <ActivityIndicator size={widthPercentageToDP('8%')} />
              <Text>{currentLang === 'en' ? 'Loading pieces' : 'Chargement des pieces'}</Text>
            </View>
          ) :
          (
                piecesFiltered.map(p=>{
                  if (p.type.name!.toLowerCase().includes(search.toLowerCase())|| search==="")
                  {
                    return <PieceItem created_at={p.created_at} key={p.id} id={p.id} name={p.type.name!} type={p.type} media={p.media}/>
                  }
                  return null
                })
          )
      }
      {
        piecesFiltered.length === 0 && !isLoading && (
          <View style={{ alignItems: "center" }}>
            <Text>{currentLang === 'en' ? 'no administrative piece' : 'aucune piece trouve'}</Text>
          </View>
        )
      }
    </ScrollView>
    <AnimatedFAB
      color={Colors.light}
      icon={Icons.add}
      label={currentLang === 'en' ? 'Add new Piece' : 'Ajouter une nouvelle piece'}
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
