import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {getCalendarColumns} from './src/util';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useCalendar} from './src/hook/useCalendar';
import {useTodoList} from './src/hook/useTodoList';
import Calendar from './src/Calendar';

const App = () => {
  const now = dayjs();

  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
  } = useCalendar(now);

  const {todoList, addTodo, removeTodo, toggleTodo, input, setInput} =
    useTodoList(selectedDate);

  const columns = getCalendarColumns(selectedDate);

  const onPressLeftButton = subtract1Month;

  const onPressRightButton = add1Month;

  return (
    <View style={[styles.container]}>
      <Image
        source={require('./src/assets/background_01.jpeg')}
        style={{width: '100%', height: '100%', position: 'absolute'}}
      />

      <Calendar
        columns={columns}
        selectedDate={selectedDate}
        onPressLeftButton={onPressLeftButton}
        onPressRightButton={onPressRightButton}
        setSelectedDate={setSelectedDate}
        showDatePicker={showDatePicker}
      />
      <FlatList
        data={todoList}
        renderItem={({item: todo}) => {
          return <Text>{todo.content}</Text>;
        }}
      />

      <View>
        {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
