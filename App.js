import dayjs from 'dayjs';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {getCalendarColumns, getDayColor, getDayText} from './src/util';
import Margin from './src/Margin';

const columnSize = 35;

const Column = ({text, color, opacity}) => {
  return (
    <View
      style={{
        width: columnSize,
        height: columnSize,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={[styles.day, {color, opacity}]}>{text}</Text>
    </View>
  );
};

const ArrowButton = ({onPress, text}) => {
  return (
    <TouchableOpacity style={{padding: 10}} onPress={onPress}>
      <Text style={{color: '#404040'}}>{text}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const now = dayjs();
  const columns = getCalendarColumns(now);

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(now).format('YYYY.MM.DD.');
    return (
      <View>
        <Margin height={15} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ArrowButton text={'Prev'} />
          <Text style={{fontSize: 20, color: '#404040'}}>
            {currentDateText}
          </Text>
          <ArrowButton text={'Next'} />
        </View>
        <Margin height={15} />
        <View style={{flexDirection: 'row'}}>
          {[0, 1, 2, 3, 4, 5, 6].map(day => {
            const dayText = getDayText(day);
            const color = getDayColor(day);
            return (
              <Column
                key={`day-${day}`}
                text={dayText}
                color={color}
                opacity={1}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderItem = ({item: date}) => {
    const dateText = dayjs(date).get('date');
    const day = dayjs(date).get('day');
    const color = getDayColor(day);
    const isCurrentMonth = dayjs(date).isSame(now, 'month');
    return (
      <Column
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.3}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        data={columns}
        keyExtractor={(_, index) => `column-${index}`}
        renderItem={renderItem}
        numColumns={7}
        ListHeaderComponent={ListHeaderComponent}
      />
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
