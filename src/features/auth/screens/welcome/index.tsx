import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from './styles';
import { useTranslation } from "react-i18next";

const Welcome: React.FC<{}> = ({}) => {
  const {t,i18n} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.botImage} source={require('../../../../assets/images/welcome/welcomebot.png')} />
      </View>
      <View style={styles.container2}>
        <Text style={styles.title}>Unibot</Text>
        <Text style={styles.description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{t('getStarted')}</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};
export default Welcome;
