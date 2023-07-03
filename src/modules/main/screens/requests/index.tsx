import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Modal, Portal, Searchbar } from "react-native-paper";
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
import colors from "../../../shared/theme/colors";
import Simplebutton from "../../../shared/components/buttons/simplebutton";
import { Picker } from "@react-native-picker/picker";
import { filterRequest } from "../../../shared/utils/filterPeriod";

type TypeRequest = {
  id?: number;
  title: string;
  isSelected: boolean;
}
export default function Requests() {
  const navigation = useNavigation();
  const [search, setSearch] = useState<string>("");
  const [token, setToken] = useState(useAppSelector(state => state.auth.userToken));
  const [sections, setSections] = useState<ITypeRequest[]>([]);
  const [selectedSectionsId, setSelectedSectionsId] = useState<number[]>([]);
  const [reload,setReload] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isSectionLoad, setIsSectionLoad] = useState<boolean>(false);
  const [isRequestLoad, setIsRequestLoad] = useState<boolean>(false);
  const [isTypeRequestLoad,setIsTypeRequestLoad] = useState<boolean>(false);
  const [requestCategories,setRequestCategories] = useState<TypeRequest[]>([]);
  const [selectedRequestCategoriesId,setSelectedRequestCategoriesId] = useState<number[]>([]);
  const [showModal,setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const requests = useAppSelector(state => state.request.requests);
  const [requestTemp,setRequestTemp] = useState<any[]>([]);
  const [selectedPeriod,setSelectedPeriod] = useState<any>();
  const [periodes, setPeriodes] = useState([
    {id:1,title:'today',value:'today',isSelected:false},
    {id:2,title:'yesterday',value:'yesterday',isSelected:false},
    {id:3,title:'this week',value:'thisWeek',isSelected:false},
    {id:4,title:'this month',value:'thisMonth',isSelected:false},
    {id:5,title:'this year',value:'thisYear',isSelected:false},
    {id:6,title:'last year',value:'lastYear',isSelected:false},
    {id:7,title:'all time',value:'',isSelected:false},
  ]);
  const filter = () => {
    setShowModal(false);
    console.warn(selectedPeriod)
    const filterRequests = filterRequest(requests,selectedPeriod);
    setRequestTemp(filterRequests);
    console.warn(filterRequests)
  }
  const selectPeriod = (period: {id:number,title:string,value:string,isSelected:boolean})=>{
    // console.warn(period);
    setSelectedPeriod(period);
    setPeriodes(
      periodes.map((p)=>{
        if (p.id === period.id)
        {
          return {...p,isSelected:!p.isSelected}
        }
        return { ...p, isSelected: false };
      }
    ));
  }
  const selectCategory = (typeRequest: TypeRequest)=>{
    let selectedReqCatIdTemp = selectedRequestCategoriesId;
    if (selectedReqCatIdTemp.includes(typeRequest.id!))
    {
      selectedReqCatIdTemp.splice(selectedReqCatIdTemp.indexOf(typeRequest.id!),1);
    }
    else {
      selectedReqCatIdTemp.push(typeRequest.id!);
    }
    setSelectedRequestCategoriesId(selectedReqCatIdTemp)
    const updateRequestCategories = requestCategories.map((tReqCat)=>{
      // console.log('selectedReqCat',selectedRequestCategories.filter(reqCatId => reqCatId === typeRequest.id))
      if (typeRequest.id === tReqCat.id)
      {
        return {...tReqCat,isSelected:!tReqCat.isSelected}
      }
      return tReqCat;
    });
    setRequestCategories(updateRequestCategories);
  }
  const handleRefresh = () => {
    // Perform the necessary actions to refresh the page
    // For example, fetch new data, update state, etc.
    setSelectedRequestCategoriesId([])
    setRefreshing(true);
    setReload(!reload);
    // After the refresh is complete, set refreshing state to false
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => setShowModal(true)} style={styles.headerFilter}>
            <Icon name={Icons.MAIN.REQUESTS.FILTER} size={40} color={Colors.primary} />
          </TouchableOpacity>
        );
      }
    })
  },[])
  useEffect(() => {
    setIsTypeRequestLoad(true);
    GET(ROUTES.V1.USER.TYPE_REQUEST.GET, token)
      .then(res => res.json())
      .then(res => {
        let tempReq : TypeRequest[] = [];
        res.map((typeR: { id?: number, name: any }) => {
          tempReq.push({id: typeR.id, title: typeR.name,isSelected: false});
        });
        setRequestCategories(tempReq);
      })
      .catch(err => {
        console.warn(`err ${err}`);
      })
      .finally(() => {
        setIsTypeRequestLoad(false);
        setRefreshing(false);
      })
  },[reload])
  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontFamily: fontFamily.ysabeauMedium,
        fontSize: fontSize.smallTitle
      },
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: widthPercentageToDP("2%") }}>
          <Icon name={Icons.menu} size={widthPercentageToDP("6%")} color={Colors.primary} />
        </TouchableOpacity>
      )
    });
  }, [navigation]);
  useEffect(() => {
    setIsSectionLoad(true);
    GET(ROUTES.V1.USER.TYPE_REQUEST.GET, token)
      .then(res => res.json())
      .then(res => {
        setSections(res);
      })
      .catch(err => {
        console.warn(`err ${err}`);
      })
      .finally(() => {
        setIsSectionLoad(false);
      });
  }, [reload]);
  useEffect(() => {
    setIsRequestLoad(true);
    GET(ROUTES.V1.USER.REQUEST.GET, token)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        dispatch(loadRequest(res));
        setRequestTemp(res)
      })
      .catch(err => {

      })
      .finally(() => {
        setIsRequestLoad(false);
      });
  }, [reload]);

  return <SafeAreaView style={styles.container}>
    <Portal>
      <Modal style={styles.filterModal} visible={showModal} onDismiss={()=>setShowModal(false)}>
        <ScrollView style={styles.filterModalContainer}>
          <Text style={styles.filterModalContainerTitle}> Quels types de requetes </Text>
          {
            isRequestLoad ?
              (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <ActivityIndicator size={widthPercentageToDP("8%")} color={Colors.primary}
                                     style={{ alignSelf: "center" }} />
                  <Text>Chargement des types de requetes </Text>
                </View>
              ) : (
                <View style={{flexDirection: 'row',flexGrow: 1, flexWrap: 'wrap'}}>
                  {
                    requestCategories.map((req)=> {
                      return (
                        <TouchableOpacity
                          onPress={()=>{selectCategory(req)}}
                          style={[styles.categorieContainer,{backgroundColor: req.isSelected ? colors.primary : colors.light}]}
                        >
                          <Text style={[styles.categorieText,{color: req.isSelected ? colors.light : colors.primary}]}>{req.title}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              )
          }
          <Text style={styles.filterModalContainerTitle}> Pendant quelle periode ? </Text>
          <View style={{flexDirection: 'row',flexGrow: 1, flexWrap: 'wrap'}}>
            {
              periodes.map((periode)=> {
                return (
                  <TouchableOpacity
                    onPress={() => selectPeriod(periode)}
                    style={[styles.categorieContainer,{backgroundColor: periode.isSelected ? colors.primary : colors.light}]}
                  >
                    <Text style={[styles.categorieText,{color: periode.isSelected ? colors.light : colors.primary}]}>{periode.title}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
          <Simplebutton  text={'Valider le filtre'} func={filter} />
        </ScrollView>
      </Modal>
    </Portal>
    <Searchbar
      placeholder="Search"
      inputStyle={styles.searchBarInput}
      onChangeText={(searchText) => {
        setSearch(searchText);
      }}
      value={search}
      style={styles.searchBar}
    />
    <ScrollView
      refreshControl={
        <RefreshControl
          tintColor={colors.primary}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          />
      }
      style={styles.scrollview}>
      {
        isRequestLoad ?
          (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <ActivityIndicator size={widthPercentageToDP("8%")} color={Colors.primary}
                                 style={{ alignSelf: "center" }} />
              <Text>Chargement des requests </Text>
            </View>
          ) :
          (
            requestTemp.map((request) => {
              // console.log(request)
              if (request.types.name.toLowerCase().includes(search.toLowerCase()) || search === "") {
                if (selectedRequestCategoriesId.length === 0 || selectedRequestCategoriesId.includes(request.types.id!))
                {
                  return (
                    <RequestItem key={request.id} id={request.id} types={request.types} created_at={request.created_at}
                                 fields={request.fields} />
                  );
                }
              }
            })
          )
      }
      {
        requests.length === 0 && !isRequestLoad && (
          <View style={{ alignItems: "center" }}>
            <Text>Aucune requete trouve</Text>
          </View>
        )
      }
    </ScrollView>
  </SafeAreaView>;
}
