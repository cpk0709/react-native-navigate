import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';
import {getCalendarColumns} from './src/util';

const columnSize = 30;

const App = () => {
  const now = dayjs();
  const columns = getCalendarColumns(now);

  const renderItem = ({item: date}) => {
    const dateText = dayjs(date).get('date');
    const day = dayjs(date).get('day');
    const color = day === 0 ? '#e67639' : day === 6 ? '#5872d1' : '#2b2b2b';
    const isCurrentMonth = dayjs(date).isSame(now, 'month');
    return (
      <View
        style={{
          width: columnSize,
          height: columnSize,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={([styles.day], {color, opacity: isCurrentMonth ? 1 : 0.3})}>
          {dateText}
        </Text>
      </View>
    );
  };
  // console.log(dayjs(now).subtract(2, 'hour').format('YYYY.MM.DD hh:mm:ss'));
  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList data={columns} renderItem={renderItem} numColumns={7} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  day: {
    paddingHorizontal: 3,
  },
});

export default App;
