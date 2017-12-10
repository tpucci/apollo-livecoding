// @flow
import React, { PureComponent } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';

// Molecules
import TodoListItem from './molecules/TodoListItem';

type PropsType = {
  todos: any,
  loading: boolean,
  error: boolean,
};

class TodosList extends PureComponent<PropsType> {
  todoKeyExtractor = item => item.id;
  renderTodo = ({ item: { id } }) => (
    <TodoListItem id={id} />
  );
  render() {
    if (this.props.loading) return <ActivityIndicator />;
    if (this.props.error) return <Text>Oopsie</Text>;
    if (!this.props.todos || !this.props.todos.length)
      return <Text>Nothing to show</Text>;
    return (
      <FlatList
        contentContainerStyle={styles.wrapper}
        data={this.props.todos}
        keyExtractor={this.todoKeyExtractor}
        renderItem={this.renderTodo}
      />
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export default TodosList;
