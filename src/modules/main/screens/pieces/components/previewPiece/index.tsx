import React from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview/lib";

const PreviewPiece:React.FC<{}> = ({}) => {
  const route = useRoute();
  // @ts-ignore
  const {uri,type} = route.params;
  return (
    <View style={styles.container}>
      {
        type === 'application/pdf' ?
        (
        <WebView
          source={{ uri: uri }}
          style={styles.image} />
        )
        :
        (
        <Image style={styles.image} source={{ uri }} />
        )
      }
    </View>
  )
};
export default PreviewPiece;
