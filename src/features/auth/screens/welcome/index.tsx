import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

const Welcome: React.FC<{}> = ({}) => {
  return (
    <View>
      {/*<Image*/}
      {/*  style={[styles.logo]}*/}
      {/*  source={require('../../../assets/logo/logo2_valide.png')}*/}
      {/*/>*/}
      <View style={styles.presentation}>
        <Text>Favorite teams in one place</Text>
        <Text>
          Watch any matches onlines , save your favorites teams to your
          favorites , stay up to date with football news news news
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.textButton}>SignUp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.textButton}>SignIn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Welcome;
