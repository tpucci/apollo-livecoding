// @flow
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type PropsType = {
  onCompleteChange: (value: boolean) => void,
  todo: any,
};

class TodoListItem extends PureComponent<PropsType> {
  render() {
    const { todo } = this.props;
    if (!todo) return <Text>...</Text>;
    return (
      <View style={styles.wrapper}>
        <View style={styles.leftGroupWrapper}>
          <Switch
            style={styles.switch}
            value={todo.complete}
            onValueChange={this.props.onCompleteChange}
          />
          <Text
            style={[
              todo.complete && styles.textTodoCompleted,
            ]}
          >
            {todo.text}
          </Text>
        </View>
        <TouchableOpacity onPress={this.props.deleteTodo}>
          <Text style={styles.destroy}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftGroupWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  switch: {
    marginRight: 16,
  },
  textTodoCompleted: {
    textDecorationLine: 'line-through',
    fontStyle: 'italic',
    color: '#555',
  },
  destroy: {
    fontSize: 20,
    color: '#cc9a9a',
  },
});

export default TodoListItem;
