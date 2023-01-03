import React from 'react';
import {View, Button} from 'react-native';

const Generator = ({add}) => {
  return (
    <View>
      <Button title="Add Number" onPress={add} />
    </View>
  );
};

export default Generator;
