import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

export default ({
  value,
  onChangeText,
  width,
  placeholder,
  onPress,
  onSubmitEditing,
  onFocus,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width,
      }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={'#999'}
        style={{padding: 5, flex: 1, color: '#595959'}}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
        onFocus={onFocus}
      />
      <TouchableOpacity onPress={onPress} style={{padding: 5}}>
        <Text style={{color: '#595959'}}>추가</Text>
      </TouchableOpacity>
    </View>
  );
};
