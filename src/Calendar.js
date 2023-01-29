import React from 'react';
import {FlatList, View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import Margin from './Margin';
import {getDayText, getDayColor} from './util';

const columnSize = 35;

const Column = ({
  text,
  color,
  opacity,
  disabled = false,
  onPress,
  isSelected,
  hasTodo,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        width: columnSize,
        height: columnSize,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSelected ? '#c2c2c2' : 'transparent',
        borderRadius: columnSize / 2,
      }}>
      <Text
        style={[
          styles.day,
          {color, opacity, fontWeight: hasTodo ? 'bold' : 'normal'},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const ArrowButton = ({onPress, text}) => {
  return (
    <TouchableOpacity style={{padding: 10}} onPress={onPress}>
      <Text style={{color: '#404040'}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ({
  columns,
  selectedDate,
  onPressLeftButton,
  onPressRightButton,
  setSelectedDate,
  showDatePicker,
  todoList,
}) => {
  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format('YYYY.MM.DD.');
    return (
      <View>
        <Margin height={15} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ArrowButton text={'Prev'} onPress={onPressLeftButton} />
          <TouchableOpacity onPress={() => showDatePicker()}>
            <Text style={{fontSize: 20, color: '#404040'}}>
              {currentDateText}
            </Text>
          </TouchableOpacity>
          <ArrowButton text={'Next'} onPress={onPressRightButton} />
        </View>
        <Margin height={15} />
        <View style={{flexDirection: 'row'}}>
          {[0, 1, 2, 3, 4, 5, 6].map(day => {
            const dayText = getDayText(day);
            const color = getDayColor(day);
            return (
              <Column
                disabled
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
    const isCurrentMonth = dayjs(date).isSame(selectedDate, 'month');
    const onPress = () => {
      setSelectedDate(date);
    };
    const isSelected = dayjs(date).isSame(selectedDate, 'date');
    const hasTodo = todoList.find(todo =>
      dayjs(date).isSame(todo.date, 'date'),
    );
    return (
      <Column
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.3}
        onPress={onPress}
        isSelected={isSelected}
        hasTodo={hasTodo}
      />
    );
  };
  return (
    <FlatList
      data={columns}
      scrollEnabled={false}
      keyExtractor={(_, index) => `column-${index}`}
      renderItem={renderItem}
      numColumns={7}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const styles = StyleSheet.create({
  day: {
    paddingHorizontal: 3,
  },
});
