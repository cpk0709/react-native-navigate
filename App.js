import dayjs from 'dayjs';
import React from 'react';

import {StyleSheet, Text, View, Button, Image} from 'react-native';
import {getCalendarColumns} from './src/util';

const App = () => {
  const now = dayjs();
  const columns = getCalendarColumns(now);
  console.log('columns :::: ', columns);

  // console.log(dayjs(now).subtract(2, 'hour').format('YYYY.MM.DD hh:mm:ss'));
  return (
    <View style={{flex: 1}}>
      <Text style={{paddingTop: 50}}>now</Text>
    </View>
  );
};

export default App;
