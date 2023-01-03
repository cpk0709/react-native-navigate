import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Header = ({text}) => {
  return (
    <TouchableOpacity style={styles.header} onPressOut={() => alert('test')}>
      <View>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'pink',
    alignItems: 'center',
    padding: 5,
    width: '100%',
  },
});

export default Header;
