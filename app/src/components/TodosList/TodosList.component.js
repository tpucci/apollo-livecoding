// @flow
import React, { PureComponent } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Molecules
import TodoListItem from './molecules/TodoListItem';
import TodoAddInput from './molecules/TodoAddInput';

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
      <View style={styles.wrapper}>
        <TodoAddInput />
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={this.props.todos}
          keyExtractor={this.todoKeyExtractor}
          renderItem={this.renderTodo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  flatListContainer: {
    flex: 0,
  },
});

export default TodosList;
