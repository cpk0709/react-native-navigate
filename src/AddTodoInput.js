import React from 'react';
import {View, TextInput} from 'react-native';

export default ({value, onChangeText, width}) => {
  return (
    <View style={{paddingBottom: 50}}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={{backgroundColor: 'yellow', width}}
      />
    </View>
  );
};
