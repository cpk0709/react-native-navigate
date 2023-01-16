import dayjs from 'dayjs';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {getCalendarColumns, getDayColor, getDayText} from './src/util';
import Margin from './src/Margin';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const columnSize = 35;

const Column = ({
  text,
  color,
  opacity,
  disabled = false,
  onPress,
  isSelected,
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
      <Text style={[styles.day, {color, opacity}]}>{text}</Text>
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

const App = () => {
  const now = dayjs();

  const [selectedDate, setSelectedDate] = useState(now);

  const columns = getCalendarColumns(selectedDate);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

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
    return (
      <Column
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.3}
        onPress={onPress}
        isSelected={isSelected}
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
      <View>
        <Button title="Show Date Picker" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
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
