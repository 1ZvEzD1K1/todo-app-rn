import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodosScreen from './src/screens/TodosScreen';
import AddTodoItemScreen from './src/screens/AddTodoItemScreen';

export default function Navigate() {
  const RootStack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Todos">
        <RootStack.Screen
          name="Todos"
          component={TodosScreen}
          options={{title: 'ALL TODOS'}}
        />
        <RootStack.Screen
          name="AddTodo"
          component={AddTodoItemScreen}
          options={{title: 'ADD TODOS'}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
