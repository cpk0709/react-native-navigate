import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

export default ({
  value,
  onChangeText,
  bottomeSpace,
  width,
  placeholder,
  onPress,
}) => {
  return (
    <View style={{paddingBottom: bottomeSpace, flexDirection: 'row', width}}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={'#999'}
        style={{backgroundColor: 'yellow', flex: 1}}
      />
      <TouchableOpacity onPress={onPress}>
        <Text style={{color: '#595959', paddingHorizontal: 10}}>추가</Text>
      </TouchableOpacity>
    </View>
  );
};
