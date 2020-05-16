import React, { PureComponent } from 'react';
import { TextInput, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import { Box } from 'react-native-design-utility';

import { theme } from '../themes/theme';
const {width:WIDTH} =Dimensions.get('window')
class Input extends PureComponent {
  state = {};
  render() {
    const { containerStyle, onPress, ...rest } = this.props;

    const input = (
      <TextInput
        {...rest}
        style={styles.input}
        selectionColor={theme.color.darkBlue}
      />
    );

    if (typeof onPress === 'function') {
      return (
        <Box
          w={'80%'}
          h={55}
          p="xs"
          radius={16}
          mb="sm"
          style={[
            {
              borderWidth: 1,
              borderColor: theme.color.darkBlue,
            },
            containerStyle,
          ]}
          position="relative"
        >
          {input}
       
        </Box>
      );
    }

    return (
      <Box
        w={'80%'}
        h={53}
        p="xs"
        radius={16}
        mb="xs"
        style={[
          {
            borderWidth: 1,
            borderColor: theme.color.darkBlue,
          },
          containerStyle,
        ]}
      >
        <TouchableOpacity style={styles.touchableSurface}  />
        {input}
      </Box>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
        alignSelf:'flex-end',
    width:'92%',
    height:'100%'
    
  },
  touchableSurface: {
   
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height:0,
    bottom: 0,

  },
});

export default Input;
