// @flow
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

type PropsType = {
  onCompleteChange: (value: boolean) => void,
  todo: any,
};

class TodoListItem extends PureComponent<PropsType> {
  render() {
    const { todo } = this.props;
    return (
      <View style={styles.wrapper}>
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
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
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
});

export default TodoListItem;
