import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import { theme } from '../themes/theme';
const Spin =(props)=>{
;
  return(   <Spinner color={theme.color.darkBlue} visible={true} />);
}
const Button = ({ children, disabled, onPress, style, disabledStyle }) => {
  const _style = [styles.button];

  if (disabled) {
    _style.push(disabledStyle);
  } else {
    _style.push(style);
  }

  return (
    <TouchableOpacity style={_style} onPress={onPress} disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    backgroundColor:theme.color.darkBlue,
    borderColor: theme.color.darkBlue,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
    height: 40,
  },
});

export default Button;
