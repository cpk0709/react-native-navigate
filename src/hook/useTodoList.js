import {useState} from 'react';
import dayjs from 'dayjs';
import {Alert} from 'react-native';

const initialTodoList = [
  {
    id: 1,
    content: '운동하기!!',
    date: dayjs(),
    isSuccess: true,
  },
  {
    id: 2,
    content: '리액트 공부하기',
    date: dayjs(),
    isSuccess: false,
  },
  {
    id: 3,
    content: '리액트 네이티브 공부하기',
    date: dayjs(),
    isSuccess: true,
  },
  {
    id: 4,
    content: '자바스크립트 공부하기',
    date: dayjs(),
    isSuccess: true,
  },
  {
    id: 5,
    content: '코딩테스트 준비',
    date: dayjs(),
    isSuccess: false,
  },
];

export const useTodoList = selectedDate => {
  const [todoList, setTodoList] = useState(initialTodoList);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input) {
      Alert.alert('TODO를 입력해주세요!');
      return;
    }
    const len = todoList.length;
    const lastId = len === 0 ? 0 : todoList[len - 1].id;
    const newTodoList = [
      ...todoList,
      {
        id: lastId + 1,
        content: input,
        date: selectedDate,
        isSuccess: false,
      },
    ];
    setTodoList(newTodoList);
  };

  const removeTodo = todoId => {
    const newTodoList = todoList.filter(todo => todo.id !== todoId);
    setTodoList(newTodoList);
  };

  const resetInput = () => setInput('');

  const toggleTodo = todoId => {
    const newTodoList = todoList.map(todo => {
      if (todo.id !== todoId) return todo;
      return {
        ...todo,
        isSuccess: !todo.isSuccess,
      };
    });
    setTodoList(newTodoList);
  };

  const filteredTodoList = todoList.filter(todo => {
    const isSameDate = dayjs(todo.date).isSame(selectedDate, 'date');
    return isSameDate;
  });

  return {
    filteredTodoList,
    addTodo,
    removeTodo,
    toggleTodo,
    input,
    setInput,
    resetInput,
  };
};
