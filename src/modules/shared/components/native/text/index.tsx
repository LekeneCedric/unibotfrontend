import React from 'react';
import {Text as RNText, TextProps} from 'react-native'
import styles from './styles';
export default function Text(
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<RNText> &
    Readonly<TextProps>,
) {
  return <RNText {...props} style={[styles.text,props.style]} />;
}
