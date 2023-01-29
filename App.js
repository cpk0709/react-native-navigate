import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {getCalendarColumns} from './src/util';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useCalendar} from './src/hook/useCalendar';
import {useTodoList} from './src/hook/useTodoList';
import Calendar from './src/Calendar';
import Margin from './src/Margin';
import AddTodoInput from './src/AddTodoInput';

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

  const ListHeaderComponent = () => {
    return (
      <View>
        <Calendar
          columns={columns}
          selectedDate={selectedDate}
          onPressLeftButton={onPressLeftButton}
          onPressRightButton={onPressRightButton}
          setSelectedDate={setSelectedDate}
          showDatePicker={showDatePicker}
        />
        <Margin height={15} />
        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: 4 / 2,
            backgroundColor: '#a3a3a3',
            alignSelf: 'center',
          }}></View>
        <Margin height={15} />
      </View>
    );
  };

  const renderItem = ({item: todo}) => {
    const isSuccess = todo.isSuccess;
    return (
      <View
        style={{
          width: 220,
          // backgroundColor: todo.id % 2 === 0 ? 'pink' : 'lightblue',
          alignSelf: 'center',
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderBottomWidth: 0.2,
          borderColor: '#a6a6a6',
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: 14, color: '#595959', flex: 1}}>
          {todo.content}
        </Text>
        <Text style={{color: isSuccess ? '#25e675' : '#faa69b'}}>
          {isSuccess ? '완료' : '미완료'}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <Image
        source={require('./src/assets/background_01.jpeg')}
        style={{width: '100%', height: '100%', position: 'absolute'}}
      />

      <FlatList
        data={todoList}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
        style={{paddingTop: 50}}
      />

      <AddTodoInput value={input} onChangeText={setInput} width={220} />

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
